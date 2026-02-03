import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata = {
  title: "CodingSphere - Contact",
  description: "Get in touch with the CodingSphere team.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactPageContent />
    </div>
  );
}
