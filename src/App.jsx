import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import { Heart, HomeIcon } from "lucide-react";
import { Toaster } from "sonner";

export default function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (to, label, icon, activeClass, hoverClass) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${location.pathname === to ? activeClass : hoverClass
        }`}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <Toaster richColors closeButton />

      {/* ✅ Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold">
            🍳{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 text-transparent bg-clip-text">
              RecipeVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLink(
              "/",
              "Home",
              <HomeIcon size={18} />,
              "bg-emerald-100 text-emerald-600 font-semibold",
              "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
            )}
            {navLink(
              "/favorites",
              "Favorites",
              <Heart size={18} />,
              "bg-pink-100 text-pink-600 font-semibold",
              "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
            )}
          </nav>

          {/* ✅ Hamburger Button for Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-between w-6 h-5 relative group"
          >
            <span
              className={`block h-0.5 w-full bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
            ></span>
          </button>
        </div>

        {/* ✅ Mobile Menu with fancy animation */}
        <div
          className={`md:hidden border-t border-gray-100 overflow-hidden transition-all duration-500 ${menuOpen
            ? "max-h-48 opacity-100 shadow-lg backdrop-blur-md bg-white/95"
            : "max-h-0 opacity-0"
            }`}
        >
          <nav
            className={`flex flex-col px-6 py-3 space-y-2 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-0"
              }`}
          >
            {navLink(
              "/",
              "Home",
              <HomeIcon size={18} />,
              "bg-emerald-100 text-emerald-600 font-semibold",
              "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
            )}
            {navLink(
              "/favorites",
              "Favorites",
              <Heart size={18} />,
              "bg-pink-100 text-pink-600 font-semibold",
              "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
            )}
          </nav>
        </div>
      </header>

      {/* ✅ Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      {/* ✅ Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-100 mt-10">
        © {new Date().getFullYear()} RecipeVerse — Made with 💚 by Ramesh Choudhary
      </footer>
    </div>
  );
}
