import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function RecipeCard({ meal }) {
    const [liked, setLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // ✅ Check favorites from localStorage
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setLiked(favorites.some((fav) => fav.idMeal === meal.idMeal));
    }, [meal.idMeal]);

    // ✅ Toggle favorite in localStorage
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        let updatedFavorites;

        if (liked) {
            updatedFavorites = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
            toast.error("Removed from favorites 💔", {
                position: "bottom-center",
                duration: 1500,
            });
        } else {
            updatedFavorites = [...favorites, meal];
            toast.success("Added to favorites ❤️", {
                position: "bottom-center",
                duration: 1500,
            });
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setLiked(!liked);

        // ✅ Dispatch event so Favorites page auto-updates
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            {/* 🖼️ Image Section */}
            <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                {/* Shimmer while loading */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}

                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* View Recipe Button */}
                <div className="absolute inset-x-0 bottom-3 flex justify-center sm:opacity-0 sm:group-hover:opacity-100 transition duration-300">
                    <Link
                        to={`/meal/${meal.idMeal}`}
                        className="bg-white/90 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow hover:bg-white transition"
                    >
                        View Recipe
                    </Link>
                </div>

                {/* ❤️ Heart Button */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:scale-110 transition ${liked ? "animate-ping-once" : ""
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                    />
                </button>
            </div>

            {/* 📜 Content Section */}
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                    {meal.strMeal}
                </h3>
                {meal.strCategory && (
                    <p className="text-sm text-gray-500 mt-1">{meal.strCategory}</p>
                )}
            </div>
        </div>
    );
}
