import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Tasks from './components/Tasks/Tasks.jsx'

const router = createBrowserRouter([
  { path: '/', 
    element: <App />,
    children: [
      {index: true, element: <Tasks />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
