import { NotesPageContent } from "@/components/notes/notes-page-content";

export const metadata = {
  title: "CodingSphere",
  description: "Technical findings, observations, and thoughts from the workbench.",
};

export default function NotesPage() {
  return (
    <div className="pt-24">
      <NotesPageContent />
    </div>
  );
}
