"use client"

import { useState, useEffect, useRef } from "react"
import { cn, getAssetPath } from "@/lib/utils"
import { PlayCircle, PauseCircle, Volume2, VolumeX } from "lucide-react"

export function IntroVideo() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className={cn("mb-8 text-center opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 mb-4">
            <PlayCircle className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Platform Introduction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Testing Platform Workbench Demo
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
            Learn how to use our testing platform and explore the workbench features and testing workflow
          </p>
        </div>

        {/* Video Container */}
        <div
          className={cn(
            "relative rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden opacity-0",
            isVisible && "animate-scale-in",
          )}
        >
          {/* Video */}
          <div className="relative aspect-video bg-black overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              style={{
                objectPosition: 'center center',
                transform: 'scale(1.05)', // 放大视频以裁剪黑边
              }}
              muted={isMuted}
              loop
              playsInline
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={getAssetPath("/home-video/首页demo视频.mp4")} type="video/mp4" />
              Your browser does not support video playback.
            </video>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/40"
                onClick={togglePlay}
              >
                <div className="rounded-full bg-primary/90 p-6 backdrop-blur-sm transition-transform hover:scale-110">
                  <PlayCircle className="h-16 w-16 text-primary-foreground" />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-primary transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseCircle className="h-8 w-8" />
                  ) : (
                    <PlayCircle className="h-8 w-8" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="ml-auto text-white hover:text-primary transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6" />
                  ) : (
                    <Volume2 className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium text-sm">Testing Workflow Demo</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Watch the video to learn how to conduct security testing in the workbench
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Demo Video
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={cn(
          "mt-8 grid gap-4 sm:grid-cols-3 opacity-0",
          isVisible && "animate-fade-in-up"
        )}
        style={{ animationDelay: "300ms" }}
        >
          <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">Quick Start</h4>
            <p className="text-xs text-muted-foreground">
              Complete testing setup in minutes
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">Comprehensive Testing</h4>
            <p className="text-xs text-muted-foreground">
              Covers multiple security testing scenarios
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">Detailed Reports</h4>
            <p className="text-xs text-muted-foreground">
              Get complete test result analysis
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
