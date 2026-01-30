import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-8">
        {/* 404 Number */}
        <div>
          <h1 className="text-8xl sm:text-9xl font-bold font-mono text-primary mb-4">
            404
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
        </div>

        {/* Go Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          Go Home
        </Link>

        {/* Error Code */}
        <div className="text-xs text-muted-foreground font-mono pt-4">
          <span className="text-primary">&gt;</span> 404_NOT_FOUND
        </div>
      </div>
    </div>
  )
}
