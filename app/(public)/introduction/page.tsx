export default function IntroductionPage() {
  return (
    <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
              Welcome to AgentSphere
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Where Code Meets{" "}
              <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                Creativity
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            AgentSphere is a digital workshop and portfolio platform designed for developers who
            believe in building in public. It&apos;s a space where ideas take shape, experiments
            unfold, and open-source projects come to life.
          </p>
        </div>
      </div>
    </section>
  );
}
