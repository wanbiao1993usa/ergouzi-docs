import { navSections, pages } from "./content.js?v=20260422-10";

const pageMap = new Map(pages.map((page) => [page.path, page]));

const sidebarNav = document.querySelector("#sidebar-nav");
const article = document.querySelector("#article");
const toc = document.querySelector("#toc");
const breadcrumbs = document.querySelector("#breadcrumbs");
const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("#sidebar-toggle");
const mobileBackdrop = document.querySelector("#mobile-backdrop");

const searchModal = document.querySelector("#search-modal");
const searchBackdrop = document.querySelector("#search-backdrop");
const searchToggle = document.querySelector("#search-toggle");
const mobileSearchButton = document.querySelector("#mobile-search-button");
const searchClose = document.querySelector("#search-close");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleText = document.querySelector("#theme-toggle-text");

const THEME_STORAGE_KEY = "ergouzi-docs-theme";
const SIDEBAR_GROUPS_STORAGE_KEY = "ergouzi-docs-sidebar-groups";

const normalizePath = (hashValue) => {
  const raw = (hashValue || window.location.hash || "#/").replace(/^#/, "") || "/";
  const path = raw.split("?")[0].trim() || "/";
  return path.startsWith("/") ? path : `/${path}`;
};

const hrefFor = (path) => `#${path}`;

const pageIndex = pages.map((page) => page.path);

const stripHtml = (input) =>
  input
    .replace(/<pre[\s\S]*?<\/pre>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const searchIndex = pages.map((page) => ({
  ...page,
  searchable: `${page.title} ${page.summary} ${(page.keywords || []).join(" ")} ${stripHtml(page.content)}`.toLowerCase(),
}));

const getStoredTheme = () => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
};

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredSidebarGroups = () => {
  try {
    const raw = window.localStorage.getItem(SIDEBAR_GROUPS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const setStoredSidebarGroups = (value) => {
  window.localStorage.setItem(SIDEBAR_GROUPS_STORAGE_KEY, JSON.stringify(value));
};

const isCurrentSection = (section, currentPath) => section.items.includes(currentPath);

const isSectionExpanded = (section, currentPath, storedState) => {
  if (isCurrentSection(section, currentPath)) {
    return true;
  }
  return Boolean(storedState[section.title]);
};

function updateThemeToggle(theme) {
  if (!themeToggle || !themeToggleText) return;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", `切换到${nextTheme === "dark" ? "深色" : "浅色"}模式`);
  themeToggleText.textContent = `${nextTheme === "dark" ? "深色" : "浅色"}模式`;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  updateThemeToggle(theme);
}

function initializeTheme() {
  applyTheme(getStoredTheme() || getSystemTheme());

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = (event) => {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleSystemThemeChange);
  }
}

function renderSidebar(currentPath) {
  const storedSidebarGroups = getStoredSidebarGroups();

  sidebarNav.innerHTML = navSections
    .map(
      (section) => {
        const canCollapse = section.items.length > 1;
        const expanded = isSectionExpanded(section, currentPath, storedSidebarGroups);
        const linksMarkup = section.items
          .map((path) => {
            const page = pageMap.get(path);
            if (!page) return "";
            return `
              <a class="nav-link ${path === currentPath ? "active" : ""}" href="${hrefFor(path)}">
                ${page.title}
              </a>
            `;
          })
          .join("");

        if (!canCollapse) {
          return `
            <div class="nav-group" data-nav-group="${section.title}">
              <div class="nav-group-label">
                <span class="nav-group-title">${section.title}</span>
              </div>
              <div class="nav-group-links">
                ${linksMarkup}
              </div>
            </div>
          `;
        }

        return `
          <div class="nav-group ${expanded ? "is-expanded" : ""}" data-nav-group="${section.title}">
            <button
              class="nav-group-toggle"
              type="button"
              data-nav-group-toggle="${section.title}"
              aria-expanded="${expanded}"
            >
              <span class="nav-group-title">${section.title}</span>
              <span class="nav-group-caret" aria-hidden="true"></span>
            </button>
            <div class="nav-group-links" ${expanded ? "" : "hidden"}>
              ${linksMarkup}
            </div>
          </div>
        `;
      },
    )
    .join("");

  sidebarNav.querySelectorAll("[data-nav-group-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionTitle = button.dataset.navGroupToggle;
      const section = navSections.find((item) => item.title === sectionTitle);
      if (!section || isCurrentSection(section, currentPath)) {
        return;
      }

      const storedState = getStoredSidebarGroups();
      const nextState = {
        ...storedState,
        [sectionTitle]: !isSectionExpanded(section, currentPath, storedState),
      };

      setStoredSidebarGroups(nextState);
      renderSidebar(currentPath);
    });
  });
}

function renderBreadcrumbs(page) {
  breadcrumbs.innerHTML = `
    <span>${page.group}</span>
    <span>/</span>
    <span class="breadcrumb-current">${page.title}</span>
  `;
}

function renderPageNav(currentPath) {
  const currentIndex = pageIndex.indexOf(currentPath);
  const prevPath = pageIndex[currentIndex - 1];
  const nextPath = pageIndex[currentIndex + 1];
  const prevPage = prevPath ? pageMap.get(prevPath) : null;
  const nextPage = nextPath ? pageMap.get(nextPath) : null;

  if (!prevPage && !nextPage) {
    return "";
  }

  return `
    <nav class="page-nav">
      ${
        prevPage
          ? `
            <a href="${hrefFor(prevPage.path)}">
              <span>上一页</span>
              <strong>${prevPage.title}</strong>
            </a>
          `
          : "<div></div>"
      }
      ${
        nextPage
          ? `
            <a href="${hrefFor(nextPage.path)}">
              <span>下一页</span>
              <strong>${nextPage.title}</strong>
            </a>
          `
          : "<div></div>"
      }
    </nav>
  `;
}

function setupCodeBlocks() {
  article.querySelectorAll("pre").forEach((pre) => {
    if (pre.dataset.enhanced === "true") return;

    const lang = pre.dataset.lang || "code";
    const langLabel = document.createElement("span");
    langLabel.className = "code-lang";
    langLabel.textContent = lang;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.textContent = "复制";
    copyButton.addEventListener("click", async () => {
      const text = pre.querySelector("code")?.textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "已复制";
        copyButton.classList.add("is-copied");
        window.setTimeout(() => {
          copyButton.textContent = "复制";
          copyButton.classList.remove("is-copied");
        }, 1200);
      } catch {
        copyButton.textContent = "复制失败";
        window.setTimeout(() => {
          copyButton.textContent = "复制";
        }, 1200);
      }
    });

    pre.append(langLabel, copyButton);
    pre.dataset.enhanced = "true";
  });
}

function setupTabs() {
  article.querySelectorAll("[data-tabs]").forEach((tabsRoot, tabsIndex) => {
    const triggers = tabsRoot.querySelectorAll("[data-tab-trigger]");
    const panels = tabsRoot.querySelectorAll("[data-tab-panel]");
    const fallback = triggers[0]?.dataset.tabTrigger;
    const activeTab = tabsRoot.dataset.activeTab || fallback;

    const activate = (tabName) => {
      tabsRoot.dataset.activeTab = tabName;
      triggers.forEach((trigger) => {
        trigger.classList.toggle("is-active", trigger.dataset.tabTrigger === tabName);
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.tabPanel === tabName);
      });
    };

    triggers.forEach((trigger) => {
      trigger.dataset.tabsIndex = String(tabsIndex);
      trigger.addEventListener("click", () => activate(trigger.dataset.tabTrigger));
    });

    activate(activeTab);
  });
}

function renderToc() {
  const headings = [...article.querySelectorAll("h2, h3")];
  toc.innerHTML = "";

  if (!headings.length) return;

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `section-${index + 1}`;
    }
  });

  const title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "On This Page";

  const list = document.createElement("div");
  list.className = "toc-list";

  headings.forEach((heading) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `toc-link ${heading.tagName === "H3" ? "is-sub" : ""}`;
    button.textContent = heading.textContent || "";
    button.addEventListener("click", () => {
      document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    list.appendChild(button);
  });

  toc.append(title, list);
}

function renderPage() {
  const currentPath = normalizePath();
  const page = pageMap.get(currentPath) || pageMap.get("/");

  renderSidebar(page.path);
  renderBreadcrumbs(page);

  article.innerHTML = `${page.content}${renderPageNav(page.path)}`;
  setupCodeBlocks();
  setupTabs();
  renderToc();

  document.title = `${page.title} | Ergouzi Docs`;
  window.scrollTo({ top: 0, behavior: "auto" });
  closeSidebar();
}

function renderSearchResults(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? searchIndex.filter((page) => page.searchable.includes(normalized))
    : searchIndex;

  if (!filtered.length) {
    searchResults.innerHTML = `
      <div class="search-empty">
        <p>没有找到相关页面，换个关键词试试。</p>
      </div>
    `;
    return;
  }

  searchResults.innerHTML = filtered
    .slice(0, 16)
    .map(
      (page) => `
        <a class="search-result" href="${hrefFor(page.path)}">
          <span>${page.group}</span>
          <strong>${page.title}</strong>
          <p>${page.summary}</p>
        </a>
      `,
    )
    .join("");
}

function openSearch() {
  searchModal.hidden = false;
  searchInput.value = "";
  renderSearchResults("");
  window.setTimeout(() => searchInput.focus(), 0);
}

function closeSearch() {
  searchModal.hidden = true;
}

function openSidebar() {
  sidebar.classList.add("is-open");
  mobileBackdrop.hidden = false;
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  mobileBackdrop.hidden = true;
}

function attachEvents() {
  window.addEventListener("hashchange", () => {
    renderPage();
    closeSearch();
  });

  searchToggle?.addEventListener("click", openSearch);
  mobileSearchButton?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);
  searchBackdrop?.addEventListener("click", closeSearch);

  searchInput?.addEventListener("input", (event) => {
    renderSearchResults(event.target.value);
  });

  sidebarToggle?.addEventListener("click", openSidebar);
  mobileBackdrop?.addEventListener("click", closeSidebar);
  themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !searchModal.hidden) return;
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (event.key === "Escape") {
      closeSearch();
      closeSidebar();
    }
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#/"]');
    if (link) {
      closeSearch();
    }
  });
}

initializeTheme();
attachEvents();

if (!window.location.hash) {
  window.location.hash = "#/";
} else {
  renderPage();
}
