import { NavLink } from "react-router-dom";

import { docsBySection, sections } from "../../content/siteMap";
import type { SiteSectionId } from "../../types/content";

export function SideNav() {
  return (
    <nav className="top-nav" aria-label="站点导航">
      <NavLink className={({ isActive }) => `top-nav-link${isActive ? " is-active" : ""}`} to="/">
        首页
      </NavLink>
      <NavLink className={({ isActive }) => `top-nav-link${isActive ? " is-active" : ""}`} to="/start">
        快速开始
      </NavLink>
      {sections.map((section) => (
        <NavLink
          key={section.id}
          className={({ isActive }) => `top-nav-link${isActive ? " is-active" : ""}`}
          to={section.path}
        >
          {section.title}
        </NavLink>
      ))}
      <NavLink className={({ isActive }) => `top-nav-link${isActive ? " is-active" : ""}`} to="/faq">
        常见问题
      </NavLink>
    </nav>
  );
}

type SectionNavProps = {
  sectionId: SiteSectionId;
};

export function SectionNav({ sectionId }: SectionNavProps) {
  const docs = docsBySection[sectionId];

  if (!docs.length) {
    return null;
  }

  return (
    <nav className="section-nav" aria-label="当前分类导航">
      {docs.map((doc) => (
        <NavLink
          key={doc.path}
          className={({ isActive }) => `section-nav-link${isActive ? " is-active" : ""}`}
          to={doc.path}
        >
          {doc.title}
        </NavLink>
      ))}
    </nav>
  );
}
