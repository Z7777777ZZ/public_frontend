import { WorkbenchPageContent } from "@/components/workbench/workbench-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eindev.ir';

export const metadata: Metadata = {
  title: "CodingSphere",
  description: "Active experiments, prototypes, and work in progress. A peek into the digital workshop where ideas take shape.",
  keywords: ["experiments", "prototypes", "work in progress", "playground", "dev tools"],
  openGraph: {
    title: "CodingSphere",
    description: "Active experiments, prototypes, and work in progress.",
    url: `${baseUrl}/workbench`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-workbench.png`,
        width: 1200,
        height: 630,
        alt: "CodingSphere Workbench",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodingSphere",
    description: "Active experiments, prototypes, and work in progress.",
    images: [`${baseUrl}/og-image-workbench.png`],
  },
  alternates: {
    canonical: `${baseUrl}/workbench`,
  },
};

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  );
}
