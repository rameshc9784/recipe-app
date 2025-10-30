import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { lookupMealById } from "../api/meals";
import { ArrowLeft, Youtube, UtensilsCrossed, Heart } from "lucide-react";
import { toast } from "sonner";

export default function RecipeDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    // ✅ Fetch meal data
    useEffect(() => {
        setLoading(true);
        lookupMealById(id)
            .then((res) => {
                const fetchedMeal = res.meals ? res.meals[0] : null;
                setMeal(fetchedMeal);

                if (fetchedMeal) {
                    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                    const isFav = favorites.some(fav => fav.idMeal === fetchedMeal.idMeal);
                    setLiked(isFav);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    // ✅ Toggle Favourite
    const toggleFavorite = () => {
        if (!meal) return;
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        let updatedFavorites;

        if (liked) {
            updatedFavorites = favorites.filter(fav => fav.idMeal !== meal.idMeal);
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

        // ✅ Trigger custom event for favourites page to update in real time
        window.dispatchEvent(new Event("favoritesUpdated"));
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64 text-emerald-600 font-semibold">
                Loading recipe details...
            </div>
        );

    if (!meal)
        return (
            <div className="text-center text-gray-600 mt-10">
                Recipe not found.{" "}
                <Link to="/" className="underline text-emerald-600">
                    Back to home
                </Link>
            </div>
        );

    // ✅ Ingredients array
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (name && name.trim()) ingredients.push({ name, measure });
    }

    // ✅ YouTube video ID
    const youtube = meal.strYoutube;
    const videoId = youtube ? youtube.split("v=")[1] : null;

    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md border border-gray-100 animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-8">
                {/* 🖼️ Image Section */}
                <div className="md:w-1/3">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        loading="lazy"
                        className="w-full rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
                    />
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-gray-500 text-sm">
                            Category:{" "}
                            <span className="font-medium text-gray-700">{meal.strCategory}</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Area:{" "}
                            <span className="font-medium text-gray-700">{meal.strArea}</span>
                        </p>
                    </div>
                </div>

                {/* 📋 Details Section */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <h1 className="text-3xl font-bold text-emerald-700">{meal.strMeal}</h1>

                        {/* ❤️ Like Button */}
                        <button
                            onClick={toggleFavorite}
                            className="p-2 rounded-full shadow hover:scale-110 transition flex items-center gap-2 border border-gray-200"
                            title={liked ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart
                                className={`w-6 h-6 transition-colors duration-300 ${liked ? "fill-red-500 text-red-500" : "text-gray-500"
                                    }`}
                            />

                        </button>
                    </div>

                    {/* 🥣 Ingredients */}
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-2">
                        <UtensilsCrossed size={18} /> Ingredients
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-6">
                        {ingredients.map((ing, i) => (
                            <li
                                key={i}
                                className="bg-emerald-50 rounded px-3 py-1 text-sm text-gray-700 flex justify-between"
                            >
                                <span>{ing.name}</span>
                                <span className="text-gray-500">{ing.measure}</span>
                            </li>
                        ))}
                    </ul>

                    {/* 📖 Instructions */}
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Instructions</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                        {meal.strInstructions}
                    </p>

                    {/* ▶️ YouTube Video */}
                    {videoId && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-2">
                                <Youtube className="text-red-500" size={20} /> Watch Tutorial
                            </h3>
                            <div className="aspect-video rounded-lg overflow-hidden shadow-sm">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="Recipe Video"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {/* 🔙 Back Button */}
                    <div className="mt-8">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            <ArrowLeft size={18} /> Back to recipes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
