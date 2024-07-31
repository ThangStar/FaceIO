import React, { useRef, useState } from 'react'
import Avatar from './Avatar'
import CloseSvg from '/public/svg//close.svg'
import IconButton from './button/IconButton'
import { motion } from "framer-motion"
import useDataProvider, { dataProvider } from '@/hooks/useDataProvider'

function ChatBubble() {
    const { dProvider: { chats }, setDprovider } = useDataProvider()
    const handleCloseBubble = (idUser: number) => {
        setDprovider(dataProvider => ({ ...dataProvider, chats: [...dataProvider.chats.filter(user => user.id != idUser)] }))
    }
    const rightPos = useRef(24)
    return (
        chats.map((chat, index) => {
            return (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: chat.id == index + 1 ? 1 : 0.6, translateX: chat.id == index + 1 ? (rightPos.current - (index * 408)) : 500, transition: {} }} className="card rounded-md glass w-96 fixed translate-x-6 opacity-0 bottom-6 right-16 px-6 py-4">
                    <div className='card-title'>
                        <Avatar />
                    </div>
                    <button onClick={() => handleCloseBubble(index + 1)} className='absolute right-0 top-0 btn-circle btn bg-transparent border-none shadow-none'>
                        <CloseSvg className='' />
                    </button>
                    <div className="card-body px-0">
                        <div className="chat chat-start">
                            <div className="chat-header">
                                Obi-Wan Kenobi
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">You were the Chosen One!</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-header">
                                Obi-Wan Kenobi
                                <time className="text-xs opacity-50">2 hour ago</time>
                            </div>
                            <div className="chat-bubble">I loved you.</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>

                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </motion.div>
            )
        })
    )
}

export default ChatBubble
