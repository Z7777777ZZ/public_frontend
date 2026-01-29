"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, Globe, Users } from "lucide-react"
import NextImage from "next/image"

type Contributor = {
  id: number
  name: string
  role: string
  bio: string
  avatar: string // Photo path, e.g. "/contributors/john.jpg"
  github?: string
  linkedin?: string
  email?: string
  website?: string
}

const contributors: Contributor[] = [
  {
    id: 1,
    name: "Binbin Zhao",
    role: "Contributor",
    bio: "Research Professor",
    avatar: "/contributors/zhaobinbin.jpg",
    github: "https://github.com",
  },
  {
    id: 2,
    name: "Fukang Zhu",
    role: "Contributor",
    bio: "2025 Master Student",
    avatar: "/contributors/zhufukang.jpg",
    github: "https://github.com",
  },
  {
    id: 3,
    name: "Wanmeng Ding",
    role: "Contributor",
    bio: "2025 Phd Student",
    avatar: "/contributors/dingwanmeng.jpg",
    github: "https://github.com",
  },
  {
    id: 4,
    name: "Sijie Zhi",
    role: "Contributor",
    bio: "2026 Master Student",
    avatar: "/contributors/zhisijie.jpg",
    github: "https://github.com",
  },
  {
    id: 5,
    name: "Jinwen Wang",
    role: "Contributor",
    bio: "2026 Master Student",
    avatar: "/contributors/wangjinwen.jpg",
    github: "https://github.com",
  },
  {
    id: 6,
    name: "Luyi Wang",
    role: "Contributor",
    bio: "2026 Phd Student",
    avatar: "/contributors/wangluyi.jpg",
    github: "https://github.com",
  },
]

const SocialLink = ({ icon: Icon, href, label }: { icon: any; href?: string; label: string }) => {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/10"
    >
      <Icon className="h-3.5 w-3.5" />
    </a>
  )
}

export function ContributersPageContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 text-center opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Team</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Contributors</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Meet the team building CodingSphere — a collaborative effort to advance coding agent evaluation.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="space-y-6">
          {/* First Row: Text + 2 contributors + Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Left Text Area */}
            <div
              className={cn(
                "hidden lg:flex flex-col items-center justify-center opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "50ms" }}
            >
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold text-primary">
                  {contributors.length}
                </p>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Team Members
                </p>
              </div>
            </div>

            {/* Contributors */}
            {contributors.slice(0, 2).map((contributor, index) => (
              <div
                key={contributor.id}
                className={cn(
                  "group rounded-xl border border-border bg-card/40 glass overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift opacity-0 relative",
                  isVisible && "animate-fade-in-up",
                )}
                style={{ animationDelay: `${(index + 1) * 100 + 150}ms` }}
              >
                {/* Avatar */}
                <div className="relative aspect-square bg-secondary/30 overflow-hidden">
                  <NextImage
                    src={contributor.avatar}
                    alt={contributor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-base tracking-tight transition-colors group-hover:text-gradient">
                      {contributor.name}
                    </h3>
                    <p className="font-mono text-xs text-primary uppercase tracking-wider mt-0.5">
                      {contributor.role}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {contributor.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-2">
                    {/* <SocialLink icon={Github} href={contributor.github} label="GitHub" /> */}
                    <SocialLink icon={Linkedin} href={contributor.linkedin} label="LinkedIn" />
                    <SocialLink icon={Mail} href={contributor.email ? `mailto:${contributor.email}` : undefined} label="Email" />
                    <SocialLink icon={Globe} href={contributor.website} label="Website" />
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            ))}

            {/* Right Text Area */}
            <div
              className={cn(
                "hidden lg:flex flex-col items-center justify-center opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "350ms" }}
            >
              <div className="text-center space-y-2 max-w-[200px]">
                <p className="font-mono text-sm text-primary font-semibold">
                  Join Us
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Collaborate with us to advance agent security
                </p>
              </div>
            </div>
          </div>

          {/* Second Row: 4 contributors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributors.slice(2, 6).map((contributor, index) => (
              <div
                key={contributor.id}
                className={cn(
                  "group rounded-xl border border-border bg-card/40 glass overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift opacity-0 relative",
                  isVisible && "animate-fade-in-up",
                )}
                style={{ animationDelay: `${(index + 4) * 100 + 150}ms` }}
              >
                {/* Avatar */}
                <div className="relative aspect-square bg-secondary/30 overflow-hidden">
                  <NextImage
                    src={contributor.avatar}
                    alt={contributor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-base tracking-tight transition-colors group-hover:text-gradient">
                      {contributor.name}
                    </h3>
                    <p className="font-mono text-xs text-primary uppercase tracking-wider mt-0.5">
                      {contributor.role}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {contributor.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-2">
                    {/* <SocialLink icon={Github} href={contributor.github} label="GitHub" /> */}
                    <SocialLink icon={Linkedin} href={contributor.linkedin} label="LinkedIn" />
                    <SocialLink icon={Mail} href={contributor.email ? `mailto:${contributor.email}` : undefined} label="Email" />
                    <SocialLink icon={Globe} href={contributor.website} label="Website" />
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className={cn("mt-16 rounded-xl border border-dashed border-border/50 bg-secondary/20 p-8 text-center opacity-0", isVisible && "animate-fade-in-up stagger-6")}>
        </div>
      </div>
    </section>
  )
}
