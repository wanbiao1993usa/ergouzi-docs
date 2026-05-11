import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ArticleToc } from "../../components/content/ArticleToc";
import { MarkdownArticle } from "../../components/content/MarkdownArticle";
import { RouteLoadingState } from "../../components/content/RouteLoadingState";
import { extractMarkdownHeadings } from "../../content/markdownHeadings";
import { getDocByPath, getLoadedDocByPath, loadDocByPath } from "../../content/siteMap";
import type { LoadedDoc } from "../../types/content";
import { NotFoundPage } from "../not-found/NotFoundPage";

export function DocPage() {
  const location = useLocation();
  const docMeta = getDocByPath(location.pathname);
  const [doc, setDoc] = useState<LoadedDoc | null | undefined>(() => getLoadedDocByPath(location.pathname) ?? undefined);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const headings = useMemo(() => extractMarkdownHeadings(doc?.markdown ?? ""), [doc?.markdown]);

  useEffect(() => {
    let cancelled = false;
    const cachedDoc = getLoadedDocByPath(location.pathname);

    if (cachedDoc) {
      setDoc(cachedDoc);
      setIsLoadingDoc(false);
      return () => {
        cancelled = true;
      };
    }

    const isFirstLoad = doc === undefined;

    setIsLoadingDoc(true);

    if (isFirstLoad) {
      setDoc(undefined);
    }

    loadDocByPath(location.pathname)
      .then((nextDoc) => {
        if (!cancelled) {
          setDoc(nextDoc);
          setIsLoadingDoc(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDoc(null);
          setIsLoadingDoc(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (!docMeta) {
    return <NotFoundPage />;
  }

  if (doc === undefined && !isLoadingDoc) {
    return <RouteLoadingState title={docMeta.title} description="正文内容正在按需加载，先别急，这次不是把整站内容一股脑塞进首包里了。" />;
  }

  if (!doc) {
    if (!isLoadingDoc) {
      return <NotFoundPage />;
    }

    return <RouteLoadingState title={docMeta.title} description="正文内容正在按需加载，先别急，这次不是把整站内容一股脑塞进首包里了。" />;
  }

  return (
    <div className="page-stack article-page">
      <div className="article-layout">
        <section className="article-header article-layout-header">
          <p className="eyebrow">{doc.groupTitle}</p>
          <h2>{doc.title}</h2>
          <p className="article-summary">{doc.summary}</p>
          <div className="article-meta-row">
            <Link className="inline-link" to={`/${doc.group}`}>
              返回 {doc.groupTitle}
            </Link>
            {doc.legacyPath ? (
              <a className="inline-link" href={doc.legacyPath}>
                查看旧版图文参考
              </a>
            ) : null}
          </div>
        </section>

        <ArticleToc headings={headings} />

        <section className="article-shell article-layout-body">
          <MarkdownArticle markdown={doc.markdown} headings={headings} />
        </section>
      </div>
    </div>
  );
}
