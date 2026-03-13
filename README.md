<div align="center">

# ⚡ PMBot

**AI Product Manager Assistant for Vibe Coders**

专为 AI Vibe Coder 设计的全流程 PM 工具箱

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jetywolf/pmbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)
[![Built with Hono](https://img.shields.io/badge/Built%20with-Hono-E36002?logo=hono)](https://hono.dev)
[![Powered by Workers AI](https://img.shields.io/badge/AI-Cloudflare%20Workers%20AI-F6821F?logo=cloudflare)](https://developers.cloudflare.com/workers-ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

<br/>

> 从想法验证到增长策略，11 个 AI 驱动的 PM 工具，覆盖产品从 **0→1→增长** 的全生命周期。  
> From idea validation to growth strategy — 11 AI-powered PM tools covering the full **0→1→growth** lifecycle.

<br/>

```
⚡ PMBot
├── 🚀  Phase 1 · 0 to 1   ──  💡 想法验证  👤 用户画像  📋 PRD  📝 用户故事  🎯 MVP  🛠️ 技术选型
└── 📈  Phase 2 · 1 to ∞   ──  🚀 上线清单  📢 营销文案  📈 增长策略  🏆 竞品分析  📊 功能优先级
```

</div>

---

## ✨ 产品亮点 / Highlights

| | 中文 | English |
|---|---|---|
| 🤖 | 11 个专业 PM 工具，AI 实时流式输出 | 11 specialized PM tools with real-time AI streaming |
| 📁 | 项目管理：创建产品项目，保存所有 AI 生成的文档 | Project management: save all AI-generated artifacts |
| 🌐 | 零服务器，基于 Cloudflare Workers 全球边缘部署 | Zero server cost, globally deployed on CF edge network |
| 🧠 | 默认 Workers AI（免费），可切换 GPT-4o / Claude | Free Workers AI by default, switchable to GPT-4o / Claude |
| 💬 | PM 对话模式，随时咨询 AI 产品经理 | Chat mode — ask your AI PM anything, anytime |
| 🌙 | 精美深色主题 SPA，Markdown 渲染，流畅体验 | Beautiful dark-themed SPA with Markdown rendering |

---

## 🛠️ 工具详情 / Tool Reference

### Phase 1 · 从 0 到 1 / Zero to One

| 工具 / Tool | 输入 / Input | 输出 / Output |
|---|---|---|
| 💡 **想法验证** Idea Validation | 产品想法、痛点、目标用户 | 市场分析、竞品格局、可行性评分、风险评估、下一步行动 |
| 👤 **用户画像** User Persona | 产品描述、目标用户 | 2-4 个完整 Persona（含引言、行为特征、接触渠道） |
| 📋 **PRD 文档** PRD Generator | 产品名称、功能列表 | 完整 PRD（OKR、功能需求、用户旅程、成功指标、上线标准） |
| 📝 **用户故事** User Stories | 产品功能列表 | Agile 用户故事（含验收标准 AC、故事点数、优先级） |
| 🎯 **MVP 范围** MVP Scope | 全部计划功能 | Must/Should/Won't Have 分类 + 独立开发时间估算 |
| 🛠️ **技术选型** Tech Stack | 产品描述、预期规模 | 技术栈对比矩阵 + 推荐架构 + 快速启动命令 |

### Phase 2 · 从 1 到增长 / One to Growth

| 工具 / Tool | 输入 / Input | 输出 / Output |
|---|---|---|
| 🚀 **上线清单** Launch Checklist | 产品名称、发布渠道 | 上线前/中/后分阶段 Checklist（独立开发者专项版） |
| 📢 **营销文案** Marketing Copy | 产品、价值主张、目标用户 | Product Hunt · Twitter Thread · V2EX · 即刻 · 落地页文案 |
| 📈 **增长策略** Growth Strategy | 产品描述、当前阶段 | AARRR 漏斗分析 + 前 100 用户策略 + 增长实验计划 |
| 🏆 **竞品分析** Competitor Analysis | 我的产品、竞品列表 | 竞品对比矩阵 + 市场空白 + 差异化定位 + 竞争壁垒 |
| 📊 **功能优先级** Prioritization | 功能列表 | RICE 评分 + MoSCoW 分类 + Quick Wins + 开发顺序建议 |
| 💬 **PM 对话** AI Chat | 任意产品问题 | 专业 PM 视角的建议与分析 |

---

## 🚀 快速开始 / Quick Start

### 前置条件 / Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Cloudflare 账号](https://dash.cloudflare.com/sign-up)（免费）
- Wrangler CLI（自动安装）

### 1. 克隆并安装 / Clone & Install

```bash
git clone https://github.com/jetywolf/pmbot.git
cd pmbot
npm install
```

### 2. 创建 KV 存储 / Create KV Namespace

```bash
# 创建生产环境 KV / Create production KV
npx wrangler kv namespace create PMBOT

# 创建预览 KV / Create preview KV
npx wrangler kv namespace create PMBOT --preview
```

将输出的两个 ID 填入 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "KV"
id = "<your-production-kv-id>"
preview_id = "<your-preview-kv-id>"
```

### 3. 本地开发 / Local Development

```bash
npm run dev
# → http://localhost:8787
```

> **💡 提示**：本地开发无需真实 KV ID，Wrangler 会自动模拟本地存储。  
> **💡 Tip**: Local dev auto-simulates KV storage — no real KV ID needed.

### 4. 配置 AI 模型（可选）/ Configure AI Model (Optional)

默认使用 **Cloudflare Workers AI**（Llama 3.3 70B），**完全免费**。  
Default uses **Cloudflare Workers AI** (Llama 3.3 70B) — **completely free**.

如需更高质量输出，可配置外部 API / For higher quality, configure external APIs:

```bash
# 推荐：Anthropic Claude / Recommended: Anthropic Claude
npx wrangler secret put ANTHROPIC_API_KEY

# 或 OpenAI / Or OpenAI
npx wrangler secret put OPENAI_API_KEY
```

**AI 优先级 / Priority**: `Anthropic Claude` → `OpenAI GPT-4o` → `Workers AI Llama 3.3`

### 5. 部署 / Deploy

```bash
npm run deploy
# → https://pmbot.<your-subdomain>.workers.dev
```

---

## 🏗️ 技术架构 / Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (SPA)                        │
│  Dark UI · Markdown Rendering · SSE Streaming           │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────────┐
│            Cloudflare Worker (Hono.js)                  │
│                                                         │
│  GET  /                → Serve embedded SPA             │
│  GET  /api/health      → Health check                   │
│  GET  /api/projects    → List projects                  │
│  POST /api/projects    → Create project                 │
│  GET  /api/projects/:id → Project + artifacts           │
│  PUT  /api/projects/:id → Update project                │
│  DELETE /api/projects/:id → Delete project              │
│  POST /api/projects/:id/artifacts → Save artifact       │
│  POST /api/ai/:tool    → AI generation (SSE stream)     │
│    └─ 12 tools: validate-idea · persona · prd ·        │
│       user-stories · mvp · tech-stack · launch ·        │
│       marketing · growth · competitors · prioritize · chat │
└────────────┬──────────────────────┬─────────────────────┘
             │                      │
┌────────────▼──────────┐  ┌────────▼──────────────────┐
│   Cloudflare KV       │  │  AI Provider (streaming)   │
│                       │  │                            │
│  project:{id} → JSON  │  │  ① Workers AI (free)       │
│  projects:list → []   │  │  ② Anthropic Claude        │
└───────────────────────┘  │  ③ OpenAI GPT-4o           │
                           └────────────────────────────┘
```

### 技术栈 / Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | [Cloudflare Workers](https://workers.cloudflare.com/) |
| **Framework** | [Hono.js](https://hono.dev/) v4.6 |
| **Language** | TypeScript 5.5 |
| **Storage** | [Cloudflare KV](https://developers.cloudflare.com/kv/) |
| **AI (default)** | [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) — `@cf/meta/llama-3.3-70b-instruct-fp8-fast` |
| **AI (optional)** | Anthropic Claude 3.5 Haiku · OpenAI GPT-4o |
| **Frontend** | Vanilla JS SPA · [marked.js](https://marked.js.org/) · CSS Custom Properties |

---

## 📁 项目结构 / Project Structure

```
pmbot/
├── src/
│   ├── index.ts        # 🔌 Hono Worker — all API routes + AI streaming logic
│   ├── html.ts         # 🎨 Frontend SPA — embedded HTML/CSS/JS (~600 lines)
│   ├── prompts.ts      # 🧠 AI prompts — 12 professional PM system prompts (ZH)
│   └── types.ts        # 📐 TypeScript interfaces
├── wrangler.toml       # ⚙️  Cloudflare Worker configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 PR！/ Issues and PRs are welcome!

```bash
# Fork → Clone → Branch
git checkout -b feature/your-feature

# 开发 / Dev
npm run dev

# 类型检查 / Type check
npx tsc --noEmit

# 提交 / Commit
git commit -m "feat: your feature"
git push origin feature/your-feature
# → Open PR
```

**想贡献的方向 / Ways to contribute:**
- 🌐 新增语言支持 / i18n support
- 🧠 改进 AI 提示词质量 / Improve AI prompts
- 🎨 UI 优化 / UI enhancements
- 🔧 新增 PM 工具 / Add new PM tools
- 📖 文档完善 / Documentation

---

## 📄 许可证 / License

[MIT](LICENSE) © 2025 PMBot Contributors

---

<div align="center">

**如果这个项目对你有帮助，欢迎点 ⭐ Star！**  
**If this project helps you, please give it a ⭐ Star!**

Made with ❤️ for the AI Vibe Coding community

</div>
