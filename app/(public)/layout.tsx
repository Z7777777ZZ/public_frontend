"use client";

import { usePathname } from "next/navigation";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFooter = pathname?.includes("/datasets") || pathname?.includes("/rank") || pathname?.includes("/tests") || pathname?.includes("/contributers");

  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        {children}
        {!hideFooter && <Footer />}
      </div>
    </main>
  );
}
