import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onSearch, onClear }) {
    const [inputValue, setInputValue] = useState(value || "");

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleSearchClick = () => {
        if (inputValue.trim().length === 0) return;
        onSearch?.(inputValue.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearchClick();
    };

    const handleClear = () => {
        setInputValue("");
        onChange("");
        onClear?.(); // 🔥 trigger parent clear logic (e.g., clear meals)
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="relative w-full max-w-xl flex">
                {/* Input Box */}
                <div className="relative flex-1">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for delicious recipes..."
                        className="w-full pl-12 pr-12 py-3 rounded-l-2xl bg-white border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none shadow-sm transition-all duration-300 placeholder-gray-400 text-gray-700"
                    />

                    {/* Clear Button */}
                    {inputValue && (
                        <button
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearchClick}
                    className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-white font-semibold px-6 rounded-r-2xl shadow-md transition-all duration-300 active:scale-95"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
