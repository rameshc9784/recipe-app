import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ meals = [] }) {
    if (!meals || meals.length === 0) {
        return <div>No recipes found.</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.map(meal => (
                <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
    );
}