import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AppRoutes from "./App";
import SeoManager from "./components/common/SeoManager";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <SeoManager />
        <div className="flex flex-col min-h-screen bg-[#FBF8EF]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-[#4B5320] focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex flex-1 flex-col">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
