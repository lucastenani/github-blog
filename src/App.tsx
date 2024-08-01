import '@/globals.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
  return <RouterProvider router={router} />
  // <div className="flex h-screen items-center justify-center">
  //   <h1>Hello, World!</h1>
  // </div>
}
