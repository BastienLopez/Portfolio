import { Button } from "@/components/ui/button";

type ProjectNavigationProps = {
  isEnglish: boolean;
  onBack: () => void;
};

export const ProjectNavigation = ({
  isEnglish,
  onBack,
}: ProjectNavigationProps) => (
  <Button
    onClick={onBack}
    variant="outline"
    className="mb-6 border-border text-foreground hover:border-primary hover:bg-secondary"
  >
    ← {isEnglish ? "Back to projects" : "Retour aux projets"}
  </Button>
);
