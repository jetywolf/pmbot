/* eslint-disable */
export function getHTML(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>PMBot — AI 产品经理助手</title>
<script src="https://cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js"><\/script>
<style>
:root{--bg:#09090b;--sf:#18181b;--sf2:#27272a;--bd:#3f3f46;--acc:#8b5cf6;--acc2:#7c3aed;--adim:rgba(139,92,246,.15);--tx:#fafafa;--tx2:#a1a1aa;--tx3:#71717a;--p1:#8b5cf6;--p2:#06b6d4;--ok:#22c55e;--err:#ef4444;--warn:#f59e0b;--r:8px;--tr:150ms ease;--sw:260px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB',sans-serif;background:var(--bg);color:var(--tx);height:100vh;overflow:hidden}
#app{display:flex;height:100vh}
/* Scrollbar */
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd);border-radius:3px}::-webkit-scrollbar-thumb:hover{background:var(--tx3)}
/* Sidebar */
#sidebar{width:var(--sw);flex-shrink:0;height:100vh;display:flex;flex-direction:column;background:var(--sf);border-right:1px solid var(--bd);overflow-y:auto}
.logo{display:flex;align-items:center;gap:8px;padding:18px 16px;border-bottom:1px solid var(--bd);flex-shrink:0}
.logo-icon{font-size:22px}.logo-text{font-size:17px;font-weight:800;letter-spacing:-.5px}
.logo-v{margin-left:auto;font-size:10px;font-weight:600;color:var(--acc);background:var(--adim);padding:2px 6px;border-radius:4px}
.proj-sec{padding:10px 12px;border-bottom:1px solid var(--bd);flex-shrink:0}
.proj-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.sec-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--tx3)}
.add-btn{width:22px;height:22px;border-radius:4px;background:transparent;border:1px solid var(--bd);color:var(--tx2);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:var(--tr);line-height:1}
.add-btn:hover{background:var(--sf2);color:var(--tx)}
.proj-item{display:flex;align-items:center;gap:7px;padding:5px 7px;border-radius:6px;cursor:pointer;transition:var(--tr)}
.proj-item:hover{background:var(--sf2)}.proj-item.active{background:var(--adim)}
.proj-dot{width:6px;height:6px;border-radius:50%;background:var(--tx3);flex-shrink:0}
.proj-item.active .proj-dot{background:var(--acc)}
.proj-name{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.proj-item.active .proj-name{color:var(--acc)}
.proj-cnt{font-size:10px;color:var(--tx3);background:var(--sf2);padding:1px 5px;border-radius:3px;flex-shrink:0}
.no-proj{font-size:12px;color:var(--tx3);padding:4px 8px}
nav{flex:1;padding:8px;overflow-y:auto}
.ni{display:flex;align-items:center;gap:7px;padding:7px 10px;border-radius:var(--r);font-size:13px;color:var(--tx2);cursor:pointer;transition:var(--tr);text-decoration:none;user-select:none}
.ni:hover{background:var(--sf2);color:var(--tx)}.ni.active{background:var(--adim);color:var(--acc);font-weight:500}
.nsl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;padding:8px 10px 3px;color:var(--tx3)}
.nsl.p1{color:var(--p1)}.nsl.p2{color:var(--p2)}.ndiv{height:1px;background:var(--bd);margin:5px 0}
/* Main */
#main{flex:1;height:100vh;overflow-y:auto;background:var(--bg);display:flex;flex-direction:column}
/* Dashboard */
.dash{padding:28px 32px;max-width:920px}
.dash-title{font-size:26px;font-weight:800;margin-bottom:6px}
.dash-sub{font-size:14px;color:var(--tx2);line-height:1.7;margin-bottom:24px}
.dash-sub .hl{color:var(--acc);font-weight:600}
.pg{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px}
.pc{border:1px solid var(--bd);border-radius:12px;padding:18px;background:var(--sf)}
.pc-hdr{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.pc-title{font-size:13px;font-weight:700}
.ptag{font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:auto}
.ptag.p1{background:rgba(139,92,246,.15);color:var(--p1)}.ptag.p2{background:rgba(6,182,212,.15);color:var(--p2)}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{font-size:12px;padding:4px 10px;border-radius:20px;background:var(--sf2);color:var(--tx2);cursor:pointer;transition:var(--tr);border:1px solid var(--bd)}
.chip:hover{background:var(--adim);color:var(--acc);border-color:var(--acc)}
.sec-title{font-size:13px;font-weight:700;margin-bottom:10px;color:var(--tx2)}
.ac{border:1px solid var(--bd);border-radius:var(--r);padding:12px 14px;background:var(--sf);margin-bottom:8px;cursor:pointer;transition:var(--tr)}
.ac:hover{border-color:var(--acc)}
.ac-hdr{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.atyp{font-size:10px;font-weight:600;padding:1px 5px;border-radius:3px;background:var(--sf2);color:var(--tx3);text-transform:uppercase}
.atitle{font-size:13px;font-weight:600;flex:1}
.adate{font-size:11px;color:var(--tx3)}
.aprev{font-size:12px;color:var(--tx2);line-height:1.5;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.empty{text-align:center;padding:32px;color:var(--tx3);font-size:13px;line-height:2}
/* Tool Page */
.tp{display:flex;flex-direction:column;height:100vh}
.th{padding:16px 24px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:12px;background:var(--sf);flex-shrink:0}
.ti{font-size:22px}
.tm{flex:1}.tt{font-size:17px;font-weight:700}.ts{font-size:12px;color:var(--tx2);margin-top:2px}
.pb{font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px}
.pb.p1{background:rgba(139,92,246,.15);color:var(--p1);border:1px solid rgba(139,92,246,.3)}
.pb.p2{background:rgba(6,182,212,.15);color:var(--p2);border:1px solid rgba(6,182,212,.3)}
.tb{flex:1;display:flex;overflow:hidden}
.tip{width:340px;flex-shrink:0;border-right:1px solid var(--bd);overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px}
.top{flex:1;overflow-y:auto;padding:24px}
/* Form */
.fg{display:flex;flex-direction:column;gap:5px}
label{font-size:12px;font-weight:600;color:var(--tx2)}
.rm{color:var(--err);margin-left:2px}
input[type=text],textarea,select{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--r);color:var(--tx);font-size:13px;padding:8px 10px;width:100%;font-family:inherit;transition:var(--tr);resize:vertical}
input[type=text]:focus,textarea:focus,select:focus{outline:none;border-color:var(--acc);background:rgba(139,92,246,.05)}
input[type=text]::placeholder,textarea::placeholder{color:var(--tx3)}
select option{background:var(--sf)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 16px;border-radius:var(--r);font-size:13px;font-weight:600;cursor:pointer;transition:var(--tr);border:none;font-family:inherit;white-space:nowrap}
.btnp{background:var(--acc);color:#fff;width:100%;padding:10px}.btnp:hover{background:var(--acc2)}.btnp:disabled{opacity:.5;cursor:not-allowed}
.btng{background:transparent;color:var(--tx2);border:1px solid var(--bd)}.btng:hover{background:var(--sf2);color:var(--tx)}
.btns{font-size:12px;padding:5px 10px}
.btnok{background:rgba(34,197,94,.1);color:var(--ok);border:1px solid rgba(34,197,94,.3)}.btnok:hover{background:rgba(34,197,94,.2)}
/* Output */
.oplaceholder{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:var(--tx3)}
.oplaceholder-icon{font-size:36px;opacity:.4}.oplaceholder-text{font-size:14px;text-align:center;line-height:1.7}
.oc{font-size:14px;line-height:1.8;color:var(--tx2)}
.oc h1,.oc h2,.oc h3,.oc h4,.oc h5{color:var(--tx);margin:1.1em 0 .45em}
.oc h1{font-size:1.35em;border-bottom:1px solid var(--bd);padding-bottom:7px}
.oc h2{font-size:1.15em}.oc h3{font-size:1.05em;color:var(--acc)}.oc h4{font-size:.95em;color:var(--tx)}
.oc p{margin-bottom:.7em}.oc ul,.oc ol{padding-left:1.4em;margin-bottom:.7em}.oc li{margin-bottom:.3em}
.oc table{width:100%;border-collapse:collapse;margin:1em 0;font-size:13px}
.oc th{background:var(--sf);padding:7px 10px;text-align:left;font-weight:600;border:1px solid var(--bd);color:var(--tx)}
.oc td{padding:6px 10px;border:1px solid var(--bd)}.oc tr:nth-child(even){background:rgba(255,255,255,.02)}
.oc code{background:var(--sf2);padding:2px 5px;border-radius:3px;font-size:.88em;font-family:'JetBrains Mono','Fira Code',monospace;color:var(--p1)}
.oc pre{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:14px;overflow-x:auto;margin:.7em 0}
.oc pre code{background:none;padding:0;color:var(--tx);font-size:.85em}
.oc blockquote{border-left:3px solid var(--acc);padding:4px 14px;margin:.7em 0;color:var(--tx2);font-style:italic;background:var(--sf2);border-radius:0 var(--r) var(--r) 0}
.oc strong{color:var(--tx);font-weight:600}.oc a{color:var(--acc);text-decoration:none}.oc a:hover{text-decoration:underline}
.oc hr{border:none;border-top:1px solid var(--bd);margin:1em 0}
.oc input[type=checkbox]{margin-right:6px;accent-color:var(--acc)}
.oa{display:flex;align-items:center;gap:8px;margin-top:16px;padding-top:14px;border-top:1px solid var(--bd)}
.oalbl{font-size:12px;color:var(--tx3);margin-right:4px}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.cur{display:inline-block;width:2px;height:15px;background:var(--acc);margin-left:2px;vertical-align:text-bottom;animation:blink 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.genbadge{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--acc);background:var(--adim);padding:5px 12px;border-radius:20px;animation:pulse 1.5s infinite}
/* Chat */
.cp{display:flex;flex-direction:column;height:100vh}
.ch{padding:14px 22px;border-bottom:1px solid var(--bd);background:var(--sf);flex-shrink:0;display:flex;align-items:center;gap:10px}
.ctitle{font-size:15px;font-weight:700}.csub{font-size:12px;color:var(--tx2)}
.cms{flex:1;overflow-y:auto;padding:18px 22px;display:flex;flex-direction:column;gap:14px}
.cm{display:flex;gap:11px}.cm.user{flex-direction:row-reverse}
.cav{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.cav.bot{background:var(--adim)}.cav.user{background:var(--sf2)}
.cb{max-width:75%;padding:11px 13px;border-radius:12px;font-size:14px;line-height:1.65}
.cm.user .cb{background:var(--acc);color:#fff;border-top-right-radius:4px}
.cm.bot .cb{background:var(--sf);border:1px solid var(--bd);color:var(--tx);border-top-left-radius:4px}
.cm.bot .cb .oc{color:var(--tx2);font-size:13px}
.cia{padding:14px 22px;border-top:1px solid var(--bd);background:var(--sf);flex-shrink:0}
.cir{display:flex;gap:8px}
.ci{flex:1;background:var(--sf2);border:1px solid var(--bd);border-radius:10px;color:var(--tx);font-size:14px;padding:10px 13px;font-family:inherit;resize:none;max-height:120px;overflow-y:auto}
.ci:focus{outline:none;border-color:var(--acc)}
.csnd{width:38px;height:38px;border-radius:8px;background:var(--acc);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;transition:var(--tr);align-self:flex-end}
.csnd:hover{background:var(--acc2)}.csnd:disabled{opacity:.4;cursor:not-allowed}
.chint{font-size:11px;color:var(--tx3);margin-top:5px}
/* Modal */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:100}
.mo.hidden{display:none}
.modal{background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:24px;width:420px;max-width:92vw}
.modal h3{font-size:15px;font-weight:700;margin-bottom:14px}
.modal input,.modal textarea{margin-bottom:10px}
.moa{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
.amodal{width:820px;max-width:95vw;max-height:82vh;display:flex;flex-direction:column}
.amodal-body{overflow-y:auto;flex:1;margin-top:12px;padding-right:4px}
/* Onboarding */
.onb{border:1px solid var(--bd);border-radius:12px;padding:22px;background:var(--sf)}
.onb-title{font-size:15px;font-weight:700;margin-bottom:10px}
.onb-body{font-size:14px;color:var(--tx2);line-height:1.8}
/* Responsive */
@media(max-width:800px){.tip{width:300px}.pg{grid-template-columns:1fr}}
@media(max-width:640px){#sidebar{display:none}.tb{flex-direction:column}.tip{width:100%;border-right:none;border-bottom:1px solid var(--bd);max-height:50vh}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
</style>
</head>
<body>
<div id="app">
  <aside id="sidebar">
    <div class="logo">
      <span class="logo-icon">⚡</span>
      <span class="logo-text">PMBot</span>
      <span class="logo-v">Beta</span>
    </div>
    <div class="proj-sec">
      <div class="proj-hdr">
        <span class="sec-lbl">项目</span>
        <button class="add-btn" onclick="showCreateProject()" title="新建项目">+</button>
      </div>
      <div id="proj-list"><div class="no-proj">暂无项目，点击 + 创建</div></div>
    </div>
    <nav id="nav"></nav>
  </aside>
  <main id="main"></main>
</div>
<div id="mo" class="mo hidden" onclick="closeModal()">
  <div id="modal" class="modal" onclick="event.stopPropagation()"></div>
</div>
<script>
(function(){
// ── Config ──────────────────────────────────────────────────────────────────
var TOOLS = {
  'validate-idea':{title:'想法验证',sub:'在写代码前，验证你的产品想法是否值得做',icon:'💡',phase:1,
    fields:[
      {id:'idea',label:'产品想法',type:'ta',ph:'用 1-2 句话描述你的产品想法...',req:true,rows:3},
      {id:'problem',label:'解决的痛点',type:'ta',ph:'你的产品解决了什么具体问题？用户当前如何解决？',req:true,rows:3},
      {id:'target',label:'目标用户',type:'text',ph:'例如：独立开发者、中小企业主...',req:true},
      {id:'extra',label:'补充信息（可选）',type:'ta',ph:'竞品信息、市场规模估算、技术约束...',req:false,rows:2}
    ],
    btn:'🔍 验证这个想法',
    artTitle:function(i){return '想法验证 · '+(i.idea||'').slice(0,25)}
  },
  'persona':{title:'用户画像',sub:'创建真实可信的 Persona，深入理解你的目标用户',icon:'👤',phase:1,
    fields:[
      {id:'product',label:'产品描述',type:'ta',ph:'简要描述你的产品功能和价值...',req:true,rows:3},
      {id:'target',label:'目标用户',type:'text',ph:'你想接触哪类用户？',req:true},
      {id:'count',label:'生成数量',type:'sel',opts:['2','3','4'],req:false},
      {id:'extra',label:'补充（可选）',type:'ta',ph:'已有的用户调研结论、特殊限制...',req:false,rows:2}
    ],
    btn:'👤 生成用户画像',
    artTitle:function(i){return '用户画像 · '+(i.product||'').slice(0,20)}
  },
  'prd':{title:'PRD 文档',sub:'生成结构完整、可直接用于开发的产品需求文档',icon:'📋',phase:1,
    fields:[
      {id:'product',label:'产品名称',type:'text',ph:'例如：NotionAI、LogSnag...',req:true},
      {id:'idea',label:'产品描述',type:'ta',ph:'产品的核心功能和价值主张...',req:true,rows:3},
      {id:'features',label:'主要功能列表',type:'ta',ph:'每行一个功能：\n用户注册登录\n项目管理\nAI 自动填充...',req:true,rows:5},
      {id:'target',label:'目标用户（可选）',type:'text',ph:'例如：独立开发者...',req:false}
    ],
    btn:'📋 生成 PRD',
    artTitle:function(i){return 'PRD · '+(i.product||'')}
  },
  'user-stories':{title:'用户故事',sub:'将产品需求拆解为可执行的 Agile 用户故事',icon:'📝',phase:1,
    fields:[
      {id:'product',label:'产品名称',type:'text',ph:'产品名称...',req:true},
      {id:'features',label:'功能列表',type:'ta',ph:'将要实现的功能（每行一个）：\n用户注册\n项目 CRUD\n邮件通知...',req:true,rows:6},
      {id:'personas',label:'用户画像（可选）',type:'ta',ph:'粘贴用户画像描述，让故事更精准...',req:false,rows:3}
    ],
    btn:'📝 生成用户故事',
    artTitle:function(i){return '用户故事 · '+(i.product||'')}
  },
  'mvp':{title:'MVP 范围',sub:'用最小投入验证产品价值，砍掉不必要的功能',icon:'🎯',phase:1,
    fields:[
      {id:'product',label:'产品名称',type:'text',ph:'产品名称...',req:true},
      {id:'features',label:'计划功能（全部）',type:'ta',ph:'你想做的所有功能（每行一个），AI 会帮你筛选 MVP 范围...',req:true,rows:6},
      {id:'solo',label:'开发方式',type:'sel',opts:['独立开发（Vibe Coding）','小团队（2-3人）'],req:false},
      {id:'timeline',label:'期望上线时间（可选）',type:'text',ph:'例如：2周内、1个月内...',req:false}
    ],
    btn:'🎯 定义 MVP 范围',
    artTitle:function(i){return 'MVP 范围 · '+(i.product||'')}
  },
  'tech-stack':{title:'技术选型',sub:'推荐最适合 Vibe Coding 快速构建的技术栈',icon:'🛠️',phase:1,
    fields:[
      {id:'product',label:'产品描述',type:'ta',ph:'你要构建什么？有什么特殊需求（实时、AI、文件处理等）？',req:true,rows:3},
      {id:'scale',label:'预期规模',type:'sel',opts:['个人项目（< 1000 用户）','小产品（< 1 万用户）','增长型（< 10 万用户）','规模化（10 万+ 用户）'],req:false},
      {id:'preferences',label:'技术偏好（可选）',type:'text',ph:'例如：擅长 TypeScript、不想用 AWS...',req:false}
    ],
    btn:'🛠️ 生成技术选型',
    artTitle:function(i){return '技术选型 · '+(i.product||'').slice(0,20)}
  },
  'launch-checklist':{title:'上线清单',sub:'上线前、上线当天、上线后的完整 Checklist',icon:'🚀',phase:2,
    fields:[
      {id:'product',label:'产品名称',type:'text',ph:'产品名称...',req:true},
      {id:'channels',label:'发布渠道',type:'text',ph:'例如：Product Hunt、V2EX、Twitter/X、即刻...',req:false},
      {id:'date',label:'计划上线日期（可选）',type:'text',ph:'例如：2 周后、3月底...',req:false}
    ],
    btn:'🚀 生成上线清单',
    artTitle:function(i){return '上线清单 · '+(i.product||'')}
  },
  'marketing':{title:'营销文案',sub:'Product Hunt、Twitter、V2EX 等多渠道发布文案一键生成',icon:'📢',phase:2,
    fields:[
      {id:'product',label:'产品名称',type:'text',ph:'产品名称...',req:true},
      {id:'value_prop',label:'核心价值主张',type:'ta',ph:'产品最核心的价值是什么？解决了什么问题？（1-2句话）',req:true,rows:2},
      {id:'target',label:'目标用户',type:'text',ph:'这个文案是写给谁看的？',req:true},
      {id:'channels',label:'目标渠道（可选）',type:'text',ph:'例如：Product Hunt、Twitter、V2EX、即刻、小红书...',req:false}
    ],
    btn:'📢 生成营销文案',
    artTitle:function(i){return '营销文案 · '+(i.product||'')}
  },
  'growth':{title:'增长策略',sub:'AARRR 分析到前 100 用户获取，制定务实的增长计划',icon:'📈',phase:2,
    fields:[
      {id:'product',label:'产品名称/描述',type:'ta',ph:'产品是什么？解决什么问题？',req:true,rows:2},
      {id:'stage',label:'当前阶段',type:'sel',opts:['刚上线（< 100 用户）','早期增长（100-1000 用户）','扩张阶段（1000+ 用户）'],req:false},
      {id:'current_users',label:'当前用户数',type:'text',ph:'0 / 100 / 500...',req:false},
      {id:'extra',label:'已有渠道/资源（可选）',type:'ta',ph:'已有的社交媒体、社区关系、合作方等...',req:false,rows:2}
    ],
    btn:'📈 生成增长策略',
    artTitle:function(i){return '增长策略 · '+(i.product||'').slice(0,20)}
  },
  'competitors':{title:'竞品分析',sub:'深入分析竞争格局，找到差异化机会和市场定位',icon:'🏆',phase:2,
    fields:[
      {id:'product',label:'我的产品',type:'ta',ph:'你的产品名称和核心功能...',req:true,rows:2},
      {id:'competitors',label:'竞品列表',type:'ta',ph:'列出主要竞品（每行一个）：\nNotion\nLinear\nCoda...',req:true,rows:4},
      {id:'extra',label:'补充（可选）',type:'ta',ph:'你希望重点比较哪些维度？定价参考？',req:false,rows:2}
    ],
    btn:'🏆 分析竞品',
    artTitle:function(i){return '竞品分析 · '+(i.product||'').slice(0,20)}
  },
  'prioritize':{title:'功能优先级',sub:'用 RICE、MoSCoW 等框架科学排序，把精力放对地方',icon:'📊',phase:2,
    fields:[
      {id:'product',label:'产品名称',type:'text',ph:'产品名称...',req:true},
      {id:'features',label:'功能列表',type:'ta',ph:'每行一个功能：\nSSO 单点登录\n团队协作\n数据导出\nAPI 接入\n移动端 App...',req:true,rows:8}
    ],
    btn:'📊 生成优先级报告',
    artTitle:function(i){return '功能优先级 · '+(i.product||'')}
  }
};
var P1=['validate-idea','persona','prd','user-stories','mvp','tech-stack'];
var P2=['launch-checklist','marketing','growth','competitors','prioritize'];

// ── State ──────────────────────────────────────────────────────────────────
var S={tool:'dashboard',project:null,projects:[],gen:false,output:'',chatHist:[],lastInputs:{},lastToolId:''};

// ── Utils ──────────────────────────────────────────────────────────────────
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function escA(s){return String(s||'').replace(/\\\\/g,'\\\\\\\\').replace(/'/g,"\\\\'")}

// ── Projects ───────────────────────────────────────────────────────────────
async function loadProjects(){
  try{var r=await fetch('/api/projects');S.projects=await r.json();renderProjList();}
  catch(e){console.error('load projects',e);}
}
async function createProject(){
  var nm=document.getElementById('p-name');
  var dc=document.getElementById('p-desc');
  if(!nm||!nm.value.trim()){if(nm)nm.focus();return;}
  try{
    var r=await fetch('/api/projects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:nm.value.trim(),description:dc?dc.value.trim():''})});
    var p=await r.json();
    S.projects.unshift({id:p.id,name:p.name,description:p.description,createdAt:p.createdAt,artifactCount:0});
    S.project={id:p.id,name:p.name};
    closeModal();nm.value='';if(dc)dc.value='';
    renderProjList();renderPage(S.tool);
  }catch(e){alert('创建失败：'+e.message);}
}
function selectProject(id,name){
  S.project=id?{id:id,name:name}:null;
  renderProjList();renderPage(S.tool);
}
async function saveArtifact(){
  if(!S.project){alert('请先选择或创建项目');return;}
  var tool=TOOLS[S.lastToolId];
  var title=tool?tool.artTitle(S.lastInputs):S.lastToolId;
  try{
    await fetch('/api/projects/'+S.project.id+'/artifacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:S.lastToolId,title:title,content:S.output,inputs:S.lastInputs})});
    var p=S.projects.find(function(x){return x.id===S.project.id;});
    if(p)p.artifactCount=(p.artifactCount||0)+1;
    renderProjList();showToast('✅ 已保存到项目「'+S.project.name+'」');
  }catch(e){alert('保存失败：'+e.message);}
}

// ── AI Generation ──────────────────────────────────────────────────────────
async function generate(toolId,inputs){
  if(S.gen)return;
  S.gen=true;S.output='';S.lastInputs=inputs;S.lastToolId=toolId;
  var op=document.getElementById('out');
  var gb=document.getElementById('gb');
  if(gb){gb.disabled=true;gb.textContent='⏳ 生成中...';}
  if(op)op.innerHTML='<div style="padding:24px"><div class="genbadge">⚡ AI 正在生成内容，请稍候...</div></div>';
  var fullText='';
  try{
    var res=await fetch('/api/ai/'+toolId,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({},inputs,{projectId:S.project?S.project.id:null}))});
    if(!res.ok)throw new Error('HTTP '+res.status);
    var reader=res.body.getReader();
    var dec=new TextDecoder();
    var buf='';
    if(op)op.innerHTML='<div class="oc" id="sc"></div>';
    var sc=document.getElementById('sc');
    while(true){
      var rd=await reader.read();
      if(rd.done)break;
      buf+=dec.decode(rd.value,{stream:true});
      var lines=buf.split('\\n');buf=lines.pop()||'';
      for(var i=0;i<lines.length;i++){
        var ln=lines[i].trim();
        if(!ln.startsWith('data:'))continue;
        var d=ln.slice(5).trim();
        if(d==='[DONE]'){S.gen=false;break;}
        try{var obj=JSON.parse(d);if(obj.text){fullText+=obj.text;if(sc){sc.innerHTML=marked.parse(fullText)+'<span class="cur"></span>';if(op)op.scrollTop=op.scrollHeight;}}}catch(ex){}
      }
    }
    if(sc)sc.innerHTML=marked.parse(fullText);
    S.output=fullText;
    if(op){
      var oa=document.createElement('div');
      oa.className='oa';
      oa.innerHTML='<span class="oalbl">生成完成</span><button class="btn btng btns" onclick="copyOut()">📋 复制</button><button class="btn btnok btns" onclick="saveArtifact()">💾 保存到项目</button>';
      op.appendChild(oa);
    }
  }catch(e){
    if(op)op.innerHTML='<div style="padding:24px;color:var(--err)">❌ 生成失败：'+esc(String(e.message||e))+'<br><small style="color:var(--tx3)">请检查网络连接，或稍后重试。</small></div>';
  }finally{
    S.gen=false;
    if(gb){gb.disabled=false;var tl=TOOLS[toolId];gb.textContent=tl?tl.btn:'生成';}
  }
}
function copyOut(){
  navigator.clipboard.writeText(S.output).then(function(){showToast('✅ 已复制到剪贴板');});
}
function handleGenerate(toolId){
  var tool=TOOLS[toolId];if(!tool)return;
  var inputs={};var ok=true;
  for(var i=0;i<tool.fields.length;i++){
    var f=tool.fields[i];
    var el=document.getElementById('f-'+f.id);
    var val=el?el.value.trim():'';
    if(f.req&&!val){if(el){el.style.borderColor='var(--err)';el.focus();setTimeout(function(e){return function(){e.style.borderColor='';}}(el),2000);}ok=false;break;}
    inputs[f.id]=val;
  }
  if(!ok)return;
  generate(toolId,inputs);
}

// ── Chat ───────────────────────────────────────────────────────────────────
async function sendChat(){
  var inp=document.getElementById('ci');
  var msg=inp?inp.value.trim():'';
  if(!msg||S.gen)return;
  S.chatHist.push({role:'user',content:msg});
  if(inp)inp.value='';
  renderChat();
  S.gen=true;
  var sb=document.getElementById('csnd');if(sb)sb.disabled=true;
  S.chatHist.push({role:'bot',content:''});
  renderChat();
  var fullText='';
  try{
    var res=await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,projectId:S.project?S.project.id:null})});
    var reader=res.body.getReader();var dec=new TextDecoder();var buf='';
    var botIdx=S.chatHist.length-1;
    while(true){
      var rd=await reader.read();if(rd.done)break;
      buf+=dec.decode(rd.value,{stream:true});
      var lines=buf.split('\\n');buf=lines.pop()||'';
      for(var i=0;i<lines.length;i++){
        var ln=lines[i].trim();if(!ln.startsWith('data:'))continue;
        var d=ln.slice(5).trim();if(d==='[DONE]')break;
        try{var obj=JSON.parse(d);if(obj.text){fullText+=obj.text;S.chatHist[botIdx].content=fullText;updateLastBot(fullText);}}catch(ex){}
      }
    }
    S.chatHist[botIdx].content=fullText;
  }catch(e){S.chatHist[S.chatHist.length-1].content='❌ 请求失败：'+e.message;}
  finally{S.gen=false;if(sb)sb.disabled=false;renderChat();}
}
function updateLastBot(text){
  var msgs=document.querySelectorAll('.cm.bot');
  var last=msgs[msgs.length-1];
  if(last){var oc=last.querySelector('.oc');if(oc){oc.innerHTML=marked.parse(text)+'<span class="cur"></span>';scrollChat();}}
}
function scrollChat(){var c=document.getElementById('cms');if(c)c.scrollTop=c.scrollHeight;}
function renderChat(){
  var c=document.getElementById('cms');if(!c)return;
  var html='';
  for(var i=0;i<S.chatHist.length;i++){
    var m=S.chatHist[i];
    var isBot=m.role==='bot';
    html+='<div class="cm '+(isBot?'bot':'user')+'"><div class="cav '+(isBot?'bot':'user')+'">'+(isBot?'⚡':'👤')+'</div><div class="cb">';
    if(isBot){html+='<div class="oc">'+(m.content?marked.parse(m.content):'<span style="color:var(--tx3)">思考中...</span>')+'</div>';}
    else{html+=esc(m.content);}
    html+='</div></div>';
  }
  c.innerHTML=html;scrollChat();
}

// ── Artifacts ─────────────────────────────────────────────────────────────
async function loadArts(){
  if(!S.project)return;
  try{
    var r=await fetch('/api/projects/'+S.project.id);
    var p=await r.json();
    var c=document.getElementById('arts');if(!c)return;
    if(!p.artifacts||p.artifacts.length===0){c.innerHTML='<div class="empty">🗂️ 暂无文档<br><small>使用工具生成内容后点击「保存到项目」</small></div>';return;}
    var html='';
    for(var i=0;i<p.artifacts.length;i++){
      var a=p.artifacts[i];
      html+='<div class="ac" onclick="showArt('+JSON.stringify(a).replace(/</g,'\\u003c')+')">';
      html+='<div class="ac-hdr"><span class="atyp">'+esc(a.type)+'</span><span class="atitle">'+esc(a.title)+'</span><span class="adate">'+new Date(a.createdAt).toLocaleDateString('zh-CN')+'</span></div>';
      html+='<div class="aprev">'+esc(a.content.slice(0,150))+'</div></div>';
    }
    c.innerHTML=html;
  }catch(e){console.error(e);}
}
function showArt(a){
  var m=document.getElementById('modal');
  m.className='modal amodal';
  m.innerHTML='<div style="display:flex;align-items:center;gap:8px;"><h3 style="flex:1">'+esc(a.title)+'</h3><button class="btn btng btns" onclick="navigator.clipboard.writeText('+JSON.stringify(a.content).replace(/</g,'\\u003c').replace(/"/g,'&quot;')+').then(function(){showToast(\'已复制\')})">📋 复制</button><button class="btn btng btns" onclick="closeModal()">✕</button></div><div style="font-size:11px;color:var(--tx3);margin-bottom:10px">'+new Date(a.createdAt).toLocaleString('zh-CN')+'</div><div class="amodal-body"><div class="oc">'+marked.parse(a.content)+'</div></div>';
  document.getElementById('mo').classList.remove('hidden');
}

// ── Rendering ─────────────────────────────────────────────────────────────
function navigate(id){
  S.tool=id;
  document.querySelectorAll('.ni').forEach(function(el){el.classList.toggle('active',el.dataset.tool===id);});
  renderPage(id);
}
function renderPage(id){
  var m=document.getElementById('main');if(!m)return;
  if(id==='dashboard'){m.innerHTML=renderDash();setTimeout(loadArts,60);}
  else if(id==='chat'){m.innerHTML=renderChatPage();setupChat();}
  else if(TOOLS[id]){m.innerHTML=renderTool(id);}
}
function renderDash(){
  var html='<div class="dash">';
  html+='<div class="dash-title">⚡ PMBot — AI 产品经理助手</div>';
  html+='<div class="dash-sub">专为 <span class="hl">AI Vibe Coder</span> 设计的 PM 工具箱。覆盖产品从 0 到 1 再到增长的全流程。';
  html+=S.project?(' 当前项目：<span class="hl">'+esc(S.project.name)+'</span>'):'<span style="color:var(--warn)">未选择项目，点击左侧 + 新建一个</span>';
  html+='</div>';
  html+='<div class="pg">';
  // Phase 1
  html+='<div class="pc"><div class="pc-hdr"><span style="font-size:20px">🚀</span><span class="pc-title">Phase 1 · 从 0 到 1</span><span class="ptag p1">Phase 1</span></div><div class="chips">';
  for(var i=0;i<P1.length;i++){var t=TOOLS[P1[i]];html+='<div class="chip" onclick="navigate(\''+P1[i]+'\')">'+t.icon+' '+t.title+'</div>';}
  html+='</div></div>';
  // Phase 2
  html+='<div class="pc"><div class="pc-hdr"><span style="font-size:20px">📈</span><span class="pc-title">Phase 2 · 从 1 到增长</span><span class="ptag p2">Phase 2</span></div><div class="chips">';
  for(var j=0;j<P2.length;j++){var t2=TOOLS[P2[j]];html+='<div class="chip" onclick="navigate(\''+P2[j]+'\')">'+t2.icon+' '+t2.title+'</div>';}
  html+='</div></div></div>';
  // Artifacts or onboarding
  if(S.project){
    html+='<div><div class="sec-title">📂 '+esc(S.project.name)+' 的文档</div><div id="arts"><div style="color:var(--tx3);font-size:13px">加载中...</div></div></div>';
  } else {
    html+='<div class="onb"><div class="onb-title">🎉 欢迎使用 PMBot！</div><div class="onb-body">三步开始使用：<br>1️⃣ 点击左侧「+」创建一个产品项目<br>2️⃣ 选择 Phase 1 或 Phase 2 的工具<br>3️⃣ 填写表单，点击生成，保存文档到项目<br><br>推荐从这里开始 → <span class="chip" onclick="navigate(\'validate-idea\')" style="display:inline-flex;cursor:pointer">💡 想法验证</span></div></div>';
  }
  html+='</div>';
  return html;
}
function renderTool(id){
  var t=TOOLS[id];
  var pc=t.phase===1?'p1':'p2';
  var pl=t.phase===1?'Phase 1 · 从 0 到 1':'Phase 2 · 从 1 到增长';
  var html='<div class="tp">';
  html+='<div class="th"><span class="ti">'+t.icon+'</span><div class="tm"><div class="tt">'+t.title+'</div><div class="ts">'+t.sub+'</div></div><span class="pb '+pc+'">'+pl+'</span></div>';
  html+='<div class="tb"><div class="tip">';
  for(var i=0;i<t.fields.length;i++){html+=renderField(t.fields[i]);}
  html+='<button id="gb" class="btn btnp" onclick="handleGenerate(\''+id+'\')">'+t.btn+'</button>';
  if(S.project){html+='<div style="font-size:11px;color:var(--tx3);text-align:center">保存到：'+esc(S.project.name)+'</div>';}
  else{html+='<div style="font-size:11px;color:var(--warn);text-align:center">💡 选择项目后可保存文档</div>';}
  html+='</div><div class="top" id="out">';
  html+='<div class="oplaceholder"><div class="oplaceholder-icon">'+t.icon+'</div><div class="oplaceholder-text">填写左侧表单<br>点击「'+t.btn+'」<br>AI 将生成专业的 PM 文档</div></div>';
  html+='</div></div></div>';
  return html;
}
function renderField(f){
  var lbl='<label>'+esc(f.label)+(f.req?'<span class="rm">*</span>':'')+'</label>';
  if(f.type==='ta'){return '<div class="fg">'+lbl+'<textarea id="f-'+f.id+'" placeholder="'+esc(f.ph)+'" rows="'+(f.rows||3)+'"></textarea></div>';}
  if(f.type==='sel'){var opts='';for(var i=0;i<f.opts.length;i++){opts+='<option value="'+esc(f.opts[i])+'">'+esc(f.opts[i])+'</option>';}return '<div class="fg">'+lbl+'<select id="f-'+f.id+'">'+opts+'</select></div>';}
  return '<div class="fg">'+lbl+'<input type="text" id="f-'+f.id+'" placeholder="'+esc(f.ph)+'" /></div>';
}
function renderChatPage(){
  var html='<div class="cp">';
  html+='<div class="ch"><div><div class="ctitle">💬 PM 对话</div><div class="csub">与 AI 产品经理自由对话，获取产品建议和策略</div></div>';
  html+='<button class="btn btng btns" onclick="S.chatHist=[];renderChat();" style="margin-left:auto">清空对话</button></div>';
  html+='<div class="cms" id="cms"></div>';
  html+='<div class="cia"><div class="cir"><textarea id="ci" class="ci" placeholder="问我任何产品问题... (Enter 发送，Shift+Enter 换行)" rows="2"></textarea><button id="csnd" class="csnd" onclick="sendChat()">↑</button></div><div class="chint">Enter 发送 · Shift+Enter 换行</div></div>';
  html+='</div>';
  return html;
}
function setupChat(){
  // Render existing history or welcome message
  if(S.chatHist.length===0){
    var c=document.getElementById('cms');
    if(c)c.innerHTML='<div class="cm bot"><div class="cav bot">⚡</div><div class="cb"><div class="oc">'+marked.parse('你好！我是 **PMBot**，你的 AI 产品经理助手。\\n\\n我可以帮你：\\n- 🎯 分析产品策略和定位\\n- 👤 研究目标用户和市场\\n- 📈 制定增长和营销策略\\n- 🛠️ 技术选型和架构建议\\n- 📊 功能优先级和路线图规划\\n\\n有什么产品问题，直接问我吧！')+'</div></div></div>';
  } else {renderChat();}
  var inp=document.getElementById('ci');
  if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}});
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function renderProjList(){
  var c=document.getElementById('proj-list');if(!c)return;
  if(!S.projects.length){c.innerHTML='<div class="no-proj">暂无项目，点击 + 创建</div>';return;}
  var html='';
  for(var i=0;i<S.projects.length;i++){
    var p=S.projects[i];
    var act=S.project&&S.project.id===p.id;
    html+='<div class="proj-item'+(act?' active':'')+'" onclick="selectProject(\''+escA(p.id)+'\',\''+escA(p.name)+'\')">';
    html+='<div class="proj-dot"></div><span class="proj-name">'+esc(p.name)+'</span>';
    if(p.artifactCount)html+='<span class="proj-cnt">'+p.artifactCount+'</span>';
    html+='</div>';
  }
  c.innerHTML=html;
}
function buildNav(){
  var c=document.getElementById('nav');if(!c)return;
  var html='<div class="ni" data-tool="dashboard" onclick="navigate(\'dashboard\')">🏠 工作台</div>';
  html+='<div class="nsl p1">Phase 1 · 从 0 到 1</div>';
  for(var i=0;i<P1.length;i++){var t=TOOLS[P1[i]];html+='<div class="ni" data-tool="'+P1[i]+'" onclick="navigate(\''+P1[i]+'\')">'+t.icon+' '+t.title+'</div>';}
  html+='<div class="nsl p2">Phase 2 · 从 1 到增长</div>';
  for(var j=0;j<P2.length;j++){var t2=TOOLS[P2[j]];html+='<div class="ni" data-tool="'+P2[j]+'" onclick="navigate(\''+P2[j]+'\')">'+t2.icon+' '+t2.title+'</div>';}
  html+='<div class="ndiv"></div><div class="ni" data-tool="chat" onclick="navigate(\'chat\')">💬 PM 对话</div>';
  c.innerHTML=html;
}

// ── Modal ──────────────────────────────────────────────────────────────────
function showCreateProject(){
  var m=document.getElementById('modal');
  m.className='modal';
  m.innerHTML='<h3>📁 新建项目</h3><div class="fg" style="margin-bottom:10px"><label>项目名称<span class="rm">*</span></label><input type="text" id="p-name" placeholder="例如：我的 SaaS 产品" /></div><div class="fg"><label>项目描述（可选）</label><textarea id="p-desc" placeholder="一句话描述这个产品..." rows="2"></textarea></div><div class="moa"><button onclick="closeModal()" class="btn btng">取消</button><button onclick="createProject()" class="btn btnp" style="width:auto;padding:9px 20px">创建项目</button></div>';
  document.getElementById('mo').classList.remove('hidden');
  setTimeout(function(){var e=document.getElementById('p-name');if(e)e.focus();},60);
}
function closeModal(){document.getElementById('mo').classList.add('hidden');}

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:22px;right:22px;background:var(--sf);border:1px solid var(--bd);border-radius:8px;padding:10px 16px;font-size:13px;z-index:200;box-shadow:0 4px 20px rgba(0,0,0,.5);animation:fadeIn .2s ease;';
  t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove();},2500);
}

// ── Init ───────────────────────────────────────────────────────────────────
marked.setOptions({breaks:true,gfm:true});
buildNav();
loadProjects().then(function(){navigate('dashboard');});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
window.navigate=navigate;window.showCreateProject=showCreateProject;window.closeModal=closeModal;
window.createProject=createProject;window.selectProject=selectProject;
window.handleGenerate=handleGenerate;window.saveArtifact=saveArtifact;window.copyOut=copyOut;
window.sendChat=sendChat;window.showArt=showArt;window.showToast=showToast;window.S=S;
})();
<\/script>
</body>
</html>`;
}
