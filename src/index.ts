import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env, Project, ProjectSummary, Artifact } from './types';
import { getPrompt } from './prompts';
import { getHTML } from './html';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

// ── Serve Frontend ────────────────────────────────────────────────────────────
app.get('/', (c) => c.html(getHTML()));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (c) =>
  c.json({ ok: true, version: '1.0.0', ts: Date.now() }),
);

// ── Projects CRUD ─────────────────────────────────────────────────────────────
app.get('/api/projects', async (c) => {
  const raw = await c.env.KV.get('projects:list');
  const list: ProjectSummary[] = raw ? JSON.parse(raw) : [];
  return c.json(list);
});

app.post('/api/projects', async (c) => {
  const body = await c.req.json<{ name: string; description?: string }>();
  if (!body.name?.trim()) return c.json({ error: '名称不能为空' }, 400);

  const project: Project = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    description: body.description?.trim() ?? '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    artifacts: [],
  };

  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));

  const raw = await c.env.KV.get('projects:list');
  const list: ProjectSummary[] = raw ? JSON.parse(raw) : [];
  list.unshift({
    id: project.id,
    name: project.name,
    description: project.description,
    createdAt: project.createdAt,
    artifactCount: 0,
  });
  await c.env.KV.put('projects:list', JSON.stringify(list));

  return c.json(project, 201);
});

app.get('/api/projects/:id', async (c) => {
  const raw = await c.env.KV.get(`project:${c.req.param('id')}`);
  if (!raw) return c.json({ error: '项目不存在' }, 404);
  return c.json(JSON.parse(raw));
});

app.put('/api/projects/:id', async (c) => {
  const raw = await c.env.KV.get(`project:${c.req.param('id')}`);
  if (!raw) return c.json({ error: '项目不存在' }, 404);

  const project: Project = JSON.parse(raw);
  const body = await c.req.json<{ name?: string; description?: string }>();
  if (body.name) project.name = body.name.trim();
  if (body.description !== undefined) project.description = body.description.trim();
  project.updatedAt = Date.now();

  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));

  // Update summary list
  const listRaw = await c.env.KV.get('projects:list');
  if (listRaw) {
    const list: ProjectSummary[] = JSON.parse(listRaw);
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      list[idx].name = project.name;
      list[idx].description = project.description;
      await c.env.KV.put('projects:list', JSON.stringify(list));
    }
  }

  return c.json(project);
});

app.delete('/api/projects/:id', async (c) => {
  const id = c.req.param('id');
  await c.env.KV.delete(`project:${id}`);

  const listRaw = await c.env.KV.get('projects:list');
  if (listRaw) {
    const list: ProjectSummary[] = JSON.parse(listRaw);
    await c.env.KV.put(
      'projects:list',
      JSON.stringify(list.filter((p) => p.id !== id)),
    );
  }
  return c.json({ ok: true });
});

// Save artifact to project
app.post('/api/projects/:id/artifacts', async (c) => {
  const raw = await c.env.KV.get(`project:${c.req.param('id')}`);
  if (!raw) return c.json({ error: '项目不存在' }, 404);

  const project: Project = JSON.parse(raw);
  const body = await c.req.json<Omit<Artifact, 'id' | 'createdAt'>>();

  const artifact: Artifact = {
    id: crypto.randomUUID(),
    ...body,
    createdAt: Date.now(),
  };

  project.artifacts.unshift(artifact);
  project.updatedAt = Date.now();
  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));

  // Update artifact count in list
  const listRaw = await c.env.KV.get('projects:list');
  if (listRaw) {
    const list: ProjectSummary[] = JSON.parse(listRaw);
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx !== -1) list[idx].artifactCount = project.artifacts.length;
    await c.env.KV.put('projects:list', JSON.stringify(list));
  }

  return c.json(artifact, 201);
});

// Delete artifact from project
app.delete('/api/projects/:id/artifacts/:aid', async (c) => {
  const raw = await c.env.KV.get(`project:${c.req.param('id')}`);
  if (!raw) return c.json({ error: '项目不存在' }, 404);

  const project: Project = JSON.parse(raw);
  project.artifacts = project.artifacts.filter((a) => a.id !== c.req.param('aid'));
  project.updatedAt = Date.now();
  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));
  return c.json({ ok: true });
});

// ── AI Endpoints ──────────────────────────────────────────────────────────────
app.post('/api/ai/:tool', async (c) => {
  const tool = c.req.param('tool');
  const body = await c.req.json<Record<string, unknown>>();

  const prompt = getPrompt(tool);
  if (!prompt) return c.json({ error: `未知工具: ${tool}` }, 400);

  const systemMsg = prompt.system;
  const userMsg = prompt.buildUser(body);

  // Determine AI provider
  if (c.env.ANTHROPIC_API_KEY) {
    return streamAnthropic(c.env.ANTHROPIC_API_KEY, systemMsg, userMsg);
  } else if (c.env.OPENAI_API_KEY) {
    return streamOpenAI(c.env.OPENAI_API_KEY, systemMsg, userMsg);
  } else {
    return streamWorkersAI(c.env.AI, systemMsg, userMsg);
  }
});

// ── Streaming Helpers ─────────────────────────────────────────────────────────

/** Normalize any SSE stream to { text: "..." } chunks */
function normalizeStream(
  source: ReadableStream<Uint8Array>,
  extractText: (parsed: unknown) => string | null,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream({
    async start(controller) {
      const reader = source.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.slice(5).trim();
            if (data === '[DONE]') {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              continue;
            }
            try {
              const parsed = JSON.parse(data);
              const text = extractText(parsed);
              if (text) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
                );
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      } catch (e) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ text: `\n\n[错误: ${String(e)}]` })}\n\n`,
          ),
        );
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });
}

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
};

async function streamWorkersAI(
  ai: Ai,
  system: string,
  user: string,
): Promise<Response> {
  const result = await ai.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    stream: true,
    max_tokens: 4096,
  });

  // Workers AI streaming returns a ReadableStream directly when stream: true
  const stream = normalizeStream(
    result as unknown as ReadableStream<Uint8Array>,
    (p) => (p as { response?: string }).response ?? null,
  );

  return new Response(stream, { headers: SSE_HEADERS });
}

async function streamOpenAI(
  apiKey: string,
  system: string,
  user: string,
): Promise<Response> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      stream: true,
      max_tokens: 4096,
    }),
  });

  if (!res.ok || !res.body) {
    return new Response(`data: ${JSON.stringify({ text: 'OpenAI 请求失败' })}\ndata: [DONE]\n\n`, {
      headers: SSE_HEADERS,
    });
  }

  const stream = normalizeStream(
    res.body,
    (p) => {
      const d = p as { choices?: { delta?: { content?: string } }[] };
      return d.choices?.[0]?.delta?.content ?? null;
    },
  );
  return new Response(stream, { headers: SSE_HEADERS });
}

async function streamAnthropic(
  apiKey: string,
  system: string,
  user: string,
): Promise<Response> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      system,
      messages: [{ role: 'user', content: user }],
      stream: true,
      max_tokens: 4096,
    }),
  });

  if (!res.ok || !res.body) {
    return new Response(`data: ${JSON.stringify({ text: 'Anthropic 请求失败' })}\ndata: [DONE]\n\n`, {
      headers: SSE_HEADERS,
    });
  }

  const stream = normalizeStream(
    res.body,
    (p) => {
      const d = p as { type?: string; delta?: { text?: string } };
      if (d.type === 'content_block_delta') return d.delta?.text ?? null;
      return null;
    },
  );
  return new Response(stream, { headers: SSE_HEADERS });
}

export default app;
