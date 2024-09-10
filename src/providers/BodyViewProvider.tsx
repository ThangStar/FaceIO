import React, { useContext } from 'react'
import AlertProvider from './AlertProvider'
import TextTicket from '@/components/paragraphs/TextTicket'
import Image from 'next/image'
import { BgContext, BgContextType } from '@/context/BackgroundHomeContext'

const BgHome = () => {
    const context = useContext<BgContextType | undefined>(BgContext)
    if (!context) return null
    const { bgHome, setBgHome } = context
    return (
        <div className='fixed bottom-0 before:backdrop-blur-md top-0 before:absolute before:bg-base-300 before:bg-opacity-80 before:inset-0 left-0 right-0 max-w-[calc(100vw-16px)]'>
            <Image placeholder='blur' blurDataURL={bgHome} className='w-full object-cover h-screen' objectFit='cover' src={bgHome} width={200} height={200} alt='' />
        </div>
    )
}
function BodyViewProvider({ children }: any) {
    return (
        <div className='relative'>
            <TextTicket className='z-[18] absolute mt-3 ' />
            <BgHome />
            <div className="w-full min-h-[calc(100%-240px-48px-64px)] pt-12 pb-12 absolute z-[18]">
                {children}
            </div>
        </div>
    )
}

export default BodyViewProvider
