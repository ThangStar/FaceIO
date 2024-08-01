import React from 'react'

type Props = {
    size?: number,
    fullName?: string
}

function Avatar({ size = 10, fullName = "TV" }: Props) {
    return (
        <div className='justify-center items-center flex gap-3'>
            <div className="avatar online">
                <div className={`rounded-full ring-2 ring-offset-2 ring-offset-base-100 w-${size}`}>
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <span className='font-bold'>{fullName}</span>
        </div>
    )
}

export default Avatar
