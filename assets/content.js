const API_HOST = "https://ergouzi.life";
const OPENAI_BASE = API_HOST;
const CLAUDE_BASE = API_HOST;
const ANTHROPIC_SDK_BASE = API_HOST;
const GEMINI_BASE = API_HOST;
const PURCHASE_WALLET_IMAGE = "./assets/purchase/step1.png";
const PURCHASE_PRODUCT_IMAGE = "./assets/purchase/step2.png";
const PURCHASE_CODE_IMAGE = "./assets/purchase/step3.png";
const PURCHASE_REDEEM_IMAGE = "./assets/purchase/step4.png";

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const code = (lang, snippet) => `
  <pre data-lang="${lang}"><code>${escapeHtml(snippet.trim())}</code></pre>
`;

const callout = (tone, title, body) => `
  <div class="callout ${tone}">
    <p class="callout-title">${title}</p>
    <p>${body}</p>
  </div>
`;

const pageHead = (section, title, lead, badge) => `
  <div class="page-head">
    <p class="eyebrow">${section}</p>
    <div class="title-row">
      <h1>${title}</h1>
      ${badge ? `<span class="page-badge">${badge}</span>` : ""}
    </div>
    <p class="lead">${lead}</p>
  </div>
`;

export const navSections = [
  { title: "开始", items: ["/"] },
  { title: "购买教程", items: ["/purchase-guide"] },
  {
    title: "应用集成",
    items: [
      "/apps",
      "/apps/cherry-studio",
      "/apps/chat-clients",
      "/apps/editor-tools",
      "/apps/cli-tools",
      "/apps/translator-bots",
    ],
  },
  {
    title: "API 集成",
    items: [
      "/api",
      "/api/openai-compatible",
      "/api/claude-native",
      "/api/gemini-native",
    ],
  },
  {
    title: "SDK 集成",
    items: ["/sdk/openai", "/sdk/claude", "/sdk/gemini"],
  },
  {
    title: "API 调用示例",
    items: [
      "/examples/openai-compatible",
      "/examples/chat-completions",
      "/examples/responses",
      "/examples/images",
      "/examples/audio",
      "/examples/claude",
      "/examples/gemini",
    ],
  },
];

export const pages = [
  {
    path: "/",
    group: "开始",
    title: "首页",
    summary: "Ergouzi API 文档总览，包含推荐接入路线、基础地址和快速开始。",
    keywords: ["首页", "快速开始", "总览", "OpenAI", "Claude", "Gemini"],
    content: `
      <section class="hero">
        <p class="eyebrow">Ergouzi Docs</p>
        <h1>统一接入 OpenAI、Claude 与 Gemini 的文档站</h1>
        <p class="lead">
          这套文档围绕 <code class="inline-code">${API_HOST}</code> 构建，覆盖应用集成、协议接入、官方 SDK 设置以及常见 API
          调用示例。大多数业务直接走 OpenAI 兼容入口即可，只有在你明确需要官方原生字段时，再切换到 Claude 或 Gemini 原生协议。
        </p>

        <div class="pills">
          <span class="pill">默认地址：<code class="inline-code">${API_HOST}</code></span>
          <span class="pill">推荐协议：OpenAI Compatible</span>
          <span class="pill">适配对象：Apps / SDK / Server-to-Server</span>
        </div>

        <div class="button-row">
          <a class="button" href="#/api/openai-compatible">从 OpenAI 兼容接入开始</a>
          <a class="button-ghost" href="#/apps">查看应用集成总览</a>
        </div>

        <div class="metric-row">
          <div class="metric-card">
            <strong>协议入口</strong>
            <div class="metric-value">3 类</div>
            <p>OpenAI 兼容、Claude 原生、Gemini 原生。</p>
          </div>
          <div class="metric-card">
            <strong>文档分层</strong>
            <div class="metric-value">4 组</div>
            <p>应用、API、SDK、调用示例分开组织，便于快速定位。</p>
          </div>
          <div class="metric-card">
            <strong>默认域名</strong>
            <div class="metric-value">1 个</div>
            <p>全站所有示例都统一替换为 Ergouzi 站点地址。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>推荐使用路线</h2>
        <div class="hero-subgrid">
          <div class="feature-card">
            <strong>1. 应用集成</strong>
            <p>如果你在使用 Cherry Studio、Next Chat、Lobe Chat、Cursor、Claude Code 之类的现成应用，先从应用集成总览进入，再按工具类型查看对应教程。</p>
          </div>
          <div class="feature-card">
            <strong>2. API 集成</strong>
            <p>如果你在做后端服务、自动化任务或 Agent 平台，大多数情况下直接使用 OpenAI 兼容接口就足够。</p>
          </div>
          <div class="feature-card">
            <strong>3. SDK / 示例</strong>
            <p>如果你已经确定使用官方 SDK 或希望直接抄一段可运行示例，可以从 SDK 集成与 API 示例两组页面进入。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>30 秒快速开始</h2>
        <p>
          先准备你自己的 API Key，然后把默认 OpenAI 兼容地址设置到 SDK 或客户端里。下面是一段最小可运行请求：
        </p>
        ${code(
          "bash",
          `
export ERGOUZI_API_KEY="your_api_key_here"

curl --request POST \\
  --url ${OPENAI_BASE}/chat/completions \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "请用一句话介绍 Ergouzi API。"}
    ]
  }'
        `,
        )}
        ${callout(
          "info",
          "建议默认从 OpenAI 兼容开始",
          "它覆盖聊天、多模态、图片和音频等大多数常见场景，后续再按需切换到 Claude 或 Gemini 原生形态。"
        )}
      </section>

      <section>
        <h2>文档入口</h2>
        <div class="card-grid">
          <a class="link-card" href="#/apps">
            <strong>应用集成</strong>
            <p>覆盖 Cherry Studio、Next Chat、Cursor、Claude Code、LangBot、FluentRead 等常见客户端与工具。</p>
          </a>
          <a class="link-card" href="#/api">
            <strong>API 集成</strong>
            <p>理解三种协议入口的差异、鉴权方式以及适用范围。</p>
          </a>
          <a class="link-card" href="#/sdk/openai">
            <strong>SDK 集成</strong>
            <p>OpenAI、Anthropic 与 Gemini 官方 SDK 的配置示例。</p>
          </a>
          <a class="link-card" href="#/examples/chat-completions">
            <strong>API 调用示例</strong>
            <p>直接复制 curl、Node.js、Python 示例进行联调。</p>
          </a>
          <a class="link-card" href="#/purchase-guide">
            <strong>购买教程</strong>
            <p>从注册登录、购买兑换码到最终兑换的完整流程说明。</p>
          </a>
        </div>
      </section>

      <section>
        <h2>基础地址与鉴权</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>接入风格</th>
                <th>Base URL</th>
                <th>鉴权头</th>
                <th>建议场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OpenAI 兼容</td>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
                <td><code class="inline-code">Authorization: Bearer &lt;API_KEY&gt;</code></td>
                <td>默认推荐，覆盖大部分文本、多模态、图像和音频调用。</td>
              </tr>
              <tr>
                <td>Claude 原生</td>
                <td><code class="inline-code">${CLAUDE_BASE}</code></td>
                <td><code class="inline-code">x-api-key: &lt;API_KEY&gt;</code></td>
                <td>需要严格对齐 Anthropic Messages API 字段时使用。</td>
              </tr>
              <tr>
                <td>Gemini 原生</td>
                <td><code class="inline-code">${GEMINI_BASE}</code></td>
                <td><code class="inline-code">x-goog-api-key: &lt;API_KEY&gt;</code></td>
                <td>需要严格对齐 Gemini generateContent 或流式 SSE 时使用。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>后续阅读顺序</h2>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>应用用户</strong>
            <p>先看 <a href="#/apps">应用集成总览</a>，再按聊天客户端、编辑器插件、CLI 工具或翻译/机器人分组进入。</p>
          </div>
          <div class="spot-card">
            <strong>后端开发</strong>
            <p>先看 <a href="#/api/openai-compatible">OpenAI 兼容</a>，然后对照 <a href="#/examples/responses">Responses</a> 或 <a href="#/examples/chat-completions">Chat Completions</a>。</p>
          </div>
          <div class="spot-card">
            <strong>SDK 用户</strong>
            <p>按你用的官方库选择 <a href="#/sdk/openai">OpenAI</a>、<a href="#/sdk/claude">Claude</a> 或 <a href="#/sdk/gemini">Gemini</a> 页面。</p>
          </div>
          <div class="spot-card">
            <strong>购买兑换码</strong>
            <p>如果你需要购买并兑换源码商品，直接看 <a href="#/purchase-guide">购买教程</a> 页面。</p>
          </div>
        </div>
      </section>
    `,
  },
  {
    path: "/purchase-guide",
    group: "购买教程",
    title: "购买教程",
    summary: "从注册登录、购买兑换码到最终兑换额度的完整购买流程。",
    keywords: ["购买教程", "兑换码", "钱包管理", "openclaw源码", "OpenCode源码"],
    content: `
      ${pageHead(
        "购买教程",
        "购买教程",
        "这页整理了完整的购买流程：先注册登录，再进入钱包管理购买兑换码，随后在二狗的中转站下单商品，拿到兑换码后再回到钱包页完成兑换。",
        "Guide",
      )}

      ${callout(
        "info",
        "商品名以页面实际显示为准",
        "你的描述里写的是“openclaw源码”，截图里展示的是“OpenCode源码”。购买时请按页面里实际显示的商品名称下单，本教程的流程本身不变。"
      )}

      <section>
        <h2>购买流程概览</h2>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>1. 注册并登录</strong>
            <p>先完成账号注册，然后登录到二狗控制台。</p>
          </div>
          <div class="spot-card">
            <strong>2. 进入钱包管理</strong>
            <p>在钱包管理页点击“购买兑换码”。</p>
          </div>
          <div class="spot-card">
            <strong>3. 购买商品</strong>
            <p>在二狗的中转站购买对应的源码商品，并按需要的数量下单。</p>
          </div>
          <div class="spot-card">
            <strong>4. 获取兑换码</strong>
            <p>付款完成后，在聊天或订单消息里拿到兑换码。</p>
          </div>
          <div class="spot-card">
            <strong>5. 完成兑换</strong>
            <p>回到钱包管理页输入兑换码并点击兑换。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>第一步：注册账号并登录</h2>
        <p>
          先完成账号注册，然后登录到二狗平台。只有在登录状态下，你才能进入钱包管理页面、购买兑换码以及后续完成兑换。
        </p>
        <ul>
          <li>如果你还没有账号，先走注册流程创建一个新账号。</li>
          <li>如果已经有账号，直接登录即可。</li>
          <li>登录成功后，再继续进入钱包管理页面。</li>
        </ul>
      </section>

      <section>
        <h2>第二步：点击钱包管理，然后点击购买兑换码</h2>
        <p>
          登录后进入钱包管理页面，在“兑换码充值”区域找到 <strong>购买兑换码</strong> 入口，点击后跳转到二狗的中转站购买页。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${PURCHASE_WALLET_IMAGE}" alt="钱包管理页中的购买兑换码入口" loading="lazy" />
          </div>
          <p class="doc-image-caption">在钱包管理页面的“兑换码充值”区域点击“购买兑换码”。</p>
        </div>
      </section>

      <section>
        <h2>第三步：在二狗的中转站购买商品，按照数量来买</h2>
        <p>
          跳转到二狗的中转站后，找到你要购买的源码商品。根据你的描述，这里购买的是 <strong>openclaw源码</strong>；如果页面里显示的是 <strong>OpenCode源码</strong>，则以实际页面名称为准。
        </p>
        <ul>
          <li>确认商品名称没有选错。</li>
          <li>按你需要的数量调整购买件数。</li>
          <li>完成付款后等待商家回传兑换码。</li>
        </ul>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${PURCHASE_PRODUCT_IMAGE}" alt="二狗的中转站商品购买页面" loading="lazy" />
          </div>
          <p class="doc-image-caption">在商品详情页确认名称和数量后完成购买。</p>
        </div>
      </section>

      <section>
        <h2>第四步：拿到兑换码</h2>
        <p>
          购买成功后，你会在订单消息或聊天消息中收到一串兑换码。复制这串完整内容，不要漏掉任何字符或多复制空格。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${PURCHASE_CODE_IMAGE}" alt="聊天消息中的兑换码" loading="lazy" />
          </div>
          <p class="doc-image-caption">收到兑换码后先完整复制，后面要粘贴到兑换输入框里。</p>
        </div>
      </section>

      <section>
        <h2>第五步：进行兑换</h2>
        <p>
          回到钱包管理页面，在“兑换码充值”输入框中粘贴刚才复制的兑换码，然后点击 <strong>兑换额度</strong> 按钮完成兑换。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${PURCHASE_REDEEM_IMAGE}" alt="在钱包管理页输入兑换码并点击兑换额度" loading="lazy" />
          </div>
          <p class="doc-image-caption">把兑换码粘贴进去，然后点击“兑换额度”。</p>
        </div>
      </section>

      <section>
        <h2>常见注意事项</h2>
        <ul>
          <li>商品名称以购买页面实际显示为准，不要只按截图文字死记。</li>
          <li>兑换码一般区分大小写，复制时不要修改内容。</li>
          <li>如果提示兑换失败，先检查是否复制完整、是否有多余空格、是否重复兑换。</li>
          <li>如果付款成功但没有收到兑换码，回到订单消息或联系商家确认发码状态。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps",
    group: "应用集成",
    title: "应用集成总览",
    summary: "按聊天客户端、编辑器插件、CLI 工具、翻译/机器人四类整理所有应用接入方式。",
    keywords: [
      "应用集成",
      "Cherry Studio",
      "Next Chat",
      "Lobe Chat",
      "Cursor",
      "Claude Code",
      "LangBot",
      "FluentRead",
      "LunaTranslator",
    ],
    content: `
      ${pageHead(
        "应用集成",
        "应用集成总览",
        "这一组页面覆盖聊天客户端、编辑器插件、命令行工具、翻译插件和机器人平台。接入时先判断应用要你填的是站点地址、OpenAI 兼容 Base URL，还是 Claude / Gemini 原生地址，再按对应分组照着填即可。",
        "Apps",
      )}

      ${callout(
        "info",
        "先分清字段类型",
        "如果应用字段叫 API Host / 站点地址 / 域名，通常填写根域名；如果字段叫 Base URL / apiBase / Endpoint，这里也统一填写根域名。"
      )}

      <section>
        <h2>通用地址速查</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>用途</th>
                <th>填写值</th>
                <th>常见应用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>站点地址 / API Host</td>
                <td><code class="inline-code">${API_HOST}</code></td>
                <td>Next Chat、ChatWise，以及只收 Host 的导入链接。</td>
              </tr>
              <tr>
                <td>OpenAI 兼容 Base URL</td>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
                <td>Lobe Chat、Chatbox、Continue、多数桌面客户端与 IDE 插件。</td>
              </tr>
              <tr>
                <td>Claude 原生 Base URL</td>
                <td><code class="inline-code">${CLAUDE_BASE}</code></td>
                <td>Claude Code 等 Anthropic 风格客户端。</td>
              </tr>
              <tr>
                <td>Gemini 原生 Base URL</td>
                <td><code class="inline-code">${GEMINI_BASE}</code></td>
                <td>Gemini CLI 等 Google Gemini 风格客户端。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>分类入口</h2>
        <div class="card-grid">
          <a class="link-card" href="#/apps/cherry-studio">
            <strong>Cherry Studio</strong>
            <p>单独页面，覆盖提供商添加、模型切换和绘图配置。</p>
          </a>
          <a class="link-card" href="#/apps/chat-clients">
            <strong>聊天客户端</strong>
            <p>Next Chat、Lobe Chat、Chatbox、ChatWise、uTools 等常见前端。</p>
          </a>
          <a class="link-card" href="#/apps/editor-tools">
            <strong>编辑器与插件</strong>
            <p>Cursor 与 Continue 的模型、补全和自定义 Base URL 配置。</p>
          </a>
          <a class="link-card" href="#/apps/cli-tools">
            <strong>CLI 与编码助手</strong>
            <p>Claude Code、Codex CLI、Factory Droid CLI、Gemini CLI、OpenCode。</p>
          </a>
          <a class="link-card" href="#/apps/translator-bots">
            <strong>翻译工具与机器人</strong>
            <p>FluentRead、LunaTranslator、LangBot 的接入和模型选择。</p>
          </a>
        </div>
      </section>

      <section>
        <h2>本页覆盖的应用</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>分组</th>
                <th>应用</th>
                <th>推荐入口</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>聊天客户端</td>
                <td>Cherry Studio、Next Chat、Lobe Chat、Chatbox、ChatWise、uTools-ChatGPT 好友</td>
                <td>优先走 OpenAI 兼容。</td>
              </tr>
              <tr>
                <td>编辑器插件</td>
                <td>Cursor、Continue</td>
                <td>优先走 OpenAI 兼容，Cursor 用 Claude 时注意模型别名。</td>
              </tr>
              <tr>
                <td>CLI 工具</td>
                <td>Claude Code、OpenAI Codex CLI、Factory Droid CLI、Gemini CLI、OpenCode</td>
                <td>按各自原生环境变量或配置文件填写。</td>
              </tr>
              <tr>
                <td>翻译与机器人</td>
                <td>FluentRead、LunaTranslator、LangBot</td>
                <td>插件类通常可一键导入，机器人/知识库类额外关注 embedding 模型。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>接入前自检</h2>
        <ul>
          <li>先准备一枚可用 API Key，并确认该 Key 所在分组已经开放你要用的模型。</li>
          <li>文本、多模态、图片、补全可能对应不同模型，客户端里看不到模型时优先检查模型名与权限。</li>
          <li>同一个应用里如果同时存在 Host 和 Base URL 两种字段，统一使用根域名，不要自己再拼额外路径。</li>
          <li>截图型原教程没有把字段逐项写出来的地方，我已经按其 OpenAI 兼容接入方式补成可执行配置；如果你的应用版本 UI 不同，以字段含义为准。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps/chat-clients",
    group: "应用集成",
    title: "聊天客户端",
    summary: "Next Chat、Lobe Chat、Chatbox、ChatWise、uTools 等聊天前端的接入配置。",
    keywords: ["聊天客户端", "Next Chat", "Lobe Chat", "Chatbox", "ChatWise", "uTools"],
    content: `
      ${pageHead(
        "应用集成",
        "聊天客户端",
        "这一页整理偏前端和桌面聊天客户端的接入方式。除个别导入链接外，大多数客户端最终都还是走 OpenAI 兼容模式。",
        "Clients",
      )}

      ${callout(
        "warn",
        "字段名相似但不完全一样",
        "Next Chat 和 ChatWise 常见的是站点地址；Lobe Chat、Chatbox 这类更像开发工具的客户端，虽然字段叫 Base URL，但这里也统一填写根地址。"
      )}

      <section>
        <h2>Cherry Studio</h2>
        <p>
          Cherry Studio 已经单独整理成完整页面，包含提供商添加、模型切换和绘图配置。这里不重复展开，直接跳转查看即可。
        </p>
        <div class="card-grid">
          <a class="link-card" href="#/apps/cherry-studio">
            <strong>打开 Cherry Studio 集成</strong>
            <p>查看参数填写、一键导入和绘图流程。</p>
          </a>
        </div>
      </section>

      <section>
        <h2>Next Chat</h2>
        <p>
          Next Chat 的核心是把 API 地址指向你的站点根域名，然后在自定义模型里把 Claude / Gemini 等其它厂商模型按 OpenAI 方式声明出来。
        </p>
        ${code(
          "text",
          `
https://{your-next-chat-domain}/#/?settings={"key":"<YOUR_API_KEY>","url":"${API_HOST}"}
          `,
        )}
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>API Key</th>
                <td>填写你的 Ergouzi API Key。</td>
              </tr>
              <tr>
                <th>URL / API 地址</th>
                <td><code class="inline-code">${API_HOST}</code></td>
              </tr>
              <tr>
                <th>自定义模型</th>
                <td>如果要兼容其它厂商模型，按 <code class="inline-code">+模型名@OpenAI</code> 的格式添加，例如 <code class="inline-code">+claude-sonnet-4@OpenAI</code>。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Lobe Chat</h2>
        <p>
          Lobe Chat 手动配置时，直接把 OpenAI 的 API Key 和 Base URL 改成 Ergouzi 即可，然后获取模型列表并启用你要用的模型。
        </p>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>配置位置</th>
                <td>应用配置 → 语言模型 → OpenAI</td>
              </tr>
              <tr>
                <th>API Key</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>Base URL</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>模型列表</th>
                <td>点击“获取模型列表”后，再手动启用需要的模型。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Chatbox</h2>
        <p>
          Chatbox 集成页给的是界面入口，实操时按 OpenAI API 提供商来填最稳。看不到模型列表时，可以先手动输入模型 ID 验证联通性。
        </p>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>模型提供方</th>
                <td><code class="inline-code">OpenAI API</code></td>
              </tr>
              <tr>
                <th>API Key</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>API Base URL</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>模型名</th>
                <td>优先从可用模型列表中复制，或先手动填一个确定可用的模型 ID。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>ChatWise</h2>
        <p>
          在设置 → 供应商里新增一个 <code class="inline-code">OpenAI Compatible</code> 提供商即可。它的原教程填的是站点地址，不是单独的 SDK Base URL。
        </p>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>供应商类型</th>
                <td><code class="inline-code">OpenAI Compatible</code></td>
              </tr>
              <tr>
                <th>API 地址</th>
                <td><code class="inline-code">${API_HOST}</code></td>
              </tr>
              <tr>
                <th>API Key</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>模型</th>
                <td>保存后选择可用模型开始对话。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>uTools-ChatGPT 好友</h2>
        <p>
          uTools 这一页原教程基本只给了界面截图，没有逐项文字说明。我这里按它的 OpenAI 兼容接入方式整理成可执行填写项，适合有自定义接口入口的版本。
        </p>
        ${callout(
          "info",
          "这一节包含合理推断",
          "原始集成页没有展开字段表，所以这里按同类 OpenAI 兼容客户端的常规填法给出最稳妥配置：Key 填你的令牌，地址统一填根域名。"
        )}
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>接入方式</th>
                <td>选择自定义 / OpenAI 兼容服务。</td>
              </tr>
              <tr>
                <th>API Key</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>API Base URL</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>模型</th>
                <td>先填一个确定可用的聊天模型做联通测试。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>这组应用最常见的问题</h2>
        <ul>
          <li>界面里只让填站点地址时，直接填根域名即可。</li>
          <li>提示模型不存在时，优先检查模型名是否和平台实际开放的一致，尤其是 Claude / Gemini 自定义模型别名。</li>
          <li>能保存但无法请求时，通常是 Key 无权限、地址填错，或客户端把根域名和 Base URL 重复拼接了。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps/editor-tools",
    group: "应用集成",
    title: "编辑器与插件",
    summary: "Cursor 与 Continue 的 OpenAI 兼容接入方式。",
    keywords: ["编辑器", "Cursor", "Continue", "IDE", "补全"],
    content: `
      ${pageHead(
        "应用集成",
        "编辑器与插件",
        "这一页覆盖面向编辑器的模型接入。Continue 的配置文件最明确，Cursor 的原教程更偏界面提示，因此我把能确认的字段和必须注意的模型别名都收在这里。",
        "IDE",
      )}

      ${callout(
        "warn",
        "Cursor 页面以模型选择为主",
        "Cursor 原教程主要强调 Claude 模型别名，其他字段会因版本和接入模式不同而变化。下面给的是最稳妥的 OpenAI 兼容填法。"
      )}

      <section>
        <h2>Cursor</h2>
        <p>
          打开右上角齿轮，进入 <strong>Settings → Models</strong> 页面。如果你的 Cursor 版本支持自定义 OpenAI 兼容端点，优先把自定义提供商指向 Ergouzi 的 OpenAI 兼容地址。
        </p>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>接入模式</th>
                <td>自定义 OpenAI 兼容提供商 / 自定义模型端点</td>
              </tr>
              <tr>
                <th>API Key</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>Base URL</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>Claude 模型别名</th>
                <td>如果要用 Claude，按原教程使用 <code class="inline-code">cursor-3-5-sonnet-20240620</code> 或 <code class="inline-code">cursor-3-5-sonnet-latest</code> 这类 Cursor 兼容名称。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Continue</h2>
        <p>
          Continue 的配置文件区分聊天模型和 Tab 自动补全模型。两者都可以指向同一个 Ergouzi OpenAI 兼容地址，只是模型可以按场景拆开配置。
        </p>
        ${code(
          "json",
          `
{
  "models": [
    {
      "model": "gpt-4o",
      "provider": "openai",
      "apiKey": "your_api_key_here",
      "apiBase": "${OPENAI_BASE}",
      "title": "GPT-4o Ergouzi"
    }
  ],
  "tabAutocompleteModel": {
    "title": "GPT-4o Autocomplete",
    "provider": "openai",
    "model": "gpt-4o",
    "apiKey": "your_api_key_here",
    "apiBase": "${OPENAI_BASE}"
  }
}
          `,
        )}
        <ul>
          <li><code class="inline-code">models</code> 用于聊天、编辑和 Agent 交互。</li>
          <li><code class="inline-code">tabAutocompleteModel</code> 用于代码自动补全。</li>
          <li>如果你更偏成本控制，可以把自动补全模型切到更便宜的小模型。</li>
        </ul>
      </section>

      <section>
        <h2>建议做法</h2>
        <ul>
          <li>先用一个稳定的通用文本模型把聊天功能接通，再单独优化自动补全模型。</li>
          <li>Cursor 如果看得到模型但请求失败，优先检查它实际发出的请求是否仍然走官方端点。</li>
          <li>Continue 如果加载不到模型列表，通常是 <code class="inline-code">apiBase</code> 填错、被客户端重复拼接路径，或 Key 权限不足。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps/cli-tools",
    group: "应用集成",
    title: "CLI 与编码助手",
    summary: "Claude Code、Codex CLI、Factory Droid CLI、Gemini CLI、OpenCode 的接入配置。",
    keywords: [
      "CLI",
      "Claude Code",
      "Codex CLI",
      "Factory Droid CLI",
      "Gemini CLI",
      "OpenCode",
    ],
    content: `
      ${pageHead(
        "应用集成",
        "CLI 与编码助手",
        "这一页覆盖终端类工具。它们的共同点是都能接第三方接口，只是有的走环境变量，有的走配置文件。配置成功后，你就可以在终端里直接复用 Ergouzi 的模型能力。",
        "CLI",
      )}

      <section>
        <h2>先记住这几个地址</h2>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>OpenAI 兼容</strong>
            <p><code class="inline-code">${OPENAI_BASE}</code></p>
          </div>
          <div class="spot-card">
            <strong>Claude 原生</strong>
            <p><code class="inline-code">${CLAUDE_BASE}</code></p>
          </div>
          <div class="spot-card">
            <strong>Gemini 原生</strong>
            <p><code class="inline-code">${GEMINI_BASE}</code></p>
          </div>
        </div>
      </section>

      <section>
        <h2>Claude Code</h2>
        <p>
          Claude Code 的原教程给了安装和环境变量脚本。手动配置时，本质上就是把 Anthropic 的 Key 和 Base URL 指到 Ergouzi。
        </p>
        ${code(
          "bash",
          `
npm install -g @anthropic-ai/claude-code

export ANTHROPIC_API_KEY="your_api_key_here"
export ANTHROPIC_BASE_URL="${ANTHROPIC_SDK_BASE}"

claude
          `,
        )}
        ${callout(
          "info",
          "这里用根地址",
          `Claude Code 这一类 Anthropic 客户端这里填写的是根地址 <code class="inline-code">${ANTHROPIC_SDK_BASE}</code>，不要手动再加 <code class="inline-code">/claude</code>。`
        )}
        ${callout(
          "warn",
          "关于官方预设模型",
          "一旦你把 ANTHROPIC_BASE_URL 改到自定义接入点，Claude Code 中所有模型请求都会走你配置的网关，不再使用官方账号额度。"
        )}
      </section>

      <section>
        <h2>OpenAI Codex CLI</h2>
        <p>
          Codex CLI 走 OpenAI 风格配置最直接。你可以用环境变量临时切换，也可以后续再把 provider 固化到配置文件里。
        </p>
        ${code(
          "bash",
          `
npm install -g @openai/codex

export OPENAI_API_KEY="your_api_key_here"
export OPENAI_BASE_URL="https://ergouzi.life"
export OPENAI_MODEL="gpt-5.4-mini"

codex
          `,
        )}
        <p>
          启动后如果你想切模型，可以直接在 Codex 里执行 <code class="inline-code">/model</code>。如果你的网关只支持 Chat Completions 而不是 Responses，再考虑改成自定义 provider 配置。
        </p>
      </section>

      <section>
        <h2>Factory Droid CLI</h2>
        <p>
          Factory Droid CLI 的原教程推荐安装后用一键脚本改配置。手动理解的话，核心就是把它连接到第三方 OpenAI 兼容端点，并填入你的 API Key。
        </p>
        <div class="tabs" data-tabs>
          <div class="tab-list">
            <button class="tab-trigger is-active" data-tab-trigger="droid-unix" type="button">macOS / Linux</button>
            <button class="tab-trigger" data-tab-trigger="droid-win" type="button">Windows</button>
          </div>
          <div class="tab-panel is-active" data-tab-panel="droid-unix">
            ${code(
              "bash",
              `
curl -fsSL https://app.factory.ai/cli | sh

# 如果你使用原教程的一键配置脚本：
curl -fsSL https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/factory-cli-setup.sh | bash

droid
              `,
            )}
          </div>
          <div class="tab-panel" data-tab-panel="droid-win">
            ${code(
              "powershell",
              `
irm https://app.factory.ai/cli/windows | iex

# 如果你使用原教程的一键配置脚本：
iex (irm 'https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/factory-cli-setup.ps1')

droid
              `,
            )}
          </div>
        </div>
        <p>
          如果你不走脚本，手动配置时的目标也一样：把第三方 API 地址改到 <code class="inline-code">${OPENAI_BASE}</code>，并填入你的 API Key。
        </p>
      </section>

      <section>
        <h2>Gemini CLI</h2>
        <p>
          Gemini CLI 直接通过环境变量切到 Gemini 原生入口，最适合你已经习惯 Google 命令行工作流的场景。
        </p>
        ${code(
          "bash",
          `
npm install -g @google/gemini-cli

cat >> ~/.env <<'EOF'
GOOGLE_GEMINI_BASE_URL=${GEMINI_BASE}
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
EOF

gemini
          `,
        )}
        ${callout(
          "info",
          "Gemini 这里也用根地址",
          `Gemini CLI 的 <code class="inline-code">GOOGLE_GEMINI_BASE_URL</code> 这里填写 <code class="inline-code">${GEMINI_BASE}</code>，不要手动再加 <code class="inline-code">/gemini</code>。`
        )}
      </section>

      <section>
        <h2>OpenCode</h2>
        <p>
          OpenCode 的原教程建议把 OpenAI、Anthropic 和第三方模型拆成不同 provider。这样可以保留它对内置 provider 的特定优化，同时继续接第三方模型。
        </p>
        ${code(
          "json",
          `
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "name": "Anthropic",
      "options": {
        "baseURL": "${OPENAI_BASE}"
      }
    },
    "openai": {
      "options": {
        "baseURL": "${OPENAI_BASE}"
      }
    },
    "ergouzi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ergouzi",
      "options": {
        "baseURL": "${OPENAI_BASE}"
      },
      "models": {
        "deepseek-v3.2": {
          "name": "DeepSeek V3.2"
        }
      }
    }
  }
}
          `,
        )}
        <p>
          然后分别执行 <code class="inline-code">opencode auth login</code> 给 OpenAI、Anthropic 和自定义 provider 添加凭证。第一次进入项目后，先跑一次 <code class="inline-code">/init</code>，再通过 <code class="inline-code">/models</code> 切模型。
        </p>
      </section>

      <section>
        <h2>常见坑</h2>
        <ul>
          <li>CLI 能启动但一请求就 401，通常是环境变量加载顺序不对，或当前 shell 没有真正读到你刚写入的变量。</li>
          <li>如果一个 CLI 明明说自己兼容 OpenAI，但它内部实际上走 Responses 或 WebSocket，网关能力不同会影响是否能正常流式工作。</li>
          <li>OpenCode 这种多 provider 结构里，不要把所有模型都硬塞到同一个 provider 下，否则容易丢掉它对内置 provider 的特殊能力。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps/translator-bots",
    group: "应用集成",
    title: "翻译工具与机器人",
    summary: "FluentRead、LunaTranslator、LangBot 的接入方式，以及一键导入与知识库模型配置。",
    keywords: ["FluentRead", "LunaTranslator", "LangBot", "翻译", "机器人", "知识库"],
    content: `
      ${pageHead(
        "应用集成",
        "翻译工具与机器人",
        "这一页覆盖翻译插件、GalGame 翻译器和 IM 机器人平台。它们普遍支持一键导入或手动填写地址与 Key，LangBot 这类平台还要额外关注 embedding 模型和流水线选择。",
        "Tools",
      )}

      <section>
        <h2>FluentRead</h2>
        <p>
          FluentRead 既支持从控制台一键导入，也支持手动填写配置。手动模式下，它要求的是站点根域名，而不是带额外路径的 SDK Base URL。
        </p>
        ${callout(
          "info",
          "可选的一键导入项",
          '如果你维护控制台的一键填充能力，可以加入：{ "流畅阅读": "fluentread" }。'
        )}
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>翻译服务</th>
                <td><code class="inline-code">NewAPI</code> / 你的自定义服务名</td>
              </tr>
              <tr>
                <th>访问令牌</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>NewAPI 接口</th>
                <td><code class="inline-code">${API_HOST}</code></td>
              </tr>
              <tr>
                <th>模型</th>
                <td>从列表中选择，或者手动输入模型名称。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>LunaTranslator</h2>
        <p>
          LunaTranslator 的原教程同时给了“一键配置”和“手动配置”。不管走哪一种，最终都要在大模型接口里拿到可用模型列表，并启用对应接口。
        </p>
        ${callout(
          "info",
          "可选的一键导入项",
          '如果你维护控制台的一键填充能力，可以加入：{ "LunaTranslator": "lunatranslator://llmapi/base64?data={cheryConfig}" }。'
        )}
        <div class="step-grid">
          <div class="step-card">
            <span class="step-number">1</span>
            <strong>获取 API Key</strong>
            <p>先在控制台复制一枚用于 LunaTranslator 的 API Key。</p>
          </div>
          <div class="step-card">
            <span class="step-number">2</span>
            <strong>新增大模型接口</strong>
            <p>进入设置 → 翻译设置 → 大模型，复制“大模型通用接口”模板后新增接口。</p>
          </div>
          <div class="step-card">
            <span class="step-number">3</span>
            <strong>填写地址与 Key</strong>
            <p>把 API 地址改成 <code class="inline-code">${OPENAI_BASE}</code>，再填入你的 API Key。</p>
          </div>
          <div class="step-card">
            <span class="step-number">4</span>
            <strong>刷新模型列表</strong>
            <p>点击 model 旁的刷新按钮，拉取平台模型列表后选择需要的模型。</p>
          </div>
          <div class="step-card">
            <span class="step-number">5</span>
            <strong>启用接口</strong>
            <p>确认新增接口旁的开关已打开，然后再回到翻译流程里使用。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>LangBot</h2>
        <p>
          LangBot 更像机器人开发平台。除了聊天模型，你还可以把 embedding 模型接进知识库，把模型挂到流水线里，再绑定到飞书、Telegram、Discord 之类的平台机器人。
        </p>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>模型供应商</th>
                <td>选择 <code class="inline-code">NewAPI</code> 或对应的自定义 OpenAI 兼容供应商。</td>
              </tr>
              <tr>
                <th>API 地址</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>API Key</th>
                <td>你的 Ergouzi API Key</td>
              </tr>
              <tr>
                <th>接入顺序</th>
                <td>先加模型，再把模型放到流水线，最后通过会话调试或机器人对话验证。</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>聊天模型</strong>
            <p>加完模型后，在流水线里选中它，再用会话调试先跑通聊天。</p>
          </div>
          <div class="spot-card">
            <strong>知识库 / Embedding</strong>
            <p>如果要做知识库，额外添加 embedding 模型，并在新建知识库时选中该向量模型。</p>
          </div>
          <div class="spot-card">
            <strong>机器人部署</strong>
            <p>模型和流水线验证通过后，再去接飞书、钉钉、微信、Telegram、Discord 等平台机器人。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>这组工具的排查顺序</h2>
        <ul>
          <li>插件类工具导入成功但不工作时，先检查它最终写入的是不是根域名，或者是否被客户端自动重复拼了路径。</li>
          <li>LangBot 知识库检索效果异常时，先单独确认 embedding 模型是否可用，而不是只盯着聊天模型。</li>
          <li>LunaTranslator 看不到模型列表时，优先检查接口模板是否复制对，以及新增接口开关是否真正启用。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps/cherry-studio",
    group: "应用集成",
    title: "Cherry Studio 集成",
    summary: "Cherry Studio 的接入参数、一键导入配置、切换模型与绘图流程。",
    keywords: ["Cherry Studio", "应用集成", "客户端", "桌面 AI", "绘图"],
    content: `
      ${pageHead(
        "应用集成",
        "Cherry Studio 集成",
        "Cherry Studio 是一款桌面 AI 客户端，接入时只需要准备 API Key、站点地址和可用模型。这个页面把接入步骤整理成纯文字版流程，直接照着填就能用。",
        "App",
      )}

      ${callout(
        "info",
        "可选的一键导入配置",
        '如果你维护的是兼容 NewAPI / UniAPI 控制台的一键填充能力，可以在聊天设置里加入这个快捷项：{ "Cherry Studio": "cherrystudio://providers/api-keys?v=1&data={cherryConfig}" }。'
      )}

      <section>
        <h2>参数填写</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>字段</th>
                <th>填写方式</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>提供商类型</td>
                <td>选择兼容 OpenAI / 自定义 OpenAI 的类型</td>
                <td>Cherry Studio 侧通常按 OpenAI 兼容方式接入最稳妥。</td>
              </tr>
              <tr>
                <td>API 密钥</td>
                <td>你在 Ergouzi 后台生成的 API Key</td>
                <td>用于调用文本、图片和音频等模型能力。</td>
              </tr>
              <tr>
                <td>API 地址</td>
                <td><code class="inline-code">${API_HOST}</code></td>
                <td>如果客户端要求填 Base URL，也统一填写根地址 <code class="inline-code">${OPENAI_BASE}</code>。</td>
              </tr>
            </tbody>
          </table>
        </div>
        ${callout(
          "warn",
          "地址怎么填看客户端字段名",
          "如果字段叫“站点地址 / API Host / 域名”，填根域名；如果字段叫“Base URL”，这里也统一填根域名。"
        )}
      </section>

      <section>
        <h2>接入步骤</h2>
        <div class="step-grid">
          <div class="step-card">
            <span class="step-number">1</span>
            <strong>复制 API Key</strong>
            <p>先在你的控制台生成或复制一枚可用的 API Key，后面新增提供商时直接粘贴进去。</p>
          </div>
          <div class="step-card">
            <span class="step-number">2</span>
            <strong>添加提供商</strong>
            <p>在 Cherry Studio 里新增一个兼容 OpenAI 的提供商，名称可以自定义为 Ergouzi API。</p>
          </div>
          <div class="step-card">
            <span class="step-number">3</span>
            <strong>填写地址与模型</strong>
            <p>把地址改成 Ergouzi 的接口地址，并补充你希望使用的文本模型、视觉模型或绘图模型。</p>
          </div>
          <div class="step-card">
            <span class="step-number">4</span>
            <strong>返回聊天页</strong>
            <p>保存后回到聊天页面，打开模型选择器，确认新建的提供商已经出现在模型来源列表中。</p>
          </div>
          <div class="step-card">
            <span class="step-number">5</span>
            <strong>切换到 Ergouzi 模型</strong>
            <p>选中刚刚添加的模型后就可以开始对话。如果响应正常，说明集成完成。</p>
          </div>
          <div class="step-card">
            <span class="step-number">6</span>
            <strong>检查模型可用性</strong>
            <p>如果模型列表为空，通常是地址写错、Key 无权限，或者当前账户下没有给该分组开放对应模型。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>在 Cherry Studio 中画图</h2>
        <p>
          要使用绘图能力，核心不是切换协议，而是确保你添加了支持图像生成的模型，并且当前提供商启用了对应模型列表。
        </p>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>先补充图片模型</strong>
            <p>例如给当前提供商添加一个可用的图像模型，然后刷新 Cherry Studio 的模型列表。</p>
          </div>
          <div class="spot-card">
            <strong>在绘图页选择模型</strong>
            <p>切换到图片或绘图功能页，确认已选中你刚刚添加的图像模型。</p>
          </div>
          <div class="spot-card">
            <strong>提交提示词测试</strong>
            <p>先用一句简单提示词验证联通性，再逐步加入风格、尺寸和质量等参数。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>排查建议</h2>
        <ul>
          <li>对话正常但无法画图：通常是没有添加图像模型，或者图片接口未开放。</li>
          <li>模型列表为空：优先检查地址、Key 和客户端里模型拉取方式是否为 OpenAI 兼容。</li>
          <li>请求报 401 / 403：通常是 API Key 无效、被禁用，或者当前分组没有该模型权限。</li>
          <li>客户端里既能填 Host 又能填 Path 时，优先把完整 Base URL 放到 Path/Endpoint 字段，避免重复拼接。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/api",
    group: "API 集成",
    title: "API 集成总览",
    summary: "三种协议入口的差异、鉴权方式与选择建议。",
    keywords: ["API 集成", "OpenAI compatible", "Claude", "Gemini", "鉴权"],
    content: `
      ${pageHead(
        "API 集成",
        "API 集成总览",
        "Ergouzi 提供三类入口：OpenAI 兼容、Claude 原生和 Gemini 原生。区别不在于底层能否调用模型，而在于你希望请求和响应长成什么样。",
        "Overview",
      )}

      <section>
        <h2>应该选哪一种</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>入口</th>
                <th>Base URL</th>
                <th>鉴权头</th>
                <th>什么时候选它</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OpenAI 兼容（推荐）</td>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
                <td><code class="inline-code">Authorization: Bearer &lt;API_KEY&gt;</code></td>
                <td>你想用一套接口覆盖大多数文本、多模态、图片和音频场景。</td>
              </tr>
              <tr>
                <td>Claude 原生</td>
                <td><code class="inline-code">${CLAUDE_BASE}</code></td>
                <td><code class="inline-code">x-api-key: &lt;API_KEY&gt;</code></td>
                <td>你已有 Anthropic Messages API 代码，或者需要与 Anthropic SDK 字段完全一致。</td>
              </tr>
              <tr>
                <td>Gemini 原生</td>
                <td><code class="inline-code">${GEMINI_BASE}</code></td>
                <td><code class="inline-code">x-goog-api-key: &lt;API_KEY&gt;</code></td>
                <td>你已有 Gemini generateContent / streamGenerateContent 代码，或者需要 Google GenAI SDK 直连。</td>
              </tr>
            </tbody>
          </table>
        </div>
        ${callout(
          "info",
          "默认建议",
          "如果你没有强依赖官方原生字段，直接使用 OpenAI 兼容入口最省事，也更方便后续切换模型供应商。"
        )}
      </section>

      <section>
        <h2>鉴权头对照</h2>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>OpenAI 兼容</strong>
            <p><code class="inline-code">Authorization: Bearer &lt;API_KEY&gt;</code></p>
          </div>
          <div class="spot-card">
            <strong>Claude 原生</strong>
            <p><code class="inline-code">x-api-key: &lt;API_KEY&gt;</code></p>
          </div>
          <div class="spot-card">
            <strong>Gemini 原生</strong>
            <p><code class="inline-code">x-goog-api-key: &lt;API_KEY&gt;</code></p>
          </div>
        </div>
      </section>

      <section>
        <h2>推荐阅读路径</h2>
        <div class="card-grid">
          <a class="link-card" href="#/api/openai-compatible">
            <strong>OpenAI 兼容（推荐）</strong>
            <p>先看 Base URL、最小示例，再继续到 Chat Completions 或 Responses。</p>
          </a>
          <a class="link-card" href="#/api/claude-native">
            <strong>Claude 原生</strong>
            <p>适用于原本就按 Anthropic Messages API 组织请求的业务。</p>
          </a>
          <a class="link-card" href="#/api/gemini-native">
            <strong>Gemini 原生</strong>
            <p>适用于 Google Gemini generateContent / SSE 流式场景。</p>
          </a>
          <a class="link-card" href="#/sdk/openai">
            <strong>SDK 集成</strong>
            <p>如果你已经决定使用官方 SDK，直接跳到对应 SDK 页更快。</p>
          </a>
        </div>
      </section>
    `,
  },
  {
    path: "/api/openai-compatible",
    group: "API 集成",
    title: "OpenAI 兼容",
    summary: "推荐的默认接入方式，覆盖聊天、多模态、图像和音频场景。",
    keywords: ["OpenAI 兼容", "OpenAI compatible", "chat", "responses"],
    content: `
      ${pageHead(
        "API 集成",
        "OpenAI 兼容",
        "这是 Ergouzi 的默认推荐入口。只要你的 SDK 或应用支持 OpenAI 兼容协议，就可以用同一套地址完成绝大多数模型调用。",
        "Recommended",
      )}

      ${callout(
        "info",
        "为什么推荐这一套",
        "它的学习和迁移成本最低，文本、多模态、图片、音频都能沿用同一个 Bearer 鉴权和统一根地址。"
      )}

      <section>
        <h2>基础规则</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>Base URL</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>鉴权方式</th>
                <td><code class="inline-code">Authorization: Bearer &lt;API_KEY&gt;</code></td>
              </tr>
              <tr>
                <th>适合场景</th>
                <td>聊天、视觉、多模态、工具调用、Responses、Images、Audio。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>最小调用示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/chat/completions \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "用两句话介绍 Ergouzi API。"}
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>这套入口能做什么</h2>
        <div class="card-grid">
          <a class="link-card" href="#/examples/chat-completions">
            <strong>Chat Completions</strong>
            <p>适合传统聊天式请求、视觉输入和工具调用。</p>
          </a>
          <a class="link-card" href="#/examples/responses">
            <strong>Responses</strong>
            <p>更统一的新接口，适合新项目和更复杂的多模态输入结构。</p>
          </a>
          <a class="link-card" href="#/examples/images">
            <strong>Images</strong>
            <p>图像生成、图像编辑和图像变体。</p>
          </a>
          <a class="link-card" href="#/examples/audio">
            <strong>Audio</strong>
            <p>语音转文本、文字转语音等常见音频能力。</p>
          </a>
        </div>
      </section>
    `,
  },
  {
    path: "/api/claude-native",
    group: "API 集成",
    title: "Claude 原生",
    summary: "按 Anthropic Messages API 的原生请求格式接入 Claude。",
    keywords: ["Claude 原生", "Anthropic", "Messages API", "x-api-key"],
    content: `
      ${pageHead(
        "API 集成",
        "Claude 原生",
        "当你已经在用 Anthropic Messages API，或者你希望沿用 Anthropic 官方 SDK 的请求结构时，可以使用这组原生入口。",
        "Anthropic",
      )}

      ${callout(
        "warn",
        "什么时候别用它",
        "如果你只是想快速接入对话模型，没有必要专门切换到 Claude 原生。OpenAI 兼容入口通常更通用。"
      )}

      <section>
        <h2>基础规则</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>Base URL</th>
                <td><code class="inline-code">${CLAUDE_BASE}</code></td>
              </tr>
              <tr>
                <th>Endpoint</th>
                <td><code class="inline-code">POST /v1/messages</code></td>
              </tr>
              <tr>
                <th>鉴权头</th>
                <td><code class="inline-code">x-api-key: &lt;API_KEY&gt;</code></td>
              </tr>
              <tr>
                <th>版本头</th>
                <td><code class="inline-code">anthropic-version: 2023-06-01</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>最小调用示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${CLAUDE_BASE}/v1/messages \\
  --header "content-type: application/json" \\
  --header "x-api-key: $ERGOUZI_API_KEY" \\
  --header "anthropic-version: 2023-06-01" \\
  --data '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "请概括一下 Ergouzi API 能做什么。"}
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>适用建议</h2>
        <ul>
          <li>已有 Anthropic SDK 代码，只想替换 base URL 与 API Key。</li>
          <li>业务严格依赖 Messages API 的字段结构和返回格式。</li>
          <li>你要接入的就是 Claude 模型，不打算在同一层统一到 OpenAI 兼容格式。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/api/gemini-native",
    group: "API 集成",
    title: "Gemini 原生",
    summary: "按 Google Gemini API / GenAI 的原生请求格式接入。",
    keywords: ["Gemini 原生", "Google GenAI", "generateContent", "x-goog-api-key"],
    content: `
      ${pageHead(
        "API 集成",
        "Gemini 原生",
        "当你需要严格沿用 Google Gemini 的 generateContent / streamGenerateContent 形态，或者你准备用 Google GenAI SDK 直接接入时，使用这一组入口。",
        "Google GenAI",
      )}

      ${callout(
        "warn",
        "模型限制",
        "Gemini 原生入口只适用于 Gemini 模型。如果你要调 OpenAI 或 Claude 系列模型，仍然应回到 OpenAI 兼容或 Claude 原生入口。"
      )}

      <section>
        <h2>基础规则</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>Base URL</th>
                <td><code class="inline-code">${GEMINI_BASE}</code></td>
              </tr>
              <tr>
                <th>非流式</th>
                <td><code class="inline-code">POST /v1beta/models/{model}:generateContent</code></td>
              </tr>
              <tr>
                <th>流式 SSE</th>
                <td><code class="inline-code">POST /v1beta/models/{model}:streamGenerateContent?alt=sse</code></td>
              </tr>
              <tr>
                <th>鉴权头</th>
                <td><code class="inline-code">x-goog-api-key: &lt;API_KEY&gt;</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>非流式示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url "${GEMINI_BASE}/v1beta/models/gemini-2.5-flash:generateContent" \\
  --header "Content-Type: application/json" \\
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \\
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "请用一句话介绍 Ergouzi API。"}]
      }
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>流式 SSE 示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url "${GEMINI_BASE}/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse" \\
  --header "Content-Type: application/json" \\
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \\
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "给我一个 3 条的集成清单。"}]
      }
    ]
  }'
        `,
        )}
      </section>
    `,
  },
  {
    path: "/sdk/openai",
    group: "SDK 集成",
    title: "OpenAI SDK 设置",
    summary: "使用 OpenAI 官方 SDK 连接 Ergouzi 的 OpenAI 兼容入口。",
    keywords: ["OpenAI SDK", "baseURL", "Node.js", "Python"],
    content: `
      ${pageHead(
        "SDK 集成",
        "OpenAI SDK 设置",
        "如果你已经在用 OpenAI 官方 SDK，只需要把 API Key 和 base URL 切到 Ergouzi 的 OpenAI 兼容入口，就可以继续沿用原有调用习惯。",
        "SDK",
      )}

      <section>
        <h2>准备环境变量</h2>
        ${code(
          "bash",
          `
export OPENAI_API_KEY="your_api_key_here"
        `,
        )}
      </section>

      <section>
        <h2>安装与初始化</h2>
        <div class="tabs" data-tabs>
          <div class="tab-list">
            <button class="tab-trigger is-active" data-tab-trigger="openai-node" type="button">Node.js</button>
            <button class="tab-trigger" data-tab-trigger="openai-python" type="button">Python</button>
          </div>
          <div class="tab-panel is-active" data-tab-panel="openai-node">
            ${code(
              "bash",
              `
npm install openai
              `,
            )}
            ${code(
              "js",
              `
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "${OPENAI_BASE}",
});

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "user", content: "请输出一句欢迎语。" }
  ],
});

console.log(response.choices[0].message.content);
              `,
            )}
          </div>
          <div class="tab-panel" data-tab-panel="openai-python">
            ${code(
              "bash",
              `
pip install openai
              `,
            )}
            ${code(
              "python",
              `
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="${OPENAI_BASE}",
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "请输出一句欢迎语。"}
    ],
)

print(response.choices[0].message.content)
              `,
            )}
          </div>
        </div>
        ${callout(
          "info",
          "关键点只有一个",
          "只要把官方 SDK 的 baseURL 指向 Ergouzi 的根地址，原本基于 OpenAI SDK 的调用代码通常不需要大改。"
        )}
      </section>
    `,
  },
  {
    path: "/sdk/claude",
    group: "SDK 集成",
    title: "Claude SDK 设置",
    summary: "使用 Anthropic 官方 SDK 连接 Ergouzi 的 Claude 原生入口。",
    keywords: ["Claude SDK", "Anthropic SDK", "baseURL", "Python", "JavaScript"],
    content: `
      ${pageHead(
        "SDK 集成",
        "Claude SDK 设置",
        "如果你已经在使用 Anthropic 官方 SDK，只需要替换 API Key 与 base URL，就可以让原有 Messages API 代码继续工作。",
        "Anthropic SDK",
      )}

      <section>
        <h2>准备环境变量</h2>
        ${code(
          "bash",
          `
export ANTHROPIC_API_KEY="your_api_key_here"
export ANTHROPIC_BASE_URL="${ANTHROPIC_SDK_BASE}"
        `,
        )}
        ${callout(
          "info",
          "Anthropic SDK 也用根地址",
          `如果你在用官方 Anthropic SDK，这里的 base URL 也填写 <code class="inline-code">${ANTHROPIC_SDK_BASE}</code>，不要手动拼 <code class="inline-code">/claude</code>。`
        )}
      </section>

      <section>
        <h2>安装与初始化</h2>
        <div class="tabs" data-tabs>
          <div class="tab-list">
            <button class="tab-trigger is-active" data-tab-trigger="claude-js" type="button">Node.js</button>
            <button class="tab-trigger" data-tab-trigger="claude-python" type="button">Python</button>
          </div>
          <div class="tab-panel is-active" data-tab-panel="claude-js">
            ${code(
              "bash",
              `
npm install @anthropic-ai/sdk
              `,
            )}
            ${code(
              "js",
              `
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL || "${ANTHROPIC_SDK_BASE}",
});

const message = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1000,
  messages: [
    {
      role: "user",
      content: [{ type: "text", text: "请简要说明你接入的是哪个网关。" }],
    },
  ],
});

console.log(message.content);
              `,
            )}
          </div>
          <div class="tab-panel" data-tab-panel="claude-python">
            ${code(
              "bash",
              `
pip install anthropic
              `,
            )}
            ${code(
              "python",
              `
import anthropic
import os

client = anthropic.Anthropic(
    api_key=os.environ["ANTHROPIC_API_KEY"],
    base_url=os.environ.get("ANTHROPIC_BASE_URL", "${ANTHROPIC_SDK_BASE}"),
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1000,
    messages=[
        {
            "role": "user",
            "content": [{"type": "text", "text": "请简要说明你接入的是哪个网关。"}]
        }
    ],
)

print(message.content)
              `,
            )}
          </div>
        </div>
        ${callout(
          "info",
          "SDK 会帮你处理大部分头部",
          "使用官方 Anthropic SDK 时，通常不需要手动设置 anthropic-version；直接配置 apiKey 与 baseURL 即可。"
        )}
      </section>
    `,
  },
  {
    path: "/sdk/gemini",
    group: "SDK 集成",
    title: "Gemini SDK 设置",
    summary: "使用 Google GenAI 官方 SDK 连接 Ergouzi 的 Gemini 原生入口。",
    keywords: ["Gemini SDK", "Google GenAI", "google-genai", "@google/genai"],
    content: `
      ${pageHead(
        "SDK 集成",
        "Gemini SDK 设置",
        "如果你准备用 Google GenAI 官方 SDK，核心配置是把 httpOptions 的 baseUrl 指向 Ergouzi 的 Gemini 原生地址。",
        "Google GenAI SDK",
      )}

      ${callout(
        "warn",
        "模型限制",
        "这一页只适用于 Gemini 模型。你不能用 Gemini 原生 SDK 去请求 OpenAI 或 Claude 系列模型。"
      )}

      <section>
        <h2>准备环境变量</h2>
        ${code(
          "bash",
          `
export GEMINI_API_KEY="your_api_key_here"
        `,
        )}
        ${callout(
          "info",
          "Gemini SDK 也用根地址",
          `如果你在用 Google GenAI SDK，这里的 base URL 也填写 <code class="inline-code">${GEMINI_BASE}</code>，不要手动拼 <code class="inline-code">/gemini</code>。`
        )}
      </section>

      <section>
        <h2>安装与初始化</h2>
        <div class="tabs" data-tabs>
          <div class="tab-list">
            <button class="tab-trigger is-active" data-tab-trigger="gemini-python" type="button">Python</button>
            <button class="tab-trigger" data-tab-trigger="gemini-node" type="button">Node.js</button>
          </div>
          <div class="tab-panel is-active" data-tab-panel="gemini-python">
            ${code(
              "bash",
              `
pip install -U google-genai
              `,
            )}
            ${code(
              "python",
              `
from google import genai
from google.genai import types
import os

client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"],
    http_options=types.HttpOptions(base_url="${GEMINI_BASE}"),
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="请用一句话介绍 Ergouzi API。",
)

print(response.text)
              `,
            )}
          </div>
          <div class="tab-panel" data-tab-panel="gemini-node">
            ${code(
              "bash",
              `
npm install @google/genai
              `,
            )}
            ${code(
              "js",
              `
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    baseUrl: "${GEMINI_BASE}",
  },
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "请用一句话介绍 Ergouzi API。",
});

console.log(response.text);
              `,
            )}
          </div>
        </div>
      </section>
    `,
  },
  {
    path: "/examples/openai-compatible",
    group: "API 调用示例",
    title: "OpenAI 兼容接口",
    summary: "OpenAI 兼容入口的最小调用方式与推荐后续阅读。",
    keywords: ["OpenAI 兼容接口", "curl", "chat/completions", "v1"],
    content: `
      ${pageHead(
        "API 调用示例",
        "OpenAI 兼容接口",
        "这一页给出 OpenAI 兼容入口的最小请求。后续如果你要继续看具体能力，可以顺着 Chat Completions、Responses、Images 和 Audio 往下读。",
        "Example",
      )}

      <section>
        <h2>最小示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/chat/completions \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "hi"}
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>下一步看哪里</h2>
        <div class="card-grid">
          <a class="link-card" href="#/examples/chat-completions">
            <strong>Chat Completions</strong>
            <p>传统聊天、多模态消息输入、工具调用都在这里。</p>
          </a>
          <a class="link-card" href="#/examples/responses">
            <strong>Responses</strong>
            <p>统一的新接口，适合新项目和更复杂输入组织。</p>
          </a>
          <a class="link-card" href="#/examples/images">
            <strong>Images</strong>
            <p>图像生成、编辑与变体。</p>
          </a>
          <a class="link-card" href="#/examples/audio">
            <strong>Audio</strong>
            <p>语音识别与语音合成。</p>
          </a>
        </div>
      </section>
    `,
  },
  {
    path: "/examples/chat-completions",
    group: "API 调用示例",
    title: "Chat Completions",
    summary: "OpenAI 兼容的聊天接口示例，包括文本、多模态和工具调用。",
    keywords: ["Chat Completions", "tools", "multimodal", "messages"],
    content: `
      ${pageHead(
        "API 调用示例",
        "Chat Completions",
        "传统聊天接口，适合大多数文本对话、多模态输入和函数调用场景。如果你已经有一套 OpenAI 风格 messages 结构，这一页最直接。",
        "POST /chat/completions",
      )}

      <section>
        <h2>基础信息</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr>
                <th>Endpoint</th>
                <td><code class="inline-code">POST /chat/completions</code></td>
              </tr>
              <tr>
                <th>Base URL</th>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
              </tr>
              <tr>
                <th>鉴权</th>
                <td><code class="inline-code">Authorization: Bearer &lt;API_KEY&gt;</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>文本请求</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/chat/completions \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "写一句简短的欢迎语。"}
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>多模态输入</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/chat/completions \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4.1",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "请描述这张图片。"},
          {
            "type": "image_url",
            "image_url": {
              "url": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
            }
          }
        ]
      }
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>函数调用（Tools）</h2>
        ${code(
          "json",
          `
{
  "model": "gpt-4.1",
  "messages": [
    {"role": "user", "content": "查询上海当前天气"}
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "获取给定城市的天气",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {"type": "string"}
          },
          "required": ["city"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
          `,
        )}
      </section>
    `,
  },
  {
    path: "/examples/responses",
    group: "API 调用示例",
    title: "Responses",
    summary: "统一的新一代接口示例，适合新项目与更复杂输入。",
    keywords: ["Responses", "responses", "input", "multimodal"],
    content: `
      ${pageHead(
        "API 调用示例",
        "Responses",
        "Responses 是更统一的新接口，适合新项目。它用 input 代替传统 messages，更适合组合文本、图片和结构化结果。",
        "POST /responses",
      )}

      <section>
        <h2>文本请求</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/responses \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4.1",
    "input": "请用三句话概括 Ergouzi API 的定位。"
  }'
        `,
        )}
      </section>

      <section>
        <h2>图像输入示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/responses \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-4.1",
    "input": [
      {
        "role": "user",
        "content": [
          {"type": "input_text", "text": "请描述图中的主要内容。"},
          {
            "type": "input_image",
            "image_url": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
          }
        ]
      }
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>什么时候更适合用 Responses</h2>
        <ul>
          <li>新项目，没有历史的 Chat Completions 代码包袱。</li>
          <li>你想用更统一的 input 结构组织文本、图片和后续输出。</li>
          <li>你预计后续会更频繁地引入多模态和更复杂的响应处理。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/examples/images",
    group: "API 调用示例",
    title: "Images",
    summary: "OpenAI 兼容图像接口示例，包括 generations、edits 和 variations。",
    keywords: ["Images", "generations", "edits", "variations", "dall-e-3"],
    content: `
      ${pageHead(
        "API 调用示例",
        "Images",
        "Ergouzi 支持通过 OpenAI 兼容的 Images 接口完成图像生成、编辑与变体。最常见的入口是 generations。",
        "Image API",
      )}

      <section>
        <h2>生成图像</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/images/generations \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "gpt-image-1",
    "prompt": "一张极简风格的 API 文档首页插画，米白底色，深绿色点缀",
    "size": "1024x1024"
  }'
        `,
        )}
      </section>

      <section>
        <h2>编辑与变体</h2>
        <ul>
          <li><code class="inline-code">POST /images/edits</code>：通常使用 multipart/form-data 上传原图与可选蒙版。</li>
          <li><code class="inline-code">POST /images/variations</code>：通常也是 multipart/form-data，用于基于原图生成变体。</li>
          <li>如果客户端没有内建表单上传，建议先从服务端或脚本方式调用。</li>
        </ul>
        ${callout(
          "info",
          "实战建议",
          "先用 generations 验证图片接口可用，再继续接 edits 或 variations，排查成本最低。"
        )}
      </section>
    `,
  },
  {
    path: "/examples/audio",
    group: "API 调用示例",
    title: "Audio",
    summary: "OpenAI 兼容音频接口示例，包括转写和语音合成。",
    keywords: ["Audio", "transcriptions", "speech", "tts", "whisper"],
    content: `
      ${pageHead(
        "API 调用示例",
        "Audio",
        "Ergouzi 提供 OpenAI 兼容的音频接口，常见场景是语音转文字和文字转语音。",
        "Audio API",
      )}

      <section>
        <h2>语音转文字</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/audio/transcriptions \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --header "Content-Type: multipart/form-data" \\
  --form file=@/path/to/audio.mp3 \\
  --form model=whisper-1
        `,
        )}
      </section>

      <section>
        <h2>文字转语音</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${OPENAI_BASE}/audio/speech \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \\
  --data '{
    "model": "tts-1",
    "voice": "alloy",
    "input": "欢迎使用 Ergouzi API 文档站。"
  }' \\
  --output speech.mp3
        `,
        )}
      </section>
    `,
  },
  {
    path: "/examples/claude",
    group: "API 调用示例",
    title: "Claude（原生接口）",
    summary: "Claude 原生 Messages API 示例，包括 curl 和 Python SDK。",
    keywords: ["Claude 原生接口", "Anthropic Messages", "Python SDK"],
    content: `
      ${pageHead(
        "API 调用示例",
        "Claude（原生接口）",
        "这一页给出最常见的 Claude 原生调用方式：一段 curl 和一段 Python SDK，足够完成联调验证。",
        "Native API",
      )}

      <section>
        <h2>curl 示例</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url ${CLAUDE_BASE}/v1/messages \\
  --header "content-type: application/json" \\
  --header "x-api-key: $ERGOUZI_API_KEY" \\
  --header "anthropic-version: 2023-06-01" \\
  --data '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude"}
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>Python SDK 示例</h2>
        ${code(
          "python",
          `
import anthropic

client = anthropic.Anthropic(
    api_key="your_api_key_here",
    base_url="${ANTHROPIC_SDK_BASE}",
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude"}
    ],
)

print(message.content)
          `,
        )}
      </section>
    `,
  },
  {
    path: "/examples/gemini",
    group: "API 调用示例",
    title: "Gemini（原生接口）",
    summary: "Gemini 原生 generateContent / streamGenerateContent 示例。",
    keywords: ["Gemini 原生接口", "generateContent", "streamGenerateContent", "SSE"],
    content: `
      ${pageHead(
        "API 调用示例",
        "Gemini（原生接口）",
        "如果你要维持 Gemini 的原生请求格式，这一页提供非流式、流式以及 Python SDK 三组可直接改造的示例。",
        "Native API",
      )}

      <section>
        <h2>非流式 generateContent</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url "${GEMINI_BASE}/v1beta/models/gemini-2.5-flash:generateContent" \\
  --header "Content-Type: application/json" \\
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \\
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "Why should I use Ergouzi API?"}]
      }
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>流式 streamGenerateContent</h2>
        ${code(
          "bash",
          `
curl --request POST \\
  --url "${GEMINI_BASE}/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse" \\
  --header "Content-Type: application/json" \\
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \\
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "给我一个 5 点的集成建议清单。"}]
      }
    ]
  }'
        `,
        )}
      </section>

      <section>
        <h2>Python SDK 示例</h2>
        ${code(
          "python",
          `
from google import genai
from google.genai import types

client = genai.Client(
    api_key="your_api_key_here",
    http_options=types.HttpOptions(base_url="${GEMINI_BASE}"),
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="hi~",
)

print(response.text)
          `,
        )}
      </section>
    `,
  },
];
