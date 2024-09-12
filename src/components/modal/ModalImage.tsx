import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
    url: string
}

function ModalImage({ url }: Props) {
    const [isLoading, setIsLoading] = useState(true)
    const onLoadingComplete = (event: any) => {
        console.log("OK");
        setIsLoading(false)
    }
    useEffect(() => {
        setIsLoading(true)
        return () => {
        }
    }, [url])

    return (
        <div className='h-screen glass relative'>
            <Image placeholder="empty" onLoadingComplete={onLoadingComplete} fill alt='' sizes='1' className='w-full h-full object-contain rounded-md' src={url || 'https://picsum.photos/200'} />
            {isLoading &&
                <div className="skeleton h-screen absolute z-40 inset-0"></div>
            }
        </div>
    )
    
}

export default ModalImage
