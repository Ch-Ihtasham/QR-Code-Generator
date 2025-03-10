import { useState, useEffect } from 'react'
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
export const Header = () => {
    const { themeMode, lightMode, darkMode } = useTheme()
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div className='dark:dark:bg-[#0D1117] flex items-center justify-between px-12'>
            <h1 className="text-center text-4xl font-semibold py-12 dark:text-white dark:dark:bg-[#0D1117]">QR Code Producer - Create QR Codes for Free</h1>
            <button
                onClick={toggleTheme}
                className="relative w-14 h-8 bg-gray-300 dark:bg-white dark:border dark:border-white rounded-full flex items-center p-1 transition-all"
            >
                <span
                    className={`w-6 h-6 bg-white dark:bg-yellow-500 rounded-full shadow-md transform transition-all ${theme === "dark" ? "translate-x-6" : "translate-x-0"
                        }`}
                ></span>
            </button>
        </div>
    )
}
