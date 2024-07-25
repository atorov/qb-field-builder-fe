/**
 * src/shared/useDebounce.ts
 *
 * Custom hook that debounces a value by a specified delay.
 * Useful for delaying updates to a value until a period of inactivity has elapsed.
 *
 * @template T
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced value.
 */

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
