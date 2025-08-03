export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-2 text-muted-foreground text-lg">Page not found</p>
      <a
        href="/"
        className="mt-4 text-sm text-primary underline underline-offset-4"
      >
        Go back home
      </a>
    </div>
  )
}
