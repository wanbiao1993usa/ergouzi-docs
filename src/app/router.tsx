import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./layout/AppLayout";
import { NotFoundPage } from "../pages/not-found/NotFoundPage";
import type { SiteSectionId } from "../types/content";

function loadHomeRoute() {
  return import("../pages/home/HomePage").then(({ HomePage }) => ({
    Component: HomePage,
  }));
}

function loadStartRoute() {
  return import("../pages/start/StartPage").then(({ StartPage }) => ({
    Component: StartPage,
  }));
}

function loadFaqRoute() {
  return import("../pages/faq/FaqPage").then(({ FaqPage }) => ({
    Component: FaqPage,
  }));
}

function loadDocRoute() {
  return import("../pages/doc/DocPage").then(({ DocPage }) => ({
    Component: DocPage,
  }));
}

function loadCategoryRoute(sectionId: SiteSectionId) {
  return () =>
    import("../pages/category/CategoryPage").then(({ CategoryPage }) => ({
      Component() {
        return <CategoryPage sectionId={sectionId} />;
      },
    }));
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, lazy: loadHomeRoute },
      { path: "start", lazy: loadStartRoute },
      { path: "guides", lazy: loadCategoryRoute("guides") },
      { path: "apps", lazy: loadCategoryRoute("apps") },
      { path: "api", lazy: loadCategoryRoute("api") },
      { path: "sdk", lazy: loadCategoryRoute("sdk") },
      { path: "examples", lazy: loadCategoryRoute("examples") },
      { path: "faq", lazy: loadFaqRoute },
      { path: "guides/:docSlug", lazy: loadDocRoute },
      { path: "apps/:docSlug", lazy: loadDocRoute },
      { path: "api/:docSlug", lazy: loadDocRoute },
      { path: "sdk/:docSlug", lazy: loadDocRoute },
      { path: "examples/:docSlug", lazy: loadDocRoute },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
