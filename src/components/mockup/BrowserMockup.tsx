import { BgContext, BgContextType } from '@/context/BackgroundHomeContext'
import { saveToStorage } from '@/utils/utils'
import Image from 'next/image'
import React, { Context, useContext } from 'react'

type Props = {
    imgUri?: string
}

function BrowserMockup({ imgUri }: Props) {
    const context = useContext<BgContextType | undefined>(BgContext)

    if(!context) return null
    const { bgHome, setBgHome } = context

    const handleChangeBackground = (uri: string) => {
        saveToStorage('fio-background', uri)
        setBgHome(uri)
        console.log(bgHome);

    }
    return (
        <div onClick={() => handleChangeBackground(imgUri || '/images/bg_01.jpg')} className="
        hover:after:content-['Đặt_làm_ảnh_nền']
        hover:after:bg-base-300
        after:content-center
        after:flex
        after:items-center
        after:transition-colors
        after:justify-center
        after:absolute
        after:inset-0
        hover:after:bg-opacity-70
        transition-all
        mockup-browser !hover:bg-none bg-base-300 border block cursor-pointer">
            <div className="mockup-browser-toolbar">
            </div>
            <div className="bg-base-200">
                <Image alt='' src={imgUri || '/images/bg_01.jpg'} className='w-full size-36 object-cover' objectFit='cover' width={400} height={400} ></Image>
            </div>
        </div>
    )
}

export default BrowserMockup
