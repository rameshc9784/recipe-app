import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function FavoritesButton({ meal }) {
    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    const [exists, setExists] = useState(false);

    // 🔁 Sync exists state with latest localStorage data
    useEffect(() => {
        const current = JSON.parse(localStorage.getItem("favorites")) || [];
        setExists(current.some((m) => m.idMeal === meal.idMeal));
    }, [meal]);

    function toggle() {
        const current = JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyExists = current.some((m) => m.idMeal === meal.idMeal);
        let updated;

        if (alreadyExists) {
            updated = current.filter((m) => m.idMeal !== meal.idMeal);
        } else {
            updated = [...current, meal];
        }

        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setExists(!alreadyExists); // ✅ update local state immediately
    }

    return (
        <button
            onClick={toggle}
            className={`text-sm px-2 py-1 border rounded transition ${exists
                ? "bg-red-100 border-red-400 text-red-600"
                : "hover:bg-gray-100"
                }`}
        >
            {exists ? "Unfavorite" : "Favorite"}
        </button>
    );
}
