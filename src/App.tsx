import { LanguageProvider } from "@/lib/i18n";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import SectionTimeline from "./components/SectionTimeline";

const IndexPage = lazy(() => import("./pages/Index"));
const loadFreelancePage = () => import("./pages/Freelance");
const loadLocalWebCreationPage = () => import("./pages/LocalWebCreation");
const loadProjectCaseStudyPage = () => import("./pages/ProjectCaseStudy");
const loadServicePage = () => import("./pages/Service");
const loadArticlePage = () => import("./pages/Article");

const FreelancePage = lazy(loadFreelancePage);
const LocalWebCreationPage = lazy(loadLocalWebCreationPage);
const ProjectCaseStudyPage = lazy(loadProjectCaseStudyPage);
const ServicePage = lazy(loadServicePage);
const ArticlePage = lazy(loadArticlePage);
const LegalPage = lazy(() => import("./pages/Legal"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const scrollToTopInstant = () => {
  const root = document.documentElement;
  const body = document.body;
  const previousScrollBehavior = root.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  root.scrollTop = 0;
  body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  root.style.scrollBehavior = previousScrollBehavior;
  body.style.scrollBehavior = previousBodyScrollBehavior;
};

const AppNavigationEffects = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (hash) return;

    scrollToTopInstant();

    const frame = window.requestAnimationFrame(scrollToTopInstant);
    const timer = window.setTimeout(scrollToTopInstant, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [hash, pathname]);

  useEffect(() => {
    if (!hash || hash.startsWith("#project=")) return;

    let targetId: string;
    try {
      targetId = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let attempts = 0;
    let animationFrame = 0;
    let retryTimer = 0;

    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId);

      if (!target) {
        if (attempts < 60) {
          attempts += 1;
          animationFrame = window.requestAnimationFrame(scrollToHashTarget);
        }
        return;
      }

      target.scrollIntoView({ behavior: "instant", block: "start" });

      // Re-apply after the route's lazy content has committed so a late
      // section mount cannot leave the user at the previous page position.
      if (attempts < 2) {
        attempts += 1;
        retryTimer = window.setTimeout(scrollToHashTarget, 120);
      }
    };

    animationFrame = window.requestAnimationFrame(scrollToHashTarget);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(retryTimer);
    };
  }, [hash, pathname]);

  return null;
};

const App = () => (
  <LanguageProvider>
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
    >
      <AppNavigationEffects />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
            Chargement…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/freelance" element={<FreelancePage />} />
          <Route path="/creation-site-internet-reims" element={<LocalWebCreationPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/projets/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="/services/sites-vitrines" element={<Navigate to="/creation-site-internet-reims" replace />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/notes/:slug" element={<ArticlePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <SectionTimeline />
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
