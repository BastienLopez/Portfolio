import { ArrowLeft } from "lucide-react";
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
    variant="ghost"
    className="project-detail-back h-auto rounded-none px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
  >
    <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
    {isEnglish ? "Back to projects" : "Retour aux projets"}
  </Button>
);
