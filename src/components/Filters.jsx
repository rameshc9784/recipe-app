import React from "react";
import { Filter } from "lucide-react";

export default function Filters({ categories, ingredients, value, onChange }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <Filter className="text-emerald-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-700">Filter Recipes</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Category
                    </label>
                    <select
                        value={value.category}
                        onChange={(e) =>
                            onChange({ ...value, category: e.target.value, ingredient: "" })
                        }
                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 text-gray-700"
                    >
                        <option value="">All</option>
                        {categories.map((c) => (
                            <option key={c.idCategory} value={c.strCategory}>
                                {c.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ingredient Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Ingredient
                    </label>
                    <select
                        value={value.ingredient}
                        onChange={(e) =>
                            onChange({ ...value, ingredient: e.target.value, category: "" })
                        }
                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 text-gray-700"
                    >
                        <option value="">All</option>
                        {ingredients.slice(0, 100).map((ing, idx) => (
                            <option key={idx} value={ing.strIngredient}>
                                {ing.strIngredient}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
