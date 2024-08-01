import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Post } from './pages/post'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/post/:id',
    element: <Post />,
  },
])
