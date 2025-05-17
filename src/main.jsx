import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import AppRoutes from './App' // Import AppRoutes yang kita buat di atas

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#FBF8EF]">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
)
