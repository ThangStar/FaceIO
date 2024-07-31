import React, { HTMLAttributes } from 'react'
import ChatSvg from '/public/svg/chat.svg';
type Props = HTMLAttributes<HTMLDivElement> & {
    children: any
}
function IconButton({ children, className, onClick }: Props) {
    return (
        <div onClick={onClick} className={`btn btn-circle bg-base-100 mx-0.5 ${className}`}>
            {children}
        </div>
    )
}

export default IconButton
