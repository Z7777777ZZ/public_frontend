import { DatasetDetailContent } from "@/components/datasets/dataset-detail-content";

export const metadata = {
  title: "AgentSphere",
};

export default function DatasetDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="pt-24">
      <DatasetDetailContent datasetId={params.id} />
    </div>
  );
}
