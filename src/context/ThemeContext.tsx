"use client"
import React, { ReactNode } from 'react'

export const ThemeContext = React.createContext({

})
function ThemeProvider({ children }: any) {

    const [theme, setTheme] = React.useState('valentine')
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
        const t = localStorage.getItem('theme') || 'valentine';
        setTheme(t)
    }, [])

    const changeTheme = (t: 'dark' | 'valentine') => {
        setTheme(t)
        localStorage.setItem('theme', t)
    }
    if (!isMounted) {
        return (
            <span className="loading loading-infinity loading-lg"></span>
        )
    }
    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            <div data-theme={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
