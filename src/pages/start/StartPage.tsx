import { EntryCard } from "../../components/cards/EntryCard";

export function StartPage() {
  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">Start</p>
        <h2>先回答“我现在要解决什么”</h2>
        <p>
          先看购买和 Token、先把 Codex 跑起来，或者直接进入 API / SDK 接入。
        </p>
      </section>

      <section className="card-grid article-grid">
        <EntryCard title="如何购买" description="先看购买、订阅、Token 和分组关系。" to="/guides" tone="buy" />
        <EntryCard title="最快跑起 Codex" description="直接走 CC Switch 这条最短接入路线。" to="/apps/cc-switch" tone="tools" />
        <EntryCard title="直接接 API / SDK" description="适合已经明确要写代码或对接现有客户端。" to="/api" tone="api" />
      </section>
    </div>
  );
}
