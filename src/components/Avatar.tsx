import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    sizeAvatar?: number,
    fullName?: string,
    nameClass?: React.ComponentProps<'div'>['className']
}

function Avatar({ sizeAvatar = 10, fullName = "TV", nameClass}: Props) {
    return (
        <div className='justify-center items-center flex gap-3'>
            <div className="avatar online">
                <div className={`rounded-full ring-2 ring-offset-2 ring-offset-base-100 w-${sizeAvatar}`}>
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <span className={`font-bold ${nameClass}`}>{fullName}</span>
        </div>
    )
}

export default Avatar
