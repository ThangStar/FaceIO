import React, { useRef, useState } from 'react'
import Avatar from './Avatar'
import CloseSvg from '/public/svg/close.svg'
import IconButton from './button/IconButton'
import { AnimatePresence, motion } from "framer-motion"
import useDataProvider, { dataProvider } from '@/hooks/useDataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions } from '@/redux/dataProviderSlice'
import SendSvg from '/public/svg/send.svg'
import useSound from 'use-sound';
function ChatBubble() {
    // const { dProvider: { chats }, setDprovider } = useDataProvider()
    const rightPos = useRef(24)
    const dispatch = useDispatch()

    const dataProvider: DataProvider = useSelector((state: any) => state.dataProvider.value)
    const { addNewChat, removeChat, addNewMessage } = dataProviderActions
    const handleCloseBubble = (idUser: number) => {
        // setDprovider({ chats: [...chats.filter((chat) => chat.id !== idUser)] })
        dispatch(removeChat({ id: idUser }))
    }
    const refScrollChat = useRef<HTMLDivElement | null>(null)
    // React.useEffect(() => {
    //     if (refScrollChat.current) {
    //         refScrollChat.current.scrollTop = refScrollChat.current.scrollHeight;
    //         refScrollChat.current.scrollTop = refScrollChat.current.scrollHeight
    //     }
    //     return () => {
    //     };
    // }, [refScrollChat]);
    const [message, setMessage] = useState('')
    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }
	const [play] = useSound('https://cdn.pixabay.com/audio/2022/03/10/audio_dbb9bd8504.mp3');
    
    const handlePlaySound = () => {
        play()
    }
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (message) {
            const ran = Math.random()
            dispatch(addNewMessage({
                message: {
                    id: ran, message, time: 'now', id_user_send: ran, id_user_receive: ran
                }, userId: 1
            }))
            setMessage('')
            handlePlaySound()
        }
    }
    return (
        <AnimatePresence mode='sync'>
            {
                dataProvider.chats.map((chat, index) => {
                    return (
                        <motion.div
                            key={chat.id}
                            exit={{ opacity: 0, translateY: 200 }}
                            transition={{ type: "spring" }}
                            animate={{ opacity: 1, translateX: (rightPos.current - (index * 350)) }}
                            className="card rounded-md z-20 glass w-1/4 h-2/3 fixed translate-x-6 opacity-0 bottom-3 right-14 px-6 py-4">
                            <div className='card-title'>
                                <Avatar fullName={chat.username} size={8} />
                            </div>
                            <button onClick={() => handleCloseBubble(chat.id)} className='absolute right-0 top-0 btn-circle btn bg-transparent border-none shadow-none'>
                                <CloseSvg className='' />
                            </button>
                            <div className="px-0 h-full py-3 mb-1 overflow-y-auto scroll-smooth flex flex-col-reverse" ref={refScrollChat}>
                                <AnimatePresence mode='sync'>
                                    {chat.messages?.map((message, index) => {
                                        return (
                                            <motion.div
                                                exit={{ opacity: 0, translateY: 200 }}
                                                initial={{ opacity: 0.3, translateY: 30 }}
                                                animate={{ opacity: 1, translateY: 0, transition: { duration: 0.6, type: 'spring' } }}
                                                key={message.id} className="chat chat-start">
                                                <div className="chat-header">
                                                    Obi-Wan Kenobi
                                                    <time className="text-xs opacity-50">2 hours ago</time>
                                                </div>
                                                <div className="chat-bubble">{message.message}</div>
                                                <div className="chat-footer opacity-50">Seen</div>
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>
                            <form onSubmit={handleSendMessage} className='flex gap-x-2'>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full" value={message} onChange={handleChangeMessage} />
                                <button className="btn btn-primary btn-square" onClick={handleSendMessage}>
                                    <SendSvg className="fill-primary-content" />
                                </button>
                            </form>
                        </motion.div>
                    )
                })
            }

        </AnimatePresence>

    )
}

export default ChatBubble
