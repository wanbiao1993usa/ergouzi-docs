import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import { type MarkdownHeading } from "../../content/markdownHeadings";

type MarkdownArticleProps = {
  headings: MarkdownHeading[];
  markdown: string;
};

export function MarkdownArticle({ markdown, headings }: MarkdownArticleProps) {
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const article = articleRef.current;

    if (!article) {
      return;
    }

    const headingElements = Array.from(article.querySelectorAll("h2, h3"));

    headingElements.forEach((element, index) => {
      const heading = headings[index];

      if (!heading) {
        element.removeAttribute("id");
        return;
      }

      element.id = heading.id;
    });
  }, [headings, markdown]);

  return (
    <article className="prose" ref={articleRef}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (!href) {
              return <>{children}</>;
            }

            const isAppRoute = href.startsWith("/") && !href.startsWith("/assets/") && !href.startsWith("/legacy-static/");

            if (isAppRoute) {
              return <Link to={href}>{children}</Link>;
            }

            return <a href={href}>{children}</a>;
          },
          img: ({ src, alt }) => {
            if (!src) {
              return null;
            }

            return (
              <span className="prose-figure">
                <img className="prose-image" src={src} alt={alt ?? ""} loading="lazy" />
                {alt ? <span className="prose-caption">{alt}</span> : null}
              </span>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
