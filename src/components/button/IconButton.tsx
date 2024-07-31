import React from 'react'
import ChatSvg from '/public/svg/chat.svg';

function IconButton({ children }: any) {
    return (
        <div className='btn btn-circle bg-base-100 mx-0.5'>
            {children}
        </div>
    )
}

export default IconButton
