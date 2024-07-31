import React, { HTMLAttributes } from 'react'
import { motion } from "framer-motion"
import Avatar from '../Avatar'

type Props = HTMLAttributes<HTMLDivElement> & {

}

function ChatList({ className }: Props) {
    return (
        <div className={`${className}`}>
            <ul className="list">
                {[1, 2, 3, 4, 5].map((item) => (
                    <motion.li
                        layoutId={`chat-${item}`}
                        className="card relative flex items-center gap-4 p-4"
                        key={item}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Avatar />
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-semibold">User {item}</div>
                            <div className="text-sm text-muted-foreground">
                                1 hour ago
                            </div>
                            <div className="text-sm truncate">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
