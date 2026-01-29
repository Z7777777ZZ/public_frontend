import { DemoPageContent } from "@/components/datasets/demo-page-content";

export const metadata = {
  title: "Security Demo - CodingSphere",
  description: "Interactive demonstration of coding agent security vulnerabilities",
};

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="pt-24">
      <DemoPageContent datasetId={id} />
    </div>
  );
}
