type RouteLoadingStateProps = {
  title?: string;
  description?: string;
};

export function RouteLoadingState({
  title = "页面正在加载",
  description = "路由和正文内容会按需拆开加载，这样首包不会继续把整站内容一起拖进来。",
}: RouteLoadingStateProps) {
  return (
    <div className="route-loading-shell">
      <section className="route-loading-panel">
        <p className="eyebrow">Loading</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
    </div>
  );
}
