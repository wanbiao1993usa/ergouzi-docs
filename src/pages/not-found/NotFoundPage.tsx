import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page-stack">
      <section className="content-panel">
        <p className="eyebrow">404</p>
        <h2>页面不存在</h2>
        <p>这条路径还没有迁移过来，或者当前链接地址不对。可以先回新版首页，或者打开旧版站点做内容对照。</p>
        <div className="hero-actions">
          <Link className="button-primary" to="/">
            返回首页
          </Link>
          <a className="button-secondary" href="/legacy-static/index.html#/">
            查看旧版文档
          </a>
        </div>
      </section>
    </div>
  );
}
