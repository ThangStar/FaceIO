import React from 'react'

function Avatar() {
    return (
        <div className='justify-center items-center flex gap-3'>
            <div className="avatar online">
                <div className="w-10 rounded-full ring-2 ring-offset-2 ring-offset-base-100">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <span className='font-bold'>TV</span>
        </div>
    )
}

export default Avatar
