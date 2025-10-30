import React, { useEffect, useState } from "react";
import {
    searchMealsByName,
    listCategories,
    listIngredientNames,
    filterMeals,
} from "../api/meals";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RecipeList from "../components/RecipeList";

export default function Home() {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [filters, setFilters] = useState({ category: "", ingredient: "" });
    const [loading, setLoading] = useState(false);

    // 🔹 Fetch filters once
    useEffect(() => {
        async function loadFilters() {
            try {
                const [catRes, ingRes] = await Promise.all([
                    listCategories(),
                    listIngredientNames(),
                ]);
                setCategories(catRes.categories || []);
                setIngredients(ingRes.meals || []);
            } catch (err) {
                console.error("Failed to load filters:", err);
            }
        }
        loadFilters();
    }, []);

    // 🔹 Default recipes on first load
    useEffect(() => {
        async function loadDefault() {
            setLoading(true);
            try {
                const res = await searchMealsByName("a");
                setMeals(res.meals || []);
            } catch {
                setMeals([]);
            } finally {
                setLoading(false);
            }
        }
        loadDefault();
    }, []);

    // 🔹 Manual search handler (triggered from SearchBar button or Enter)
    async function handleSearch() {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await searchMealsByName(query.trim());
            setMeals(res.meals || []);
        } catch {
            setMeals([]);
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Filters change handler
    useEffect(() => {
        async function filterData() {
            if (!filters.category && !filters.ingredient) return;
            setLoading(true);
            try {
                const res = await filterMeals({
                    c: filters.category,
                    i: filters.ingredient,
                });
                setMeals(res.meals || []);
            } catch {
                setMeals([]);
            } finally {
                setLoading(false);
            }
        }
        filterData();
    }, [filters]);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    🍳 Discover Delicious Recipes
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Search, explore and save your favorite meals from around the world.
                </p>
            </header>

            {/* Search + Filters */}
            <section className="max-w-5xl mx-auto px-4">
                <div className="bg-white/90 backdrop-blur-md shadow-md rounded-2xl p-6 border border-gray-100">
                    {/* 🔍 Search Bar */}
                    <div className="mb-4">
                        <SearchBar
                            value={query}
                            onChange={setQuery}
                            onSearch={handleSearch}
                            onClear={async () => {
                                setQuery("");
                                const res = await searchMealsByName("a");
                                setMeals(res.meals || []);
                            }}
                        />
                    </div>

                    {/* 🧂 Filters */}
                    <Filters
                        categories={categories}
                        ingredients={ingredients}
                        value={filters}
                        onChange={setFilters}
                    />
                </div>
            </section>

            {/* Recipes */}
            <main className="max-w-6xl mx-auto px-4 pb-12 mt-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
                    </div>
                ) : meals.length > 0 ? (
                    <RecipeList meals={meals} />
                ) : (
                    <p className="text-center text-gray-500 text-lg py-10">
                        No recipes found. Try a different search or filter.
                    </p>
                )}
            </main>
        </div>
    );
}
