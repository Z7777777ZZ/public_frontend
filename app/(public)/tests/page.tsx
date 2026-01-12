import { TestsPageContent } from "@/components/tests/tests-page-content";

export const metadata = {
  title: "Tests | AgentSphere",
  description: "Automated testing platform for coding agents.",
};

export default function TestsPage() {
  return (
    <div className="pt-24">
      <TestsPageContent />
    </div>
  );
}
