import { Link } from "react-router-dom";

import { EntryCard } from "../../components/cards/EntryCard";

export function HomePage() {
  return (
    <div className="page-stack home-stack">
      <section className="hero-panel hero-panel-plain">
        <p className="eyebrow">Neoblo Docs</p>
        <h2>先配置Codex，再让Codex配其他工具</h2>
        <h3>先判断你的接入路线，再进入具体教程</h3>
        <p className="hero-lead">
          如果你第一次来，先分清自己是要准备账号与 Token、最快跑起 Codex，还是直接写代码接 API / SDK。
        </p>
        <div className="hero-actions">
          <Link className="button-primary" to="/start">
            新手开始
          </Link>
          <Link className="button-secondary" to="/apps/cc-switch">
            先看 CC Switch
          </Link>
        </div>
      </section>

      <section className="home-feature-grid">
        <article className="feature-card feature-card-primary">
          <p className="eyebrow">Featured</p>
          <h3>最快路径(焚决)：CC Switch -&gt; Codex</h3>
          <ol className="step-list compact-list">
            <li>先去令牌管理创建令牌，一定要选择分组，最低折扣是0.2折分组，和其他分组除了价格不同，没有区别，这是历史遗留原因</li>
            <li>去GitHub搜索，并下载 CC Switch</li>
            <li>到微软商店下载 Codex</li>
            <li>在 CC Switch 里点击 Codex ，再点击右上角 + 号添加配置，具体操作可以查看详细的 CC Switch 配置教程</li>
            <li>记得是要新添加，不要在已有配置上修改</li>
            <li>点击启用配置前，最好退出Codex软件</li>
          </ol>
          <div className="hero-actions">
            <Link className="inline-link prominent-link" to="/apps/cc-switch">
              从这条路线开始
            </Link>
          </div>
        </article>

        <article className="feature-card feature-card-soft">
          <p className="eyebrow">Foundation</p>
          <h3>目前只有余额计费方式，V群会不定时发放无限额度套餐</h3>
          <p>
            余额不用，不会清零，也不会过期
          </p>
          <p>
            如果你现在还分不清余额、订阅、Token 和分组，先把这层关系看明白
          </p>
          <div className="hero-actions">
            <Link className="inline-link prominent-link" to="/guides/token-billing">
              先看基础说明
            </Link>
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Browse</p>
          <h3>按你的目标进入</h3>
        </div>
        <div className="card-grid article-grid">
          <EntryCard
            title="购买教程"
            description="先看购买、订阅、Token 和分组这些前置步骤。"
            to="/guides"
            tone="buy"
          />
          <EntryCard
            title="客户端与工具"
            description="按桌面应用、聊天客户端和 CLI 工具拆成独立路线。"
            to="/apps"
            tone="tools"
          />
          <EntryCard
            title="API 接入"
            description="先看协议规则和入口边界，适合直接对接服务端或客户端。"
            to="/api"
            tone="api"
          />
          <EntryCard
            title="SDK 接入"
            description="适合直接进入项目代码，按语言和 SDK 路线阅读。"
            to="/sdk"
            tone="sdk"
          />
          <EntryCard
            title="调用示例"
            description="先用最小示例验证链路，再展开到具体能力。"
            to="/examples"
            tone="examples"
          />
          <EntryCard
            title="常见问题"
            description="把排错说明独立收口，不打断主线内容。"
            to="/faq"
            tone="faq"
          />
        </div>
      </section>
    </div>
  );
}
