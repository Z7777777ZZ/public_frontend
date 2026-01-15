import { DatasetDetailContent } from "@/components/datasets/dataset-detail-content";

export const metadata = {
  title: "AgentSphere",
};

export default async function DatasetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="pt-24">
      <DatasetDetailContent datasetId={id} />
    </div>
  );
}
