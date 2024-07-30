"use client"
import { ThemeContext } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/useSwitchTheme';
import React, { HTMLAttributes, HTMLProps, useContext, useEffect, useState } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    iconStyle?: HTMLProps<HTMLElement>["className"];
}
const ToggleTheme = ({ iconStyle }: Props) => {
    // const { toggleTheme, theme } = useTheme();
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
                <li>
                    <input
                        onClick={() => changeTheme('light')}
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="light"
                        value="light" />
                </li>
                <li>
                    <input
                        onClick={() => changeTheme('dark')}
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="dark"
                        value="dark" />
                </li>
                <li>
                    <input
                        type="radio"
                        onClick={() => changeTheme('cyberpunk')}
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Cyberpunk"
                        value="cyberpunk" />
                </li>
                <li>
                    <input
                        onClick={() => changeTheme('valentine')}
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Valentine"
                        value="valentine" />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Aqua"
                        value="aqua" />
                </li>
            </ul>
        </div>
    )
}

export default ToggleTheme
