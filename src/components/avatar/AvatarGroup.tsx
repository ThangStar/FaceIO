import React from 'react'

function AvatarGroup() {
    return (
        <div className="avatar-group -space-x-3 rtl:space-x-reverse">
            <div className="avatar">
                <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8">
                    <span>+99</span>
                </div>
            </div>
        </div>
    )
}

export default AvatarGroup
