import '@/globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | GitHub Blog" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
  // <div className="flex h-screen items-center justify-center">
  //   <h1>Hello, World!</h1>
  // </div>
}
