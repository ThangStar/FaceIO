import Image from 'next/image'
import React from 'react'

type Props = {
    url: string
}

function ModalImage({ url }: Props) {
    return (
        <Image alt='' width={0} sizes='1' className='w-full h-full object-center object-contain rounded-md' height={0} src={url} />
    )
}

export default ModalImage
