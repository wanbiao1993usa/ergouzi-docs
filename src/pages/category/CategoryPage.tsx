import { Link, useNavigate } from "react-router-dom";

import { getDocsBySection, getSectionById } from "../../content/siteMap";
import type { SiteSectionId } from "../../types/content";

type CategoryPageProps = {
  sectionId: SiteSectionId;
};

export function CategoryPage({ sectionId }: CategoryPageProps) {
  const navigate = useNavigate();
  const section = getSectionById(sectionId);
  const docs = getDocsBySection(sectionId);

  if (!section) {
    return null;
  }

  const sectionDescriptionClass = `section-description section-description-${section.tone}`;
  const recommendedDocs = docs.slice(0, section.recommendedCount ?? 3);
  const remainingDocs = docs.slice(recommendedDocs.length);
  const groupedDocs =
    section.secondaryGroups
      ?.map((bucket) => ({
        ...bucket,
        docs: docs.filter((doc) => doc.bucket === bucket.id),
      }))
      .filter((bucket) => bucket.docs.length > 0) ?? [];

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">Category</p>
        <h2>{section.title}</h2>
        <p className={sectionDescriptionClass}>{section.description}</p>
      </section>

      {recommendedDocs.length ? (
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Recommended</p>
            <h3>{section.recommendedTitle}</h3>
            <p className="subtle-note section-note">{section.recommendedDescription}</p>
          </div>
          <ol className="recommended-list">
            {recommendedDocs.map((doc, index) => (
              <li className="recommended-item" key={doc.path}>
                <article
                  className="recommended-card recommended-card-clickable"
                  role="link"
                  tabIndex={0}
                  onClick={() => {
                    navigate(doc.path);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(doc.path);
                    }
                  }}
                >
                  <div className="recommended-step">Step {index + 1}</div>
                  <div className="recommended-main">
                    <h3>{doc.title}</h3>
                    <p>{doc.summary}</p>
                  </div>
                  <div className="article-row-actions">
                    <Link
                      className="inline-link prominent-link"
                      to={doc.path}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      从这篇开始
                    </Link>
                    {doc.legacyPath ? (
                      <a
                        className="inline-link"
                        href={doc.legacyPath}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        对照旧版
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {remainingDocs.length ? (
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">More</p>
            <h3>其余文章</h3>
          </div>
          <div className="article-list">
            {remainingDocs.map((doc) => (
              <article
                className={`article-row article-row-clickable article-row-tone-${section.tone}`}
                key={doc.path}
                role="link"
                tabIndex={0}
                onClick={() => {
                  navigate(doc.path);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(doc.path);
                  }
                }}
              >
                <div className="article-row-main">
                  <p className="eyebrow">Article</p>
                  <h3>{doc.title}</h3>
                  <p>{doc.summary}</p>
                </div>
                <div className="article-row-actions">
                  <Link
                    className="inline-link prominent-link"
                    to={doc.path}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    直接进入
                  </Link>
                  {doc.legacyPath ? (
                    <a
                      className="inline-link"
                      href={doc.legacyPath}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      对照旧版
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {groupedDocs.length ? (
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Groups</p>
            <h3>按类型继续看</h3>
            <p className="subtle-note section-note">如果你已经知道自己属于哪一类工具或示例需求，就直接从对应分组往下看。</p>
          </div>
          <div className="group-grid">
            {groupedDocs.map((bucket) => (
              <section className={`group-panel group-panel-tone-${section.tone}`} key={bucket.id}>
                <div className="group-heading">
                  <p className="eyebrow">Group</p>
                  <h4>{bucket.title}</h4>
                  <p className="subtle-note">{bucket.description}</p>
                </div>
                <div className="group-doc-list">
                  {bucket.docs.map((doc) => (
                    <article
                      className={`group-doc-row group-doc-row-clickable group-doc-row-tone-${section.tone}`}
                      key={doc.path}
                      role="link"
                      tabIndex={0}
                      onClick={() => {
                        navigate(doc.path);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(doc.path);
                        }
                      }}
                    >
                      <div className="group-doc-main">
                        <h5>{doc.title}</h5>
                        <p>{doc.summary}</p>
                      </div>
                      <div className="article-row-actions">
                        <Link
                          className="inline-link prominent-link"
                          to={doc.path}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          打开
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      ) : null}

      {!recommendedDocs.length && !remainingDocs.length ? (
        <section className="article-list">
          <article className="article-row">
            <div className="article-row-main">
              <p className="eyebrow">Empty</p>
              <h3>这个分类还没有迁入内容</h3>
              <p>后续内容进来后，这里会继续沿用同一套推荐顺序和分类入口。</p>
            </div>
          </article>
        </section>
      ) : null}
    </div>
  );
}
