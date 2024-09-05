"use client"
import { ThemeContext } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/useSwitchTheme';
import React, { HTMLAttributes, HTMLProps, useContext, useEffect, useRef, useState } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    iconStyle?: HTMLProps<HTMLElement>["className"];
}
const ToggleTheme = ({ iconStyle }: Props) => {
    // const { toggleTheme, theme } = useTheme();
    const themes = useRef(["light",
        "dark",
        "valentine",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ])
    const { theme, changeTheme } = useContext<any>(ThemeContext)
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
                {themes.current.map((theme, index) => (
                    <li key={index}>
                        <input
                            onClick={() => changeTheme(theme)}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={theme}
                            value={theme} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToggleTheme
