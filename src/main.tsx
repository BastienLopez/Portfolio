import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installTrustedTypesDefaultPolicy } from "./lib/trusted-html";

document
  .querySelectorAll<HTMLLinkElement>('link[data-deferred-style][media="print"]')
  .forEach((link) => {
    link.media = "all";
  });

const rootElement = document.getElementById("root")!;

installTrustedTypesDefaultPolicy();

const preloadInitialRoute = () => {
  const basePath = import.meta.env.BASE_URL === "/"
    ? ""
    : import.meta.env.BASE_URL.replace(/\/$/, "");
  const routePath = (window.location.pathname.startsWith(basePath)
    ? window.location.pathname.slice(basePath.length)
    : window.location.pathname
  ).replace(/\/$/, "") || "/";

  if (routePath === "/") return import("./pages/Index");
  if (routePath === "/freelance") return import("./pages/Freelance");
  if (routePath === "/creation-site-internet-reims") return import("./pages/LocalWebCreation");
  if (routePath === "/mentions-legales") return import("./pages/Legal");
  if (routePath.startsWith("/projets/")) return import("./pages/ProjectCaseStudy");
  if (routePath.startsWith("/services/")) return import("./pages/Service");
  if (routePath.startsWith("/notes/")) return import("./pages/Article");
  return import("./pages/NotFound");
};

void preloadInitialRoute()
  .catch(() => undefined)
  .finally(() => {
    createRoot(rootElement).render(<App />);
  });
