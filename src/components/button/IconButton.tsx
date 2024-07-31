import React, { HTMLAttributes } from 'react'
import ChatSvg from '/public/svg/chat.svg';
type Props = HTMLAttributes<HTMLDivElement> & {
    children: any
}
function IconButton({ children }: Props) {
    return (
        <div className='btn btn-circle bg-base-100 mx-0.5'>
            {children}
        </div>
    )
}

export default IconButton
