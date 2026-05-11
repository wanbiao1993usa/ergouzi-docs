import { useEffect, useMemo, useState } from "react";

import { ArticleToc } from "../../components/content/ArticleToc";
import { MarkdownArticle } from "../../components/content/MarkdownArticle";
import { RouteLoadingState } from "../../components/content/RouteLoadingState";
import { extractMarkdownHeadings } from "../../content/markdownHeadings";

const faqMarkdownLoader = import.meta.glob("../../../content/faq.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export function FaqPage() {
  const [markdown, setMarkdown] = useState<string | null | undefined>(undefined);
  const headings = useMemo(() => extractMarkdownHeadings(markdown ?? ""), [markdown]);

  useEffect(() => {
    let cancelled = false;
    const loader = faqMarkdownLoader["../../../content/faq.md"];

    if (!loader) {
      setMarkdown(null);
      return () => {
        cancelled = true;
      };
    }

    loader()
      .then((nextMarkdown) => {
        if (!cancelled) {
          setMarkdown(nextMarkdown);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMarkdown(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (markdown === undefined) {
    return <RouteLoadingState title="常见问题" description="常见问题内容正在按需加载，先别急，这页也已经切到 Markdown 驱动了。" />;
  }

  if (markdown === null) {
    return <RouteLoadingState title="常见问题" description="FAQ 内容暂时没有成功加载，先检查 faq.md 是否存在。" />;
  }

  return (
    <div className="page-stack article-page">
      <div className="article-layout">
        <section className="article-header article-layout-header">
          <p className="eyebrow">FAQ</p>
          <h2>常见问题</h2>
          <p className="article-summary">
            这里收集最常见的报错、模型分组、配置等问题。如果你在使用过程中遇到问题，先看看这里有没有类似的情况和解决方案。
          </p>
        </section>

        <ArticleToc headings={headings} />

        <section className="article-shell article-layout-body">
          <MarkdownArticle markdown={markdown} headings={headings} />
        </section>
      </div>
    </div>
  );
}
