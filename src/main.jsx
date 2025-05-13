import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ background: 'linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%)', minHeight: '100vh' }}>
      <Navbar />
    </div>
  </StrictMode>,
)