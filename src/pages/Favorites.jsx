import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import RecipeList from "../components/RecipeList";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

export default function Favorites() {
    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    const [showModal, setShowModal] = useState(false);

    // 🔁 Listen for favorites change (real-time update)
    useEffect(() => {
        const handleStorageChange = () => {
            const updated = JSON.parse(localStorage.getItem("favorites")) || [];
            setFavorites(updated);
        };

        window.addEventListener("storage", handleStorageChange);
        const interval = setInterval(handleStorageChange, 500);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [setFavorites]);

    // 🗑️ Clear all favorites
    function clearFavorites() {
        setFavorites([]);
        localStorage.setItem("favorites", JSON.stringify([]));
        setShowModal(false);
    }

    return (
        <div className="animate-fadeIn relative">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
                    <Heart className="text-pink-500" size={28} />
                    My Favorite Recipes
                </h1>

                {favorites.length > 0 && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>
                )}
            </div>

            {/* Content Section */}
            {favorites.length === 0 ? (
                <div className="text-center mt-16">
                    <div className="mx-auto w-52 h-52 opacity-80">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
                            alt="No favorites"
                            className="w-full h-full object-contain animate-bounce-slow"
                        />
                    </div>
                    <p className="text-gray-600 mt-6 text-lg">
                        You haven’t added any favorites yet 😢
                    </p>
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-5 py-2.5 rounded-full shadow hover:shadow-md transition-all duration-200"
                    >
                        Browse Recipes
                    </Link>
                </div>
            ) : (
                <RecipeList meals={favorites} />
            )}

            {/* 🧩 Custom Confirm Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-2xl w-[90%] max-w-md p-8 text-center animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Clear All Favorites?
                        </h2>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                            This will permanently remove all your saved recipes from your favorites list.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 font-medium transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={clearFavorites}
                                className="px-5 py-2.5 rounded-lg bg-red-500  text-white font-semibold hover:bg-red-600 shadow-md transition-all"
                            >
                                Yes, Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
