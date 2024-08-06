import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Error } from './pages/error'
import { Home } from './pages/home'
import { Post } from './pages/post'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <Post />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
