import Image from 'next/image'
import React from 'react'

type Props = {
    url: string
}

function ModalImage({ url }: Props) {
    return (
        <div className='h-screen'>
            <Image alt='' width={200} sizes='1' className='w-full h-full object-contain rounded-md' height={200} src={url} />
        </div>
    )
}

export default ModalImage
