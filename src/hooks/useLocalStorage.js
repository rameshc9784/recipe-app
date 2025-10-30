import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const jsonValue = localStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // ✅ returns both value and setter
    return [value, setValue];
}
