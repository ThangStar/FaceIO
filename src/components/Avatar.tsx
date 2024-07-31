import React from 'react'

function Avatar() {
    return (
        <div className='justify-center items-center flex gap-2'>
            <div className="avatar online">
                <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>

            </div>
            <span>Thang Van</span>
        </div>
    )
}

export default Avatar
