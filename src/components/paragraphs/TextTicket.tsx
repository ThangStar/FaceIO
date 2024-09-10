import React, { HTMLAttributes, LegacyRef, useRef } from 'react'
import { motion } from "framer-motion"

type Props = HTMLAttributes<HTMLDivElement> & {

}
function TextTicket({ className }: Props) {
    const notiRef = useRef<HTMLParagraphElement>(null)
    return (
        <div className={`bg-primary bg-opacity-20 backdrop-blur min-w-max ${className}`}>
            <motion.p
                initial={{ translateX: window.innerWidth }}
                animate={{
                    translateX: [window.innerWidth, notiRef.current?.offsetWidth || -window.innerWidth],
                }}
                transition={{
                    duration: 100,
                    repeat: Infinity,
                }}
                ref={notiRef}
                className='text-base-content break-words'><span className='font-bold text-secondary'>Thông báo từ admin: {" "}</span>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, facilis. Optio, iusto quasi error id iste suscipit dolorum fugit enim, nostrum voluptas ut iure laborum cumque sapiente qui placeat asperiores.</motion.p>
        </div>
    )
}

export default TextTicket
