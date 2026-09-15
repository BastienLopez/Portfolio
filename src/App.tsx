import { LanguageProvider } from "@/lib/i18n";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const loadFreelancePage = () => import("./pages/Freelance");
const loadProjectCaseStudyPage = () => import("./pages/ProjectCaseStudy");
const loadServicePage = () => import("./pages/Service");
const loadArticlePage = () => import("./pages/Article");

const FreelancePage = lazy(loadFreelancePage);
const ProjectCaseStudyPage = lazy(loadProjectCaseStudyPage);
const ServicePage = lazy(loadServicePage);
const ArticlePage = lazy(loadArticlePage);

const AppNavigationEffects = () => {
  const { pathname, hash } = useLocation();

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

      target.scrollIntoView({ behavior: "auto", block: "start" });

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
          <Route path="/" element={<Index />} />
          <Route path="/freelance" element={<FreelancePage />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/projets/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/notes/:slug" element={<ArticlePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
