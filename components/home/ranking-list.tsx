"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import NextImage from "next/image"

type WipItem = {
  id: number
  name: string
  description: string
  score: number
  lastUpdated: string
  logo?: string
}

const wipItems: WipItem[] = [
  {
    id: 1,
    name: "Cursor-IDE",
    description: "Cursor IDE is a modern, full-featured IDE for the web.",
    score: 90.00,
    lastUpdated: "No.1",
    logo: "/logos/cursor.png",
  },
  {
    id: 2,
    name: "Claude Code",
    description: "Claude Code is a modern, full-featured IDE for the web.",
    score: 88.00,
    lastUpdated: "No.2",
    logo: "/logos/claude_code.png"
  },
  {
    id: 3,
    name: "Github Copilot",
    description: "Github Copilot is a modern, full-featured IDE for the web.",
    score: 87.00,
    lastUpdated: "No.3",
    logo: "/logos/github_copilot.png"
  },
  {
    id: 4,
    name: "Cline",
    description: "Cline is a modern, full-featured IDE for the web.",
    score: 75.00,
    lastUpdated: "No.4",
  },
  {
    id: 5,
    name: "Cursor-CLI",
    description: "Cursor CLI is a modern, full-featured IDE for the web.",
    score: 70.00,
    lastUpdated: "No.5",
    logo: "/logos/cursor.png",
  },
]

export function RankingList() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className={cn("mb-8 text-center opacity-0", isVisible && "animate-fade-in-up")}>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Coding Agent Security Evaluation
          </h2>
        </div>

        {/* Ranking Terminal */}
        <div
          className={cn(
            "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden opacity-0",
            isVisible && "animate-scale-in",
          )}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
            </div>
            <div className="ml-auto flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs">testing</span>
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {wipItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between opacity-0",
                  isVisible && "animate-fade-in",
                  hoveredItem === item.id && "bg-secondary/30",
                )}
                style={{ animationDelay: `${index * 80 + 150}ms` }}
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
              </div>
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
    </section>
  )
}
