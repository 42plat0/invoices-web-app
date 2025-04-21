import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { UserContextProvider } from '../contexts/UserContext'
import './static/index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
)
