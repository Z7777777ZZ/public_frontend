"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

type DataSample = {
  sample_id: string
  category: string
  sub_category: string
  user_instruction: string
  task_prompt: string
  hiding_method: string
  risk_level: "low" | "medium" | "high" | "critical"
}

// 为每个dataset定义独立的category集合
const datasetCategories: Record<string, string[]> = {
  "1": ["Credential Leakage", "User Information Leakage"], // data leakage
  "2": ["File System Destruction", "Privilege Escalation"], // host environment destruction
  "3": ["Malicious Code Generation", "Supply Chain Poisoning"], // harmful code generation
  "4": ["Resource Misuse(Token)", "Resource Misuse(System)"], // resource misuse
  "5": ["Malicious Instruction", "Context Pollution"], // context pollution
  "6": ["IDE Specific Vulnerabilities", "Extension Exploitation"], // ide-specific vulnerabilities
}

// 模拟数据 - 为每个数据集生成独立的数据
const generateMockSamples = (datasetId: string, page: number, pageSize: number): { samples: DataSample[], total: number } => {
  const hidingMethods = ["Base64 Encoding", "Hex Encoding", "Unicode Escape", "Comment Hiding", "Split String", "Variable Obfuscation", "Function Pointer", "Eval Injection"]
  const riskLevels: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"]

  // 每个dataset独立15条数据
  const totalSamples = 15
  const samples: DataSample[] = []

  const startIndex = (page - 1) * pageSize
  
  // 获取当前dataset对应的categories
  const categories = datasetCategories[datasetId] || ["Unknown Category"]

  for (let i = 0; i < pageSize && startIndex + i < totalSamples; i++) {
    const id = startIndex + i + 1
    // 在当前dataset的categories中循环选择
    const categoryIndex = id % categories.length
    const currentCategory = categories[categoryIndex]
    
    samples.push({
      sample_id: `DS${datasetId}-${String(id).padStart(4, '0')}`,
      category: currentCategory,
      sub_category: `Sub-category ${(id % 3) + 1}`,
      user_instruction: `User instruction sample #${id}: Please help me write a ${currentCategory.toLowerCase()} script for testing purposes in dataset ${datasetId}.`,
      task_prompt: `Task prompt #${id}: Implement a function that handles ${currentCategory.toLowerCase()} scenario with proper error handling and validation.`,
      hiding_method: hidingMethods[id % hidingMethods.length],
      risk_level: riskLevels[id % riskLevels.length],
    })
  }

  return { samples, total: totalSamples }
}

const datasetInfo: Record<string, { title: string; description: string; category: string }> = {
  "1": {
    title: "Dataset1",
    description: "This is a dataset for data leakage",
    category: "data leakage",
  },
  "2": {
    title: "Dataset2",
    description: "This is a dataset for host environment destruction",
    category: "host environment destruction",
  },
  "3": {
    title: "Dataset3",
    description: "This is a dataset for harmful code generation",
    category: "harmful code generation",
  },
  "4": {
    title: "Dataset4",
    description: "This is a dataset for resource misuse",
    category: "resource misuse",
  },
  "5": {
    title: "Dataset5",
    description: "This is a dataset for context pollution",
    category: "context pollution",
  },
  "6": {
    title: "Dataset6",
    description: "This is a dataset for ide-specific vulnerabilities",
    category: "ide-specific vulnerabilities",
  },
}

const riskLevelColors = {
  low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function DatasetDetailContent({ datasetId }: { datasetId: string }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const pageSize = 10

  const { samples, total } = generateMockSamples(datasetId, currentPage, pageSize)
  const totalPages = Math.ceil(total / pageSize)

  const filteredSamples = samples.filter(
    (sample) =>
      sample.sample_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.user_instruction.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const info = datasetInfo[datasetId] || { title: `Dataset ${datasetId}`, description: "Dataset for security testing", category: "unknown" }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-8 opacity-0", isVisible && "animate-fade-in-up")}>
          <button
            onClick={() => router.push("/datasets")}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Datasets
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-primary mb-2">{info.category}</p>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{info.title}</h1>
                <p className="text-muted-foreground mt-2">{info.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center px-6 py-3 rounded-xl border border-border bg-card/40 glass">
                  <p className="text-2xl font-bold tabular-nums">{total}</p>
                  <p className="font-mono text-xs text-muted-foreground">Total Samples</p>
                </div>
              </div>
            </div>

            {/* Demo 入口按钮 - 所有dataset都显示 */}
            <button
              onClick={() => router.push(`/datasets/${datasetId}/demo`)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/50 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 group"
            >
              <span className="font-semibold">View Case</span>
              <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={cn("mb-6 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by sample ID, category, or instruction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/40 border-border/60 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Samples Table */}
        <div
          className={cn(
            "rounded-xl border border-border bg-card/40 glass overflow-hidden opacity-0",
            isVisible && "animate-fade-in-up stagger-3",
          )}
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border/50 bg-secondary/30 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">User Instruction</div>
            <div className="col-span-3">Task Prompt</div>
            <div className="col-span-2">Hiding Method</div>
            <div className="col-span-1">Risk</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/30">
            {filteredSamples.length > 0 ? (
              filteredSamples.map((sample, index) => {
                // 计算全局索引（跨页）
                const globalIndex = (currentPage - 1) * pageSize + index
                const isMasked = globalIndex >= 5
                return (
                  <div
                    key={sample.sample_id}
                    className={cn(
                      "grid grid-cols-12 gap-4 px-6 py-4 text-sm transition-colors hover:bg-secondary/20 opacity-0",
                      isVisible && "animate-fade-in",
                    )}
                    style={{ animationDelay: `${index * 50 + 300}ms` }}
                  >
                    {/* ID - 保留可见 */}
                    <div className="col-span-1 font-mono text-xs text-muted-foreground">
                      {sample.sample_id.split("-")[1]}
                    </div>
                    
                    {/* Category - 保留可见 */}
                    <div className="col-span-2">
                      <div className="font-medium truncate">{sample.category}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {isMasked ? (
                          <span className="opacity-10 select-none">████████</span>
                        ) : (
                          sample.sub_category
                        )}
                      </div>
                    </div>
                    
                    {/* User Instruction - 马赛克 */}
                    <div className="col-span-3">
                      {isMasked ? (
                        <p className="text-muted-foreground opacity-10 select-none">████████████████████</p>
                      ) : (
                        <p className="text-muted-foreground line-clamp-2">{sample.user_instruction}</p>
                      )}
                    </div>
                    
                    {/* Task Prompt - 马赛克 */}
                    <div className="col-span-3">
                      {isMasked ? (
                        <p className="text-muted-foreground opacity-10 select-none">████████████████████</p>
                      ) : (
                        <p className="text-muted-foreground line-clamp-2">{sample.task_prompt}</p>
                      )}
                    </div>
                    
                    {/* Hiding Method - 马赛克 */}
                    <div className="col-span-2">
                      {isMasked ? (
                        <span className="inline-block px-2 py-1 rounded border border-border/30 bg-secondary/10 font-mono text-xs opacity-10 select-none">
                          ██████
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded border border-border/60 bg-secondary/40 font-mono text-xs truncate max-w-full">
                          {sample.hiding_method}
                        </span>
                      )}
                    </div>
                    
                    {/* Risk Level - 保留可见 */}
                    <div className="col-span-1">
                      <span className={cn("inline-block px-2 py-1 rounded border font-mono text-xs uppercase", riskLevelColors[sample.risk_level])}>
                        {sample.risk_level.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="font-mono text-sm text-muted-foreground">No samples found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {filteredSamples.length > 0 && (
          <div className={cn("flex items-center justify-between mt-6 opacity-0", isVisible && "animate-fade-in-up stagger-4")}>
            <p className="font-mono text-xs text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, total)} of {total} samples
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg border border-border/60 bg-secondary/40 font-mono text-xs transition-all",
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50 hover:text-primary"
                )}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={cn(
                        "w-10 h-10 rounded-lg font-mono text-xs transition-all",
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground"
                          : "border border-border/60 bg-secondary/40 hover:border-primary/50 hover:text-primary"
                      )}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg border border-border/60 bg-secondary/40 font-mono text-xs transition-all",
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50 hover:text-primary"
                )}
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
