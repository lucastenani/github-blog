import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Error } from './pages/error'
import { Home } from './pages/home'
import { Position } from './pages/position'

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
        path: '/position/:id',
        element: <Position />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
