"use client"

import { useState, useEffect } from "react"
import { cn, getAssetPath } from "@/lib/utils"
import { CheckCircle2, XCircle, Shield } from "lucide-react"
import NextImage from "next/image"
import Link from "next/link"

type AgentItem = {
  id: number
  name: string
  description: string
  passedCases: number
  totalCases: number
  logo?: string
}

// 按通过的 case 数排序（从高到低）
const agentItems: AgentItem[] = [
  {
    id: 1,
    name: "Cursor-IDE",
    description: "AI-powered code editor",
    passedCases: 270,
    totalCases: 300,
    logo: "/logos/cursor.png",
  },
  {
    id: 2,
    name: "Claude Code",
    description: "Anthropic's AI coding assistant",
    passedCases: 264,
    totalCases: 300,
    logo: "/logos/claude_code.png",
  },
  {
    id: 3,
    name: "Github Copilot",
    description: "AI pair programmer",
    passedCases: 258,
    totalCases: 300,
    logo: "/logos/github_copilot.png",
  },
  {
    id: 4,
    name: "Cline",
    description: "Open-source AI coding assistant",
    passedCases: 228,
    totalCases: 300,
  },
  {
    id: 5,
    name: "Cursor-CLI",
    description: "CLI for Cursor AI",
    passedCases: 210,
    totalCases: 300,
    logo: "/logos/cursor.png",
  },
].sort((a, b) => b.passedCases - a.passedCases)

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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 mb-4">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Security Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Agent Evaluation Results
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
            Security test results for popular coding agents
          </p>
        </div>

        {/* Evaluation Terminal */}
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
              <span className="font-mono text-xs">300 test cases</span>
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {agentItems.map((item, index) => {
              const passRate = (item.passedCases / item.totalCases) * 100
              const failedCases = item.totalCases - item.passedCases
              
              return (
                <div
                  key={item.id}
                  className={cn(
                    "group flex flex-col gap-3 p-4 sm:p-5 transition-all duration-300 sm:flex-row sm:items-center opacity-0",
                    isVisible && "animate-fade-in",
                    hoveredItem === item.id && "bg-secondary/30",
                  )}
                  style={{ animationDelay: `${index * 80 + 150}ms` }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Left: Logo & Name */}
                  <div className="flex items-center gap-3 min-w-0 sm:w-40">
                    {item.logo ? (
                      <div className="relative h-6 w-6 shrink-0">
                        <NextImage
                          src={getAssetPath(item.logo)}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-6 w-6 shrink-0 rounded bg-secondary/60 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {item.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-primary truncate">
                      {item.name}
                    </h4>
                  </div>

                  {/* Center: Progress Bar */}
                  <div className="flex-1">
                    <div className="relative h-2 rounded-full bg-secondary/60 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                        style={{ width: `${passRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Stats */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <span className="font-mono text-xs font-semibold text-primary">{item.passedCases}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono text-xs text-muted-foreground">{failedCases}</span>
                    </div>
                    <span className={cn(
                      "font-mono text-xs font-semibold w-10 text-right",
                      passRate >= 80 ? "text-primary" : passRate >= 60 ? "text-yellow-500" : "text-destructive"
                    )}>
                      {passRate.toFixed(0)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>Sorted by passed cases</span>
              <Link href="/rank" className="text-primary hover:underline transition-colors">
                View full results →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
