"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Image, Activity, Clock } from "lucide-react"
import NextImage from "next/image"

type WipItem = {
  id: number
  name: string
  description: string
  score: number
  lastUpdated: string
  url: string
  branch: string
  logo?: string // Optional logo path, e.g. "/logos/cursor.svg"
}

const wipItems: WipItem[] = [
  {
    id: 1,
    name: "Cursor-IDE",
    description: "Cursor IDE is a modern, full-featured IDE for the web.",
    score: 90.00,
    lastUpdated: "No.1",
    url: "",
    branch: "v14.9.1",
    logo: "/logos/cursor.png",
  },
  {
    id: 2,
    name: "Claude Code",
    description: "Claude Code is a modern, full-featured IDE for the web.",
    score: 88.00,
    lastUpdated: "No.2",
    url: "",
    branch: "v1.41.0",
    logo: "/logos/claude_code.png"
  },
  {
    id: 3,
    name: "Github Copilot",
    description: "Github Copilot is a modern, full-featured IDE for the web.",
    score: 87.00,
    lastUpdated: "No.3",
    url: "",
    branch: "v1.13.2",
    logo: "/logos/github_copilot.png"
  },
  {
    id: 4,
    name: "Cline",
    description: "Cline is a modern, full-featured IDE for the web.",
    score: 75.00,
    lastUpdated: "No.4",
    url: "",
    branch: "v1.11.1",
  },
  {
    id: 5,
    name: "Cursor-CLI",
    description: "Cursor CLI is a modern, full-featured IDE for the web.",
    score: 70.00,
    lastUpdated: "No.5",
    url: "",
    branch: "v1.2.0",
    logo: "/logos/cursor.png",
  },
]

const recentActivity = [
  { type: "commit", project: "einui", message: "testing trae...", time: "2 hours ago" },
  { type: "branch", project: "llm-practice", message: "testing codebuddy...", time: "5 hours ago" },
  { type: "commit", project: "einbiogpt", message: "testing ...", time: "1 day ago" },
  { type: "commit", project: "handbuilt-linux", message: "testing...", time: "2 days ago" },
]

export function WorkbenchPageContent() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Ranking of coding agents
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Ranking</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            We evaluated various forms of Coding Agents such as CLI and IDE
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Terminal */}
          <div className="lg:col-span-2">
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift opacity-0",
                isVisible && "animate-scale-in stagger-2",
              )}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
                </div>
                <span className="ml-4 font-mono text-xs text-muted-foreground truncate"></span>
                <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs">testing</span>
                </div>
              </div>

              <div className="divide-y divide-border/30">
                {wipItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between opacity-0",
                      isVisible && "animate-fade-in",
                      hoveredItem === item.id && "bg-secondary/30",
                    )}
                    style={{ animationDelay: `${index * 80 + 300}ms` }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-3">
                        {/* Logo or fallback */}
                        {item.logo ? (
                          <div className="relative h-5 w-5 shrink-0">
                            <NextImage
                              src={item.logo}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="h-5 w-5 shrink-0 rounded bg-secondary/60 flex items-center justify-center">
                            <span className="text-[10px] font-medium text-muted-foreground">
                              {item.name.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
                          {item.name}
                        </h4>
                      </div>
                      <p className="pl-8 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-6 pl-6 sm:pl-0">
                      <span
                        className={cn(
                          "font-mono text-sm tabular-nums transition-colors",
                          item.score >= 80 ? "text-primary font-semibold" : "text-muted-foreground",
                        )}
                      >
                        {item.score.toFixed(2)}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">{item.lastUpdated}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="text-primary">❯</span>
                  <span className="typing-cursor truncate">testing...</span>
                  <span className="ml-auto text-primary/50 hidden sm:block">press enter to run</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-3",
              )}
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-4">Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-secondary/30">
                  <p className="text-2xl font-bold text-foreground">{wipItems.length}</p>
                  <p className="font-mono text-xs text-muted-foreground">Tested</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/30">
                  <p className="text-2xl font-bold text-primary">
                    {(wipItems.reduce((a, b) => a + b.score, 0) / wipItems.length).toFixed(2)}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-4",
              )}
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <Activity className="h-3.5 w-3.5" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs">
                    <span
                      className={cn(
                        "shrink-0 w-1.5 h-1.5 rounded-full mt-1.5",
                        activity.type === "commit" ? "bg-primary" : "bg-yellow-500",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate">{activity.message}</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
