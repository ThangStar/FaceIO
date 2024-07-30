"use client"
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
    const [theme, setTheme] = useState('')
    useEffect(() => {
        const t = localStorage.getItem('theme');
        setTheme(t || 'light')
        document.querySelector('html')?.setAttribute("data-theme", t || 'light');
    }, [])
    const toggleTheme = (t: 'dark' | 'light') => {
        const t2 = localStorage.getItem('theme');
        if(t2 === t) return;
        document.querySelector('html')?.setAttribute("data-theme", t);
        localStorage.setItem('theme', t);
    }
    return {
        toggleTheme,
        theme
    }
}





