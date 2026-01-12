"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { FlaskConical, Cpu, Zap, Clock, ChevronRight, Shield, Code2, Bug } from "lucide-react"

const features = [
  {
    icon: FlaskConical,
    title: "Automated Testing",
    description: "Comprehensive test suites for evaluating coding agent capabilities across multiple dimensions.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Shield,
    title: "Security Benchmarks",
    description: "Specialized tests for vulnerability detection, secure coding practices, and threat mitigation.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Code2,
    title: "Code Quality Analysis",
    description: "Static analysis, code review simulation, and best practice enforcement testing.",
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    icon: Bug,
    title: "Bug Detection",
    description: "Evaluate agent ability to identify, reproduce, and fix software bugs.",
    color: "from-orange-500/20 to-amber-500/20",
  },
]

const stats = [
  { label: "Test Cases", value: "500+", icon: Cpu },
  { label: "Categories", value: "16", icon: Zap },
  { label: "Coming Soon", value: "Q1 2026", icon: Clock },
]

export function TestsPageContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-16 sm:mb-24 space-y-6 text-center opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">In Development</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Automated Testing
            <span className="block bg-gradient-to-l from-primary/50 to-accent bg-clip-text text-transparent mt-2">
              Platform
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            A comprehensive evaluation framework for testing coding agents across security, performance,
            and code quality dimensions.
          </p>
        </div>

        {/* Stats */}
        <div className={cn("mb-16 grid gap-4 sm:grid-cols-3 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group rounded-xl border border-border bg-card/40 glass p-6 text-center transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="h-6 w-6 mx-auto mb-3 text-primary transition-transform duration-300 group-hover:scale-110" />
              <p className="text-2xl sm:text-3xl font-bold tabular-nums">{stat.value}</p>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", feature.color)} />
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-gradient">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary opacity-0 sm:opacity-100" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className={cn("mt-16 rounded-xl border border-dashed border-border/50 bg-secondary/20 p-8 text-center opacity-0", isVisible && "animate-fade-in-up stagger-6")}>
          <div className="inline-flex items-center justify-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-6 py-3">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm uppercase tracking-widest text-primary">
              Coming Soon — Stay Tuned
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
