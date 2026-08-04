import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const NotFound = () => {
  const { isEnglish } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-xl text-center">
        <p className="mb-4 text-sm font-semibold text-primary">404</p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          {isEnglish ? "Page not found" : "Page introuvable"}
        </h1>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          {isEnglish
            ? "This address does not match any page in the portfolio."
            : "Cette adresse ne correspond à aucune page du portfolio."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          {isEnglish ? "Back to home" : "Retour à l'accueil"}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
