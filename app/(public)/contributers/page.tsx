import { ContributersPageContent } from "@/components/contributers/contributers-page-content";

export const metadata = {
  title: "AgentSphere",
  description: "Meet the contributors behind AgentSphere.",
};

export default function ContributersPage() {
  return (
    <div className="pt-24">
      <ContributersPageContent />
    </div>
  );
}
