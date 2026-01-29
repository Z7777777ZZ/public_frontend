import { ContributersPageContent } from "@/components/contributers/contributers-page-content";

export const metadata = {
  title: "CodingSphere",
  description: "Meet the contributors behind CodingSphere.",
};

export default function ContributersPage() {
  return (
    <div className="pt-24">
      <ContributersPageContent />
    </div>
  );
}
