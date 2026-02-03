import { NotesPageContent } from "@/components/notes/notes-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eindev.ir';

export const metadata: Metadata = {
  title: "Lab Notes - CodingSphere",
  description: "Research notes, experiments, and insights from the coding lab. Technical documentation and findings.",
  keywords: ["lab notes", "research", "experiments", "technical documentation", "coding insights"],
  openGraph: {
    title: "Lab Notes - CodingSphere",
    description: "Research notes, experiments, and insights from the coding lab.",
    url: `${baseUrl}/notes`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CodingSphere Lab Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab Notes - CodingSphere",
    description: "Research notes, experiments, and insights from the coding lab.",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/notes`,
  },
};

export default function NotesPage() {
  return (
    <div className="pt-24">
      <NotesPageContent />
    </div>
  );
}
