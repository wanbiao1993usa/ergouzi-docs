import { useEffect, useState } from "react";

import type { MarkdownHeading } from "../../content/markdownHeadings";

type ArticleTocProps = {
  headings: MarkdownHeading[];
};

export function ArticleToc({ headings }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  const getScrollOffset = () => {
    const topbar = document.querySelector(".topbar");
    const sectionNavWrap = document.querySelector(".section-nav-wrap");
    const topbarHeight = topbar instanceof HTMLElement ? topbar.offsetHeight : 0;
    const sectionNavHeight = sectionNavWrap instanceof HTMLElement ? sectionNavWrap.offsetHeight : 0;

    return topbarHeight + sectionNavHeight + 24;
  };

  useEffect(() => {
    setActiveId(headings[0]?.id ?? "");
  }, [headings]);

  useEffect(() => {
    if (!headings.length) {
      return;
    }

    const updateActiveHeading = () => {
      const offsetTop = getScrollOffset();
      let nextActiveId = headings[0]?.id ?? "";

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= offsetTop) {
          nextActiveId = heading.id;
          continue;
        }

        break;
      }

      setActiveId((current) => (current === nextActiveId ? current : nextActiveId));
    };

    updateActiveHeading();

    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <aside className="article-toc-shell article-layout-toc" aria-label="文章目录">
      <p className="article-toc-title">目录</p>
      <nav className="article-toc-list">
        {headings.map((heading) => (
          <a
            key={heading.id}
            className={[
              "article-toc-link",
              `is-level-${heading.level}`,
              activeId === heading.id ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            href={`#${heading.id}`}
            onClick={(event) => {
              event.preventDefault();

              const element = document.getElementById(heading.id);

              if (!element) {
                return;
              }

              const scrollToHeading = () => {
                const offset = getScrollOffset();
                const targetTop = element.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                  top: targetTop,
                  behavior: "smooth",
                });

                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    const correction = element.getBoundingClientRect().top - offset;

                    if (Math.abs(correction) > 2) {
                      window.scrollBy({
                        top: correction,
                        behavior: "auto",
                      });
                    }
                  });
                });
              };

              window.history.replaceState(null, "", `#${heading.id}`);
              scrollToHeading();
              setActiveId(heading.id);
            }}
            aria-current={activeId === heading.id ? "true" : undefined}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
