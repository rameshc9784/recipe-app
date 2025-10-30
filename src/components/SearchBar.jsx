import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="relative w-full max-w-xl">
                {/* Search Icon */}
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                {/* Input Box */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for delicious recipes..."
                    className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none shadow-sm transition-all duration-300 placeholder-gray-400 text-gray-700"
                />

                {/* Reset Button (X icon) */}
                {value && (
                    <button
                        onClick={() => onChange("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
