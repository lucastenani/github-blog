import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-accent-foreground">
        Back to{' '}
        <Link className="text-primary hover:underline" to={'/'}>
          home
        </Link>
      </p>
    </main>
  )
}
