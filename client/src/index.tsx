import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ROUTER_PATH from './router/routerPath'

const router = createBrowserRouter(ROUTER_PATH)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
