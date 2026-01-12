import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home/hero-section"
import { ProjectsGrid } from "@/components/home/projects-grid"
import { LabNotes } from "@/components/home/lab-notes"
import { Workbench } from "@/components/home/workbench"
import { Footer } from "@/components/layout/footer"
import { CursorGlow } from "@/components/layout/cursor-glow"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eindev.ir'
  const websiteStructuredData = generateWebsiteStructuredData(baseUrl)
  const personStructuredData = generatePersonStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <main className="relative min-h-screen overflow-hidden scanlines">
        <CursorGlow />
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <ProjectsGrid />
          <LabNotes />
          <Workbench />
          <Footer />
        </div>
      </main>
    </>
  )
}
