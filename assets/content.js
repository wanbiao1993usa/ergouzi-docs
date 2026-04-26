const API_HOST = "https://ergouzi.life";
const OPENAI_BASE = API_HOST;
const CLAUDE_BASE = API_HOST;
const ANTHROPIC_SDK_BASE = API_HOST;
const GEMINI_BASE = API_HOST;
const PURCHASE_WALLET_IMAGE = "./assets/purchase/step1.png";
const PURCHASE_PRODUCT_IMAGE = "./assets/purchase/step2.png";
const PURCHASE_CODE_IMAGE = "./assets/purchase/step3.png";
const PURCHASE_REDEEM_IMAGE = "./assets/purchase/step4.png";
const SUBSCRIPTION_PURCHASE_IMAGE = "./assets/purchase/subscription-step1.png";
const TOKEN_CREATE_ENTRY_IMAGE = "./assets/token/step1.png";
const TOKEN_CREATE_FORM_IMAGE = "./assets/token/step2.png";
const TOKEN_CREATE_RESULT_IMAGE = "./assets/token/step3.png";
const CODEX_CONFIG_IMAGE = "./assets/codex/config.png";
const FAQ_CLAUDE_CODE_VSCODE_SETTINGS_IMAGE = "./assets/faq/claude-code-vscode-settings.webp";
const FAQ_CLAUDE_CODE_VSCODE_SETTINGS_FALLBACK_IMAGE = "./assets/faq/claude-code-vscode-settings.png";
const CHERRY_AGENT_SETTINGS_IMAGE = "./assets/cherry-studio/agent-settings-entry.webp";
const CHERRY_ADD_ENTRY_IMAGE = "./assets/cherry-studio/api-server-add-entry.webp";
const CHERRY_ADD_PROVIDER_IMAGE = "./assets/cherry-studio/add-provider-dialog.webp";
const CHERRY_PROVIDER_CONFIG_IMAGE = "./assets/cherry-studio/provider-config.webp";
const CHERRY_MODEL_PICKER_IMAGE = "./assets/cherry-studio/model-picker-add.webp";
const CHERRY_MODEL_LIST_IMAGE = "./assets/cherry-studio/model-list-result.webp";
const CHERRY_HOME_MODEL_IMAGE = "./assets/cherry-studio/home-model-selected.webp";
const CHERRY_MODEL_SWITCHER_IMAGE = "./assets/cherry-studio/model-switcher.webp";
const CHERRY_CHAT_TEST_IMAGE = "./assets/cherry-studio/chat-test-success.webp";
const TRAE_SETTINGS_ENTRY_IMAGE = "./assets/trae-cn/open-settings.webp";
const TRAE_MODEL_MANAGEMENT_IMAGE = "./assets/trae-cn/model-management.webp";
const TRAE_ADD_MODEL_IMAGE = "./assets/trae-cn/add-model-dialog.webp";
const TRAE_CHAT_COMPLETIONS_URL = `${API_HOST}/v1/chat/completions`;

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

const docImage = (src, alt, caption, width = 1440, height = 1203, className = "") => `
  <div class="doc-image-wrap ${className}">
    <div class="doc-image-frame">
      <img class="doc-image" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async" />
    </div>
    <p class="doc-image-caption">${caption}</p>
  </div>
`;

export const navSections = [
  { title: "开始", items: ["/"] },
  {
    title: "账户教程",
    items: ["/token-billing-guide", "/purchase-guide", "/subscription-guide", "/token-guide"],
  },
  { title: "帮助", items: ["/faq"] },
  {
    title: "应用集成",
    items: [
      "/apps",
      "/apps/cherry-studio",
      "/apps/trae-cn",
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
    summary: "Ergouzi API 文档入口和基础地址。",
    keywords: ["首页", "快速开始", "总览", "OpenAI", "Claude", "Gemini"],
    content: `
      <section class="hero">
        <p class="eyebrow">Ergouzi Docs</p>
        <h1>Ergouzi API 文档</h1>
        <p class="lead">
          默认地址：<code class="inline-code">${API_HOST}</code>。大多数场景优先使用 OpenAI 兼容入口。
        </p>

        <div class="pills">
          <span class="pill">OpenAI Compatible</span>
          <span class="pill">Claude Native</span>
          <span class="pill">Gemini Native</span>
        </div>

        <div class="button-row">
          <a class="button" href="#/api/openai-compatible">API 接入</a>
          <a class="button-ghost" href="#/apps">应用集成</a>
        </div>
      </section>

      <section>
        <h2>常用入口</h2>
        <div class="card-grid">
          <a class="link-card tone-important" href="#/token-billing-guide">
            <strong>重要说明</strong>
            <p>Token、分组和付费关系。</p>
          </a>
          <a class="link-card" href="#/purchase-guide">
            <strong>普通余额</strong>
            <p>购买并兑换额度。</p>
          </a>
          <a class="link-card" href="#/subscription-guide">
            <strong>无限订阅</strong>
            <p>购买套餐并联系客服开通。</p>
          </a>
          <a class="link-card" href="#/token-guide">
            <strong>创建 API Token</strong>
            <p>生成调用凭证。</p>
          </a>
          <a class="link-card" href="#/apps">
            <strong>应用集成</strong>
            <p>客户端、插件和 CLI 配置。</p>
          </a>
          <a class="link-card" href="#/api/openai-compatible">
            <strong>API 接入</strong>
            <p>默认从 OpenAI 兼容开始。</p>
          </a>
          <a class="link-card" href="#/faq">
            <strong>常见问题</strong>
            <p>报错和配置问题。</p>
          </a>
        </div>
      </section>

      <section>
        <h2>基础地址</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>入口</th>
                <th>Base URL</th>
                <th>用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OpenAI 兼容</td>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
                <td>默认推荐。</td>
              </tr>
              <tr>
                <td>Claude 原生</td>
                <td><code class="inline-code">${CLAUDE_BASE}</code></td>
                <td>Anthropic 格式。</td>
              </tr>
              <tr>
                <td>Gemini 原生</td>
                <td><code class="inline-code">${GEMINI_BASE}</code></td>
                <td>Gemini 格式。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `,
  },
  {
    path: "/purchase-guide",
    group: "账户教程",
    title: "购买普通兑换码",
    summary: "从注册登录、购买兑换码到最终兑换额度的完整流程。",
    keywords: ["购买教程", "购买普通兑换码", "兑换码", "钱包管理", "openclaw源码", "OpenCode源码"],
    content: `
      ${pageHead(
        "账户教程",
        "购买普通兑换码",
        "这页只介绍普通兑换码的购买与兑换流程：先注册登录，再进入钱包管理购买兑换码，随后在二狗的中转站下单商品，拿到兑换码后再回到钱包页完成兑换。",
        "Guide",
      )}

      ${callout(
        "info",
        "如果你要买无限流量套餐",
        '订阅套餐是另一条流程，请直接查看 <a href="#/subscription-guide">购买无限订阅</a> 页面。'
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
    path: "/subscription-guide",
    group: "账户教程",
    title: "购买无限订阅",
    summary: "从注册登录、购买无限流量套餐到联系客服手动开通无限订阅的完整流程。",
    keywords: ["购买教程", "购买订阅", "购买无限订阅", "订阅套餐", "无限流量套餐", "客服开通", "用户名"],
    content: `
      ${pageHead(
        "账户教程",
        "购买无限订阅",
        "这页只介绍无限流量订阅套餐的购买方式：先注册登录，再进入账户充值页购买无限流量套餐，最后把用户名发给客服手动开通。",
        "Guide",
      )}

      ${callout(
        "warn",
        "订阅需要人工开通",
        "购买完成后，还需要把当前登录账号的用户名发送给客服，由客服手动修改并增加订阅。"
      )}

      <section>
        <h2>购买流程概览</h2>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>1. 注册并登录</strong>
            <p>先完成账号注册，然后登录到二狗控制台。</p>
          </div>
          <div class="spot-card">
            <strong>2. 购买无限流量套餐</strong>
            <p>进入账户充值页，点击“购买无限流量套餐”。</p>
          </div>
          <div class="spot-card">
            <strong>3. 把用户名发给客服</strong>
            <p>将当前账号用户名发送给客服，由客服手动修改并增加订阅。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>第一步：注册账号并登录</h2>
        <p>
          先完成账号注册，然后登录到二狗平台。只有在登录状态下，你才能进入账户充值页面并完成后续订阅开通流程。
        </p>
        <ul>
          <li>如果你还没有账号，先走注册流程创建一个新账号。</li>
          <li>如果已经有账号，直接登录即可。</li>
          <li>登录成功后，再继续进入账户充值页面。</li>
        </ul>
      </section>

      <section>
        <h2>第二步：点击购买无限流量套餐</h2>
        <p>
          登录后进入账户充值页面，点击 <strong>购买无限流量套餐</strong> 按钮进入购买流程。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${SUBSCRIPTION_PURCHASE_IMAGE}" alt="账户充值页中的购买无限流量套餐入口" loading="lazy" />
          </div>
          <p class="doc-image-caption">在账户充值页面点击“购买无限流量套餐”。</p>
        </div>
      </section>

      <section>
        <h2>第三步：将用户名发送给客服，需要客服手动修改并增加订阅</h2>
        <p>
          购买完成后，把你当前登录账号的 <strong>用户名</strong> 发送给客服。客服会按这个用户名手动修改账号并增加订阅，处理完成后订阅才会生效。
        </p>
        <ul>
          <li>发送的是用户名，不是密码，也不是 API Token。</li>
          <li>一定要发送当前购买所用账号的用户名，避免订阅加到错误账号上。</li>
          <li>客服处理完成后，再回到账户页面确认订阅状态是否已经更新。</li>
        </ul>
      </section>

      <section>
        <h2>常见注意事项</h2>
        <ul>
          <li>如果你只想按额度充值，请改看 <a href="#/purchase-guide">购买普通兑换码</a> 页面。</li>
          <li>如果已经付款但订阅没有生效，先确认用户名是否已经发给客服，以及发送的账号是否正确。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/token-billing-guide",
    group: "账户教程",
    title: "重要说明",
    tone: "important",
    summary: "说明 API Token、令牌分组、模型支持分组和付费方式的关系。",
    keywords: ["API Token", "令牌分组", "分组", "模型支持分组", "模型广场", "分组价格", "倍率", "付费", "余额", "普通充值", "无限订阅", "扣费"],
    content: `
      ${pageHead(
        "账户教程",
        "重要说明",
        "先看懂 Token、分组和付费方式的关系，再去创建 API Token。",
        "Guide",
      )}

      ${callout(
        "info",
        "一句话说明",
        "API Token 负责鉴权；令牌分组决定可用模型和价格；普通余额或无限订阅决定账号权益。"
      )}

      <section>
        <h2>必须知道</h2>
        <ul>
          <li><strong>Token</strong> 是调用凭证，不是余额，也不是套餐。</li>
          <li><strong>分组</strong> 决定这个 Token 能用哪些模型，以及按什么价格调用。</li>
          <li><strong>普通充值</strong> 按量扣余额；<strong>无限订阅</strong> 开通后仍然用 Token 鉴权。</li>
          <li>如果模型不支持当前分组，通常会出现 <code class="inline-code">No available channel</code> 或 group 相关报错。</li>
        </ul>
      </section>

      <section>
        <h2>如何查看某个模型支持哪些分组</h2>
        <ol>
          <li>打开 <a href="https://ergouzi.life/pricing" target="_blank" rel="noreferrer">模型广场</a>。</li>
          <li>点击要使用的模型卡片，例如 <code class="inline-code">gpt-5.3-codex</code>。</li>
          <li>在右侧详情面板查看“分组价格”。“分组”列里出现的分组，就是该模型支持的分组。</li>
        </ol>
        ${callout(
          "warn",
          "先对照再创建 Token",
          "如果你的 Token 分组没有出现在该模型的“分组价格”里，就换模型或换支持该模型的分组。"
        )}
      </section>

      <section>
        <h2>下一步</h2>
        <p>
          先准备 <a href="#/purchase-guide">普通余额</a> 或 <a href="#/subscription-guide">无限订阅</a>，
          再去 <a href="#/token-guide">创建 API Token</a>。
        </p>
      </section>
    `,
  },
  {
    path: "/token-guide",
    group: "账户教程",
    title: "创建 API Token",
    summary: "从控制台进入令牌管理、选择分组并创建 API Token 的完整流程。",
    keywords: ["API Token", "令牌管理", "添加令牌", "分组", "倍率", "0.2x", "2折"],
    content: `
      ${pageHead(
        "账户教程",
        "创建 API Token",
        "控制台创建 API Token 的操作说明。",
        "Guide",
      )}

      ${callout(
        "warn",
        "令牌分组决定倍率",
        "令牌所在的分组会直接决定价格倍率，所以它和价格强相关。截图里的 0.2x 表示任何模型都是官网价格的 0.2 倍，也就是 2 折。"
      )}

      <section>
        <h2>创建流程概览</h2>
        <div class="mini-card-grid">
          <div class="spot-card">
            <strong>1. 进入令牌管理</strong>
            <p>点击控制台，再进入左侧的令牌管理，然后点击“添加令牌”。</p>
          </div>
          <div class="spot-card">
            <strong>2. 填写信息并选分组</strong>
            <p>填入名称，并选择令牌所在的分组。分组倍率会直接影响价格。</p>
          </div>
          <div class="spot-card">
            <strong>3. 提交并获取令牌</strong>
            <p>点击提交后，回到令牌管理列表即可看到新建出来的 API Token。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>第一步：点击控制台，然后点击左侧的令牌管理，点击添加令牌</h2>
        <p>
          先进入二狗子的控制台页面，然后在左侧导航里找到 <strong>令牌管理</strong>。进入后点击上方的
          <strong>添加令牌</strong> 按钮，开始创建新的 API Token。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${TOKEN_CREATE_ENTRY_IMAGE}" alt="控制台中的令牌管理与添加令牌入口" loading="lazy" />
          </div>
          <p class="doc-image-caption">先进入控制台，再到左侧的令牌管理页面，最后点击“添加令牌”。</p>
        </div>
      </section>

      <section>
        <h2>第二步：填入名称，然后选择令牌所在的分组</h2>
        <p>
          在创建令牌弹窗里，先填写一个容易识别的名称，然后选择令牌所属分组。这个分组非常重要，因为它直接决定了这个令牌的
          <strong>倍率</strong>，也就是最终价格。
        </p>
        ${callout(
          "info",
          "0.2x 的含义",
          "截图里展示的是 0.2x 倍率，也就是任何模型都按官网价格的 0.2 倍计费，等价于 2 折。选分组时应先确认倍率。"
        )}
        <ul>
          <li>名称建议按用途来命名，比如客户端名、项目名或环境名，后续更容易区分。</li>
          <li>分组倍率越低，最终价格越便宜；倍率越高，实际消耗越高。</li>
          <li>如果后续需要给不同项目、不同客户端分开使用，可以创建多个不同名称的令牌。</li>
        </ul>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${TOKEN_CREATE_FORM_IMAGE}" alt="创建令牌时填写名称并选择分组倍率" loading="lazy" />
          </div>
          <p class="doc-image-caption">填写名称后，重点确认令牌分组对应的倍率。截图里的 0.2x 就是 2 折。</p>
        </div>
      </section>

      <section>
        <h2>第三步：点击提交则得到令牌</h2>
        <p>
          信息填写完成后点击提交，系统就会创建出新的令牌。创建成功后，令牌管理列表中会出现刚创建的记录，并可复制该
          Token 去接入客户端、SDK 或 API 请求。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${TOKEN_CREATE_RESULT_IMAGE}" alt="创建成功后的令牌管理列表" loading="lazy" />
          </div>
          <p class="doc-image-caption">提交后回到令牌管理列表，就能看到新创建出来的 Token 和对应分组倍率。</p>
        </div>
      </section>

      <section>
        <h2>常见注意事项</h2>
        <ul>
          <li>令牌分组会直接决定倍率，倍率又会直接影响价格，创建前务必先确认清楚。</li>
          <li>截图中的 0.2x 就是官网价格的 20%，也就是 2 折，不是减去 0.2 或别的含义。</li>
          <li>名称建议按用途命名，这样后续在多个令牌之间切换时不容易混淆。</li>
          <li>Token 创建完成后应及时复制保存，后续客户端、SDK 和 API 请求都要用它做鉴权。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/faq",
    group: "帮助",
    title: "常见问题",
    summary: "模型分组、Trae、Claude Code 与 VS Code 插件常见问题。",
    keywords: [
      "常见问题",
      "FAQ",
      "503",
      "No available channel",
      "gpt-5.5",
      "2折组",
      "0.7折分组",
      "Trae",
      "Trae CN",
      "Trae-Proxy",
      "Claude Code",
      "VS Code 插件",
      "claudeCode.environmentVariables",
      "settings.json",
      "client_gone",
      "网络波动",
      "梯子",
    ],
    content: `
      ${pageHead(
        "帮助",
        "常见问题",
        "常见报错和客户端配置的快速处理方式。",
        "FAQ",
	      )}

	      <section>
	        <h2>1. 日志出现 client_gone 怎么办</h2>
	        ${callout(
	          "danger",
	          "先检查网络",
	          "如果日志里出现 client_gone 错误，请先判断自己的梯子是否有网络波动。"
	        )}
	      </section>

	      <section>
	        <h2>2. API Error: 503 No available channel for model gpt-5.5 under group 2折组</h2>
	        <p>
	          当前分组不支持这个模型。去 <a href="https://ergouzi.life/pricing" target="_blank" rel="noreferrer">模型广场</a> 查模型支持的分组，然后换模型或换分组。
	        </p>
	      </section>

	      <section>
	        <h2>3. 国产 Trae 是否支持自定义接入</h2>
	        <p>
	          支持。新版 Trae CN 在“模型”里添加自定义模型，请求地址填完整的
	          <code class="inline-code">${TRAE_CHAT_COMPLETIONS_URL}</code>。
          具体步骤看 <a href="#/apps/trae-cn">Trae CN 配置教程</a>。
        </p>
	      </section>

	      <section>
	        <h2>4. OpenAI 模型可以直接在 Claude Code 中使用吗</h2>
	        <p>
	          可以，把 Anthropic 环境变量指向二狗子，并把默认模型改成可用的 OpenAI 模型名。
	        </p>
        ${code(
          "bash",
          `
export ANTHROPIC_BASE_URL="https://ergouzi.life"
export ANTHROPIC_AUTH_TOKEN="sk-your-api-token"
export ANTHROPIC_DEFAULT_SONNET_MODEL="gpt-5.4"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="gpt-5.4"

claude
        `,
        )}
	      </section>

	      <section>
	        <h2>5. Claude Code 的 VS Code 插件可以使用吗</h2>
	        <p>
	          可以。在 VS Code 用户 <code class="inline-code">settings.json</code> 里加入：
	        </p>
        ${code(
          "json",
          `
{
  "claudeCode.environmentVariables": [
    { "name": "ANTHROPIC_BASE_URL", "value": "${ANTHROPIC_SDK_BASE}" },
    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "sk-your-api-token" },
    { "name": "ANTHROPIC_MODEL", "value": "gpt-5.4" },
    { "name": "ANTHROPIC_DEFAULT_OPUS_MODEL", "value": "gpt-5.4" },
    { "name": "ANTHROPIC_DEFAULT_SONNET_MODEL", "value": "gpt-5.4" },
    { "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL", "value": "gpt-5.4" }
  ],
  "claudeCode.preferredLocation": "panel"
}
        `,
        )}
        <p>
          把 <code class="inline-code">sk-your-api-token</code> 换成自己的 API Token，保存后重载 VS Code 窗口。
        </p>
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <picture>
              <source srcset="${FAQ_CLAUDE_CODE_VSCODE_SETTINGS_IMAGE}" type="image/webp" />
              <img class="doc-image" src="${FAQ_CLAUDE_CODE_VSCODE_SETTINGS_FALLBACK_IMAGE}" alt="Claude Code VS Code 插件 settings.json 环境变量配置示例" width="1440" height="875" loading="lazy" decoding="async" />
            </picture>
          </div>
	          <p class="doc-image-caption">Claude Code VS Code 插件的 settings.json 配置示例。</p>
	        </div>
	      </section>
	    `,
  },
  {
    path: "/apps",
    group: "应用集成",
    title: "应用集成总览",
    summary: "常见应用接入入口和地址速查。",
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
        "先看地址怎么填，再进入对应应用教程。",
        "Apps",
      )}

      <section>
        <h2>地址速查</h2>
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
                <td>Next Chat、ChatWise。</td>
              </tr>
              <tr>
                <td>OpenAI 兼容 Base URL</td>
                <td><code class="inline-code">${OPENAI_BASE}</code></td>
                <td>Lobe Chat、Chatbox、Continue。</td>
              </tr>
              <tr>
                <td>Trae CN 请求地址</td>
                <td><code class="inline-code">${TRAE_CHAT_COMPLETIONS_URL}</code></td>
                <td>Trae CN 自定义模型。</td>
              </tr>
              <tr>
                <td>Claude 原生 Base URL</td>
                <td><code class="inline-code">${CLAUDE_BASE}</code></td>
                <td>Claude Code。</td>
              </tr>
              <tr>
                <td>Gemini 原生 Base URL</td>
                <td><code class="inline-code">${GEMINI_BASE}</code></td>
                <td>Gemini CLI。</td>
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
            <p>提供商、模型、绘图。</p>
          </a>
          <a class="link-card" href="#/apps/trae-cn">
            <strong>Trae CN</strong>
            <p>自定义模型和请求地址。</p>
          </a>
          <a class="link-card" href="#/apps/chat-clients">
            <strong>聊天客户端</strong>
            <p>Next Chat、Lobe Chat、Chatbox。</p>
          </a>
          <a class="link-card" href="#/apps/editor-tools">
            <strong>编辑器与插件</strong>
            <p>Cursor、Continue。</p>
          </a>
          <a class="link-card" href="#/apps/cli-tools">
            <strong>CLI 与编码助手</strong>
            <p>Claude Code、Codex、Gemini CLI。</p>
          </a>
          <a class="link-card" href="#/apps/translator-bots">
            <strong>翻译工具与机器人</strong>
            <p>FluentRead、LunaTranslator、LangBot。</p>
          </a>
        </div>
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
          按下面 3 步配置即可：
        </p>
        <ul>
          <li>安装 <code class="inline-code">@openai/codex</code>。</li>
          <li>写入 <code class="inline-code">~/.codex/config.toml</code>。</li>
          <li>设置 <code class="inline-code">ERGOUZI_CODEX_API_TOKEN</code> 后运行 <code class="inline-code">codex</code>。</li>
        </ul>
        ${code(
          "bash",
          `
npm install -g @openai/codex

mkdir -p ~/.codex

cat > ~/.codex/config.toml <<'EOF'
# 默认使用的模型
model = "gpt-5.3-codex"
# 默认推理程度
model_reasoning_effort = "xhigh"

# 默认使用的 provider 为二狗子，如果将下一行注释掉则使用 codex，所以此处是开关
model_provider = "ergouzi"

# 二狗子的配置
[model_providers.ergouzi]
name = "ergouzi"
base_url = "https://ergouzi.life/v1"
# 注意：env_key 填的是“环境变量名”，不是你的真实 API Token
# 真实 Token 放到下面的 export 里
env_key = "ERGOUZI_CODEX_API_TOKEN"
wire_api = "responses"
EOF

export ERGOUZI_CODEX_API_TOKEN="API_token_xxxxxxxxxxx"

codex
          `,
        )}
        ${callout(
          "info",
          "关键说明",
          `<code class="inline-code">model_provider = "ergouzi"</code> 是开关；注释掉这一行会回到 Codex 默认 provider。<code class="inline-code">env_key</code> 只填写环境变量名，真实 Token 通过 <code class="inline-code">export ERGOUZI_CODEX_API_TOKEN="API_token_xxx"</code> 设置。这里保持 <code class="inline-code">base_url = "https://ergouzi.life/v1"</code>，并使用 <code class="inline-code">wire_api = "responses"</code>。`
        )}
        <div class="doc-image-wrap">
          <div class="doc-image-frame">
            <img class="doc-image" src="${CODEX_CONFIG_IMAGE}" alt="Codex CLI 的 config.toml 与环境变量配置示意图" loading="lazy" />
          </div>
          <p class="doc-image-caption">Windows 系统配置示意图：在 <code class="inline-code">.codex/config.toml</code> 中写入 provider 配置，并设置对应环境变量。注意 <code class="inline-code">env_key</code> 写的是变量名，真实 Token 不要直接写在这里。</p>
        </div>
        <ul>
          <li>切模型或推理强度：修改 <code class="inline-code">model</code> 和 <code class="inline-code">model_reasoning_effort</code>。</li>
          <li>临时切模型：在 Codex 内部执行 <code class="inline-code">/model</code>。</li>
        </ul>
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
    summary: "Cherry Studio 中添加 Ergouzi 提供商、填写 Key 和地址、拉取模型并完成对话测试的完整流程。",
    keywords: ["Cherry Studio", "应用集成", "客户端", "桌面 AI", "模型服务", "API 服务器", "绘图"],
    content: `
      ${pageHead(
        "应用集成",
        "Cherry Studio 集成",
        "这页按照 Cherry Studio 实际界面整理：从智能体页进入设置，新增 Ergouzi 提供商，填写 API Key 和接口地址，拉取模型列表，最后回到首页切换模型并发送测试消息。",
        "App",
      )}

      ${callout(
        "info",
        "先准备 API Key",
        '开始前先在二狗控制台创建或复制一枚 API Token。如果还没有 Key，先看 <a href="#/token-guide">创建 API Token</a> 页面。'
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
                <td>OpenAI</td>
                <td>添加提供商弹窗里把“提供商类型”选为 OpenAI。</td>
              </tr>
              <tr>
                <td>提供商名称</td>
                <td>ergouzi</td>
                <td>名称可以自定义，教程里统一写 ergouzi，方便后面在模型选择器里识别。</td>
              </tr>
              <tr>
                <td>API 密钥</td>
                <td>你在二狗控制台生成的 API Token</td>
                <td>粘贴完整 Key，不要多复制空格。</td>
              </tr>
              <tr>
                <td>API 地址</td>
                <td><code class="inline-code">${API_HOST}</code></td>
                <td>Cherry Studio 会预览为 <code class="inline-code">${API_HOST}/v1/chat/completions</code>，这是正常的。</td>
              </tr>
            </tbody>
          </table>
        </div>
        ${callout(
          "warn",
          "只填根地址",
          `API 地址填写 <code class="inline-code">${API_HOST}</code> 即可，不要手动追加 <code class="inline-code">/v1</code> 或 <code class="inline-code">/chat/completions</code>。`
        )}
      </section>

      <section>
        <h2>流程概览</h2>
        <div class="step-grid">
          <div class="step-card">
            <span class="step-number">1</span>
            <strong>进入设置</strong>
            <p>在智能体页看到提示时，点击“前往设置”。也可以直接点右上角齿轮进入设置。</p>
          </div>
          <div class="step-card">
            <span class="step-number">2</span>
            <strong>添加提供商</strong>
            <p>在“模型服务”页点击底部“添加”，名称填写 ergouzi，类型选择 OpenAI。</p>
          </div>
          <div class="step-card">
            <span class="step-number">3</span>
            <strong>填写 Key 和地址</strong>
            <p>API 密钥粘贴你的二狗 API Token，API 地址填写 ${API_HOST}。</p>
          </div>
          <div class="step-card">
            <span class="step-number">4</span>
            <strong>拉取并添加模型</strong>
            <p>点击“获取模型列表”，在弹窗里点模型右侧的“+”加入要使用的模型。</p>
          </div>
          <div class="step-card">
            <span class="step-number">5</span>
            <strong>回到首页切换模型</strong>
            <p>在顶部模型选择器里找到 ergouzi 分组，选择文本模型，例如 gpt-5.4。</p>
          </div>
          <div class="step-card">
            <span class="step-number">6</span>
            <strong>发送消息测试</strong>
            <p>发一句简单消息，能正常回复就说明 Cherry Studio 已接入成功。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>第一步：进入设置</h2>
        <p>
          打开 Cherry Studio 后，如果在智能体页看到“请启用 API 服务器以使用智能体功能”的提示，点击 <strong>前往设置</strong>。如果没有这条提示，也可以点击右上角齿轮进入设置。
        </p>
        ${docImage(
          CHERRY_AGENT_SETTINGS_IMAGE,
          "Cherry Studio 智能体页中的前往设置按钮",
          "在智能体页点击“前往设置”，进入模型服务相关配置。",
          1080,
          903,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第二步：添加 Ergouzi 提供商</h2>
        <p>
          进入设置后，左侧选择 <strong>模型服务</strong>。在中间的模型平台列表底部点击 <strong>添加</strong>，开始新建一个提供商。
        </p>
        ${docImage(
          CHERRY_ADD_ENTRY_IMAGE,
          "Cherry Studio 模型服务页底部的添加按钮",
          "在模型服务列表底部点击“添加”。",
          1080,
          903,
          "doc-image-compact"
        )}
        <p>
          在“添加提供商”弹窗里，提供商名称填写 <strong>ergouzi</strong>，提供商类型选择 <strong>OpenAI</strong>，然后点击 <strong>确定</strong>。
        </p>
        ${docImage(
          CHERRY_ADD_PROVIDER_IMAGE,
          "Cherry Studio 添加提供商弹窗，名称填写 ergouzi，类型选择 OpenAI",
          "名称写 ergouzi，类型选 OpenAI。",
          1080,
          903,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第三步：填写 Key 和 API 地址</h2>
        <p>
          新建完成后，选中左侧的 <strong>ergouzi</strong> 提供商。把 API 密钥粘贴到 <strong>API 密钥</strong> 输入框，API 地址填写 <code class="inline-code">${API_HOST}</code>。
        </p>
        <ul>
          <li>右上角开关需要保持开启状态。</li>
          <li>API 地址只填根地址，看到预览变成 <code class="inline-code">${API_HOST}/v1/chat/completions</code> 即可。</li>
          <li>填完后点击 <strong>获取模型列表</strong>。</li>
        </ul>
        ${docImage(
          CHERRY_PROVIDER_CONFIG_IMAGE,
          "Cherry Studio 中 ergouzi 提供商的 API 密钥和 API 地址配置",
          "粘贴 API Key，API 地址填写 https://ergouzi.life，然后点击“获取模型列表”。",
          1080,
          903,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第四步：添加模型</h2>
        <p>
          模型列表弹出后，找到你要使用的模型，点击每一行右侧的 <strong>+</strong> 添加到当前提供商。普通聊天建议先添加文本模型，例如 <strong>gpt-5.4</strong>；如果要使用图片能力，再添加 <strong>gpt-image-2</strong>。
        </p>
        ${docImage(
          CHERRY_MODEL_PICKER_IMAGE,
          "Cherry Studio 模型列表弹窗中模型右侧的加号",
          "在模型弹窗里点击模型右侧“+”，把需要的模型加入 ergouzi。",
          1080,
          903,
          "doc-image-compact"
        )}
        <p>
          添加后回到提供商详情页，模型区域会出现已加入的模型列表。这里能看到模型数量和模型名称，就说明模型已经写入 Cherry Studio。
        </p>
        ${docImage(
          CHERRY_MODEL_LIST_IMAGE,
          "Cherry Studio ergouzi 提供商下已添加的模型列表",
          "模型列表中出现 gpt-5.4、gpt-image-2 等模型，说明添加成功。",
          1080,
          903,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第五步：回到首页切换模型</h2>
        <p>
          回到 <strong>首页</strong>，点击聊天顶部的模型名称。如果当前选中的是 <strong>gpt-image-2</strong> 这类图片模型，普通对话测试时先切换成文本模型。
        </p>
        ${docImage(
          CHERRY_HOME_MODEL_IMAGE,
          "Cherry Studio 首页顶部的模型选择器",
          "回到首页后，点击顶部模型名称打开模型选择器。",
          1080,
          903,
          "doc-image-compact"
        )}
        <p>
          在模型选择器里找到 <strong>ergouzi</strong> 分组，选择用于聊天的文本模型，例如 <strong>gpt-5.4</strong>。
        </p>
        ${docImage(
          CHERRY_MODEL_SWITCHER_IMAGE,
          "Cherry Studio 模型选择器中 ergouzi 分组的模型",
          "在 ergouzi 分组下选择 gpt-5.4 等文本模型。",
          1080,
          903,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第六步：发送消息测试</h2>
        <p>
          在输入框里发送一句简单消息，例如“你好呀，二狗子”。如果模型正常回复，说明 API Key、API 地址和模型配置都已经生效。
        </p>
        ${docImage(
          CHERRY_CHAT_TEST_IMAGE,
          "Cherry Studio 使用 gpt-5.4 ergouzi 模型正常回复测试消息",
          "收到正常回复后，Cherry Studio 集成完成。",
          1080,
          903,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>排查建议</h2>
        <ul>
          <li>点击“获取模型列表”后为空：优先检查 API 地址是否只填了 <code class="inline-code">${API_HOST}</code>，以及 API Key 是否复制完整。</li>
          <li>模型弹窗里有模型，但首页看不到：确认你已经点了模型右侧的“+”，并且当前提供商右上角开关处于开启状态。</li>
          <li>普通聊天没有回复：先切换到文本模型，例如 gpt-5.4，不要用 gpt-image-2 做普通对话测试。</li>
          <li>对话正常但无法画图：确认已经把 gpt-image-2 这类图片模型添加到 ergouzi 提供商，并在图片功能里选择它。</li>
          <li>请求报 401 / 403：通常是 API Key 无效、被禁用，或者当前分组没有该模型权限。</li>
        </ul>
      </section>
    `,
  },
  {
    path: "/apps/trae-cn",
    group: "应用集成",
    title: "Trae CN 配置",
    summary: "Trae CN / SOLO Coder 中添加 Ergouzi 自定义模型、填写 API Key 与请求地址的完整流程。",
    keywords: ["Trae", "Trae CN", "SOLO Coder", "自定义模型", "模型管理", "OpenRouter", "编码助手"],
    content: `
      ${pageHead(
        "应用集成",
        "Trae CN 配置",
        "这页按 Trae CN 的 SOLO Coder 界面整理：进入设置，打开模型管理，添加自定义模型，填写模型 ID、二狗子 API Key 和完整请求地址，最后启用模型。",
        "IDE",
      )}

      ${callout(
        "warn",
        "这里填写的是完整请求地址",
        `Trae CN 的字段名是“自定义请求地址”，不要只填根域名。这里填写 <code class="inline-code">${TRAE_CHAT_COMPLETIONS_URL}</code>。`
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
                <td>服务商</td>
                <td>OpenRouter</td>
                <td>按截图选择 OpenRouter 作为服务商入口，实际请求会被“自定义请求地址”指向二狗子。</td>
              </tr>
              <tr>
                <td>模型</td>
                <td>自定义模型</td>
                <td>不要选择内置模型，选择可以手动填写模型 ID 的自定义模型。</td>
              </tr>
              <tr>
                <td>模型 ID</td>
                <td>你要使用的模型名，例如 <code class="inline-code">gpt-5.5</code> 或 <code class="inline-code">gpt-5.4</code></td>
                <td>必须是你的二狗子账号当前分组可用的模型。</td>
              </tr>
              <tr>
                <td>API 密钥</td>
                <td>你在二狗子控制台生成的 API Token</td>
                <td>粘贴完整 Token，不要多复制空格。</td>
              </tr>
              <tr>
                <td>自定义请求地址</td>
                <td><code class="inline-code">${TRAE_CHAT_COMPLETIONS_URL}</code></td>
                <td>这是完整 Chat Completions 地址，不是普通 Base URL。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>流程概览</h2>
        <div class="step-grid">
          <div class="step-card">
            <span class="step-number">1</span>
            <strong>打开设置</strong>
            <p>在 Trae CN 顶部工具栏找到齿轮配置按钮，点击进入设置页。</p>
          </div>
          <div class="step-card">
            <span class="step-number">2</span>
            <strong>进入模型管理</strong>
            <p>在设置页左侧选择“模型”，然后点击“添加模型”。</p>
          </div>
          <div class="step-card">
            <span class="step-number">3</span>
            <strong>填写自定义模型</strong>
            <p>服务商选 OpenRouter，模型选自定义模型，填入模型 ID、API 密钥和请求地址。</p>
          </div>
          <div class="step-card">
            <span class="step-number">4</span>
            <strong>启用并测试</strong>
            <p>添加成功后确认模型出现在自定义列表，并保持右侧开关开启。</p>
          </div>
        </div>
      </section>

      <section>
        <h2>第一步：打开配置按钮</h2>
        <p>
          打开 Trae CN 后，在顶部工具栏找到齿轮图标，点击进入设置页面。
        </p>
        ${docImage(
          TRAE_SETTINGS_ENTRY_IMAGE,
          "Trae CN 顶部工具栏中的配置按钮",
          "在 Trae CN 顶部点击齿轮配置按钮。",
          1080,
          675,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第二步：进入模型管理并添加模型</h2>
        <p>
          进入设置页后，左侧点击 <strong>模型</strong>。右侧会出现模型管理列表，点击上方的 <strong>添加模型</strong>。
        </p>
        ${docImage(
          TRAE_MODEL_MANAGEMENT_IMAGE,
          "Trae CN 设置页中的模型管理和添加模型按钮",
          "在“模型”页面点击“添加模型”。",
          1080,
          675,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第三步：填写模型 ID、密钥和请求地址</h2>
        <p>
          在“添加模型”弹窗中按下面方式填写。截图里示例模型是 <code class="inline-code">gpt-5.5</code>，你也可以换成模型广场里当前分组支持的其他模型。
        </p>
        <ul>
          <li><strong>服务商</strong>：选择 <code class="inline-code">OpenRouter</code>。</li>
          <li><strong>模型</strong>：选择 <code class="inline-code">自定义模型</code>。</li>
          <li><strong>模型 ID</strong>：填写你想用的模型名，例如 <code class="inline-code">gpt-5.5</code>。</li>
          <li><strong>API 密钥</strong>：填写二狗子 API Token。</li>
          <li><strong>自定义请求地址</strong>：填写 <code class="inline-code">${TRAE_CHAT_COMPLETIONS_URL}</code>。</li>
        </ul>
        ${docImage(
          TRAE_ADD_MODEL_IMAGE,
          "Trae CN 添加模型弹窗中的模型 ID、API 密钥和自定义请求地址",
          "模型 ID 填模型名，API 密钥填二狗子 Token，自定义请求地址填完整 Chat Completions 地址。",
          1080,
          675,
          "doc-image-compact"
        )}
      </section>

      <section>
        <h2>第四步：确认模型启用</h2>
        <p>
          点击 <strong>添加模型</strong> 后，回到模型管理页。确认新模型出现在“自定义”分组下，并且右侧开关处于开启状态。随后回到 SOLO Coder 对话区选择该模型测试即可。
        </p>
      </section>

      <section>
        <h2>排查建议</h2>
        <ul>
          <li>模型添加失败：先确认“自定义请求地址”填写的是 <code class="inline-code">${TRAE_CHAT_COMPLETIONS_URL}</code>，不是 <code class="inline-code">${API_HOST}</code>。</li>
          <li>请求报 401 / 403：通常是 API Token 无效、复制不完整，或者当前分组没有该模型权限。</li>
          <li>模型名报错：去模型广场确认当前分组是否支持该模型，再把模型 ID 改成可用模型名。</li>
          <li>设置页没有“自定义请求地址”：说明 Trae CN 版本或入口不同，优先升级客户端；旧版本再考虑 Trae-Proxy 这类代理方案。</li>
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
