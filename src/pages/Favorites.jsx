import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import RecipeList from "../components/RecipeList";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

export default function Favorites() {
    const [favorites, setFavorites] = useLocalStorage("favorites", []);

    function clearFavorites() {
        if (window.confirm("Remove all favorites?")) {
            setFavorites([]);
        }
    }

    return (
        <div className="animate-fadeIn">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
                    <Heart className="text-pink-500" size={28} />
                    My Favorite Recipes
                </h1>

                {favorites.length > 0 && (
                    <button
                        onClick={clearFavorites}
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
        </div>
    );
}
