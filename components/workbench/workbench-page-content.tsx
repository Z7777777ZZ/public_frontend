"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, BarChart3, Shield } from "lucide-react"
import NextImage from "next/image"

type AgentItem = {
  id: number
  name: string
  description: string
  passedCases: number
  totalCases: number
  logo?: string
  version?: string
}

// 按通过的 case 数排序（从高到低）
const agentItems: AgentItem[] = [
  {
    id: 1,
    name: "Cursor-IDE",
    description: "AI-powered code editor with intelligent code completion and generation",
    passedCases: 270,
    totalCases: 300,
    logo: "/logos/cursor.png",
    version: "v0.45",
  },
  {
    id: 2,
    name: "Claude Code",
    description: "Anthropic's AI coding assistant with advanced reasoning capabilities",
    passedCases: 264,
    totalCases: 300,
    logo: "/logos/claude_code.png",
    version: "v1.0",
  },
  {
    id: 3,
    name: "Github Copilot",
    description: "AI pair programmer that helps you write code faster",
    passedCases: 258,
    totalCases: 300,
    logo: "/logos/github_copilot.png",
    version: "v1.0",
  },
  {
    id: 4,
    name: "Cline",
    description: "Open-source AI coding assistant for VS Code",
    passedCases: 228,
    totalCases: 300,
    version: "v3.0",
  },
  {
    id: 5,
    name: "Cursor-CLI",
    description: "Command-line interface for Cursor AI coding capabilities",
    passedCases: 210,
    totalCases: 300,
    logo: "/logos/cursor.png",
    version: "v1.0",
  },
].sort((a, b) => b.passedCases - a.passedCases)

export function WorkbenchPageContent() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const totalAgents = agentItems.length
  const avgPassRate = (agentItems.reduce((a, b) => a + (b.passedCases / b.totalCases), 0) / totalAgents * 100).toFixed(1)
  const totalCases = agentItems[0]?.totalCases || 0

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Security Evaluation</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Agent <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Evaluation</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Security evaluation results for various Coding Agents. Each agent is tested against {totalCases} security test cases.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden opacity-0",
                isVisible && "animate-scale-in stagger-2",
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/50 bg-secondary/40 px-5 py-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm font-medium">Test Results</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {totalCases} test cases
                </span>
              </div>

              {/* Agent List */}
              <div className="divide-y divide-border/30">
                {agentItems.map((item, index) => {
                  const passRate = (item.passedCases / item.totalCases) * 100
                  const failedCases = item.totalCases - item.passedCases
                  
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "group p-5 sm:p-6 transition-all duration-300 opacity-0",
                        isVisible && "animate-fade-in",
                        hoveredItem === item.id && "bg-secondary/30",
                      )}
                      style={{ animationDelay: `${index * 80 + 300}ms` }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Left: Logo & Name */}
                        <div className="flex items-center gap-3 min-w-0 sm:w-48">
                          {item.logo ? (
                            <div className="relative h-8 w-8 shrink-0">
                              <NextImage
                                src={item.logo}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-8 shrink-0 rounded-lg bg-secondary/60 flex items-center justify-center">
                              <span className="text-xs font-medium text-muted-foreground">
                                {item.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-primary truncate">
                              {item.name}
                            </h4>
                            {item.version && (
                              <span className="font-mono text-[10px] text-muted-foreground">{item.version}</span>
                            )}
                          </div>
                        </div>

                        {/* Center: Progress Bar */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{item.description}</span>
                          </div>
                          <div className="relative h-2 rounded-full bg-secondary/60 overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                              style={{ width: `${passRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Right: Stats */}
                        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="font-mono text-sm font-semibold text-primary">{item.passedCases}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm text-muted-foreground">{failedCases}</span>
                          </div>
                          <div className="w-16 text-right">
                            <span className={cn(
                              "font-mono text-sm font-semibold",
                              passRate >= 80 ? "text-primary" : passRate >= 60 ? "text-yellow-500" : "text-destructive"
                            )}>
                              {passRate.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-border/50 bg-secondary/30 px-5 py-4">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>Sorted by passed cases (highest first)</span>
                  <span className="text-primary">Last updated: 2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Stats */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-3",
              )}
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5" />
                Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/30">
                  <p className="text-3xl font-bold text-foreground">{totalAgents}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">Agents Tested</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/30">
                  <p className="text-3xl font-bold text-primary">{avgPassRate}%</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">Avg Pass Rate</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-4",
              )}
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-4">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Passed test cases</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Failed test cases</span>
                </div>
                <div className="pt-2 border-t border-border/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-mono text-xs text-muted-foreground">≥ 80% pass rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="font-mono text-xs text-muted-foreground">60-79% pass rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <span className="font-mono text-xs text-muted-foreground">&lt; 60% pass rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div
              className={cn(
                "rounded-xl border border-dashed border-border/50 bg-secondary/20 p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-5",
              )}
            >
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each agent is evaluated against our comprehensive security test suite. 
                Results are updated regularly as new tests are added.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
