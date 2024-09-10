import { getInStorage } from "@/utils/utils";
import { createContext, useEffect, useState } from "react";

export type BgContextType = {
    bgHome: string
    setBgHome: React.Dispatch<React.SetStateAction<string>>
}
export const BgContext = createContext<BgContextType | undefined>(undefined)

import React from 'react'

function BackgroundHomeContext({ children }: any) {
    const [bgHome, setBgHome] = useState('/images/bg_01.jpg')
    useEffect(() => {
        const bgHome = getInStorage('fio-background')
        bgHome && setBgHome(bgHome)
        return () => {
        }
    }, [bgHome])
    return (
        <BgContext.Provider value={{ bgHome, setBgHome }}>
            {children}
        </BgContext.Provider>
    )
}

export default BackgroundHomeContext
