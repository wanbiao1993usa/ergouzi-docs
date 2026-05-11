import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { BackToTopButton } from "../../components/navigation/BackToTopButton";
import { Header } from "../../components/navigation/Header";
import { SectionNav } from "../../components/navigation/SideNav";
import { getDocByPath, getSectionByPath, prefetchDocsBySection } from "../../content/siteMap";
import type { SiteSectionId } from "../../types/content";

function getBreadcrumb(pathname: string) {
  const doc = getDocByPath(pathname);
  if (doc) {
    return { section: doc.groupTitle, title: doc.title };
  }

  const section = getSectionByPath(pathname);
  if (section) {
    return { section: "分类", title: section.title };
  }

  if (pathname === "/") {
    return { section: "首页", title: "文档分流" };
  }

  if (pathname === "/start") {
    return { section: "开始", title: "新手路径" };
  }

  return { section: "页面", title: "未分类内容" };
}

function getActiveSectionId(pathname: string): SiteSectionId | null {
  const doc = getDocByPath(pathname);
  if (doc) {
    return doc.group;
  }

  const section = getSectionByPath(pathname);
  if (section) {
    return section.id;
  }

  return null;
}

export function AppLayout() {
  const location = useLocation();
  const breadcrumb = getBreadcrumb(location.pathname);
  const activeSectionId = getActiveSectionId(location.pathname);

  useEffect(() => {
    if (!activeSectionId) {
      return;
    }

    void prefetchDocsBySection(activeSectionId);
  }, [activeSectionId]);

  useEffect(() => {
    if (location.hash) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="app-shell">
      <div className="app-main">
        <Header section={breadcrumb.section} title={breadcrumb.title} />
        <main className="page-main">
          {activeSectionId ? (
            <div className="section-nav-wrap">
              <SectionNav sectionId={activeSectionId} />
            </div>
          ) : null}
          <Outlet />
        </main>
      </div>
      <BackToTopButton />
    </div>
  );
}
