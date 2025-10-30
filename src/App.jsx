import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import { Heart, HomeIcon } from "lucide-react";
import { Toaster } from "sonner";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <Toaster richColors closeButton />
      {/* Header / Navbar */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-bold"
          >
            🍳 <span className="bg-gradient-to-r from-emerald-500 to-teal-400 text-transparent bg-clip-text">RecipeVerse</span>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-6 items-center">
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200 ${location.pathname === "/"
                ? "bg-emerald-100 text-emerald-600 font-semibold"
                : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
                }`}
            >
              <HomeIcon size={18} className="hidden md:block" />
              Home
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200 ${location.pathname === "/favorites"
                ? "bg-pink-100 text-pink-600 font-semibold"
                : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                }`}
            >
              <Heart size={18} className="hidden md:block" />
              Favorites
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-100 mt-10">
        © {new Date().getFullYear()} RecipeVerse — Made with 💚 by Ramesh Choudhary
      </footer>
    </div>
  );
}
