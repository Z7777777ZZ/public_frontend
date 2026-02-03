"use client"

import { Mail, Users, ArrowRight, Sparkles } from "lucide-react"
import NextImage from "next/image"
import { getAssetPath } from "@/lib/utils"

type Contributor = {
  id: number
  name: string
  role: string
  avatar: string
}

const contributors: Contributor[] = [
  {
    id: 1,
    name: "Binbin Zhao",
    role: "ZJU 100-Young Professor",
    avatar: "/contributors/zhaobinbin.jpg",
  },
  {
    id: 2,
    name: "Fukang Zhu",
    role: "2025 Master Student",
    avatar: "/contributors/zhufukang.jpg",
  },
  {
    id: 3,
    name: "Yuan Su",
    role: "Postdoctoral Researcher",
    avatar: "/contributors/suyuan.jpg",
  },
  {
    id: 4,
    name: "Sijie Zhi",
    role: "2026 Master Student",
    avatar: "/contributors/zhisijie.jpg",
  },
  {
    id: 5,
    name: "Wanmeng Ding",
    role: "2025 Phd Student",
    avatar: "/contributors/dingwanmeng.jpg",
  },
  {
    id: 6,
    name: "Jinwen Wang",
    role: "2026 Phd Student",
    avatar: "/contributors/wangjinwen.jpg",
  },
  {
    id: 7,
    name: "Luyi Wang",
    role: "2026 Phd Student",
    avatar: "/contributors/wangluyi.jpg",
  },
]

// 贡献者头像组件
function ContributorAvatar({ contributor, index }: { contributor: Contributor; index: number }) {
  return (
    <div
      className="group flex flex-col items-center gap-3 animate-slide-up-fade"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-border/50 transition-all duration-300 group-hover:ring-primary/50 group-hover:scale-105">
        <NextImage
          src={getAssetPath(contributor.avatar)}
          alt={contributor.name}
          fill
          sizes="80px"
          className="object-cover"
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>
      <div className="text-center w-full">
        <p className="text-base font-medium transition-colors group-hover:text-primary">
          {contributor.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {contributor.role}
        </p>
      </div>
    </div>
  )
}

export function ContactPageContent() {
  const contactEmail = "binbinz@zju.edu.cn"
  
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl">
        
        {/* Hero: Join Us - 主要焦点 */}
        <div className="mb-16 animate-slide-up-fade">
          <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-8 sm:p-12 overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">Join Us</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Collaborate with Us
              </h1>
              
              <p className="max-w-xl mx-auto text-muted-foreground leading-relaxed">
                We're building CodingSphere to advance coding agent security evaluation. 
                Join our research team and contribute to the future of AI safety.
              </p>
              
              {/* Contact Button */}
              <div className="pt-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90 hover:gap-4 hover:shadow-lg hover:shadow-primary/25"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              
              <p className="text-xs text-muted-foreground font-mono">
                {contactEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Contributors Section - 紧凑展示 */}
        <div className="animate-slide-up-fade" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="font-mono text-xs uppercase tracking-widest">Team</span>
            </div>
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-xs text-muted-foreground">
              {contributors.length} members
            </span>
          </div>
          
          {/* Contributors Grid - 第一排3人，第二排4人错开显示 */}
          <div className="space-y-8">
            {/* 第一排：3人 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-5xl mx-auto">
              {contributors.slice(0, 3).map((contributor, index) => (
                <ContributorAvatar 
                  key={contributor.id} 
                  contributor={contributor} 
                  index={index} 
                />
              ))}
            </div>
            
            {/* 第二排：4人居中错开 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 max-w-6xl mx-auto">
              {contributors.slice(3).map((contributor, index) => (
                <ContributorAvatar 
                  key={contributor.id} 
                  contributor={contributor} 
                  index={index + 3} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
