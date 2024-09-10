"use client"
import LogoProgress from '@/components/layout/LogoProgress'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

export const ThemeContext = React.createContext({

})
function ThemeProvider({ children }: any) {

    const [theme, setTheme] = React.useState('dark')
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
        const t = localStorage.getItem('theme') || 'dark';
        setTheme(t)
    }, [])

    const changeTheme = (t: 'dark' | 'valentine') => {
        setTheme(t)
        localStorage.setItem('theme', t)
    }
    const pathname = usePathname()
    if (!isMounted) {
        if(pathname == "/") return <></>
        return (
            <LogoProgress label='Đang tải giao diện..'/>
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
