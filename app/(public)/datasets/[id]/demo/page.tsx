import { DemoPageContent } from "@/components/datasets/demo-page-content";

export const metadata = {
  title: "Security Demo - CodingSphere",
  description: "Interactive demonstration of coding agent security vulnerabilities",
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

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="pt-24">
      <DemoPageContent datasetId={id} />
    </div>
  );
}
