import { DatasetDetailContent } from "@/components/datasets/dataset-detail-content";

export const metadata = {
  title: "CodingSphere",
};

// 生成静态路径参数
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ]
}

export default async function DatasetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="pt-24">
      <DatasetDetailContent datasetId={id} />
    </div>
  );
}
