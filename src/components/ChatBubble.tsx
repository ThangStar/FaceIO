import React, { useContext, useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import CloseSvg from '/public/svg/close.svg'
import IconButton from './button/IconButton'
import { AnimatePresence, motion } from "framer-motion"
import useDataProvider, { dataProvider } from '@/hooks/useDataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions } from '@/redux/dataProviderSlice'
import SendSvg from '/public/svg/send.svg'
import ImageSvg from '/public/svg/image.svg'
import useSound from 'use-sound';
import clsx from 'clsx'
import Image from 'next/image'
import Modal from './modal/modal'
import { ModalContext } from '@/context/ModalContext'
import ModalImage from './modal/ModalImage'

type Props = {
    chat: user,
    index: number
}
function ChatBubbleItem({ chat, index }: Props) {
    // const { dProvider: { chats }, setDprovider } = useDataProvider()
    const rightPos = useRef(24)
    const dispatch = useDispatch()

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
    const [files, setFiles] = useState<File[]>()
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (message || files) {
            const ran = Math.random()
            let arrStrImage: string[] = []
            if (files) {
                arrStrImage = files.map((file) => URL.createObjectURL(file))
            }
            dispatch(addNewMessage({
                message: {
                    id: ran, message, time: 'now', id_user_send: 1, id_user_receive: 2, image: arrStrImage
                }, userId: 1
            }))
            setMessage('')
            handlePlaySound()
            handleRemoveFile(undefined, true)
        }
    }

    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const handleRemoveFile = (fileName?: string, removeAll: boolean = false) => {
        if (removeAll) {
            setFiles([])
        } else {
            const newFiles: File[] = Array.from(files || []).filter((file) => file.name !== fileName)
            setFiles(newFiles)
        }
    }

    const { childrenModal, changeChildrenModal } = useContext<any>(ModalContext)

    const imagePreview = (url: string) => {
        changeChildrenModal(<ModalImage url={url} />);
        (document.getElementById('modal-show') as any).showModal()
    }
    return (
        <motion.div
            key={chat.id}
            exit={{ opacity: 0, translateY: 200 }}
            transition={{ type: "spring" }}
            animate={{ opacity: 1, translateX: (rightPos.current - (index * 490)) }}
            className="card rounded-md z-20 glass w-1/2 sm:w-1/3 xl:w-1/4 h-3/5 fixed translate-x-6 opacity-0 bottom-3 right-14 pt-3 pb-3">
            <div className='card-title  px-4 border-base-100  shadow-md pb-2 '>
                <Avatar fullName={chat.username} sizeAvatar={8} nameClass='text-lg' />
            </div>
            <button onClick={() => handleCloseBubble(chat.id)} className='absolute right-0 top-0 btn-circle btn bg-transparent border-none shadow-none'>
                <CloseSvg className='' />
            </button>


            <div className=" h-full py-3 mb-1 overflow-y-auto scroll-smooth flex flex-col-reverse mx-4 " ref={refScrollChat}>

                <AnimatePresence mode='sync'>
                    {chat.messages?.map((message, index) => {
                        const isMe = message.id_user_send === 1
                        return (
                            <motion.div
                                exit={{ opacity: 0, translateY: 200 }}
                                initial={{ opacity: 0.3, translateY: 30 }}
                                animate={{ opacity: 1, translateY: 0, transition: { duration: 0.6, type: 'spring' } }}
                                key={message.id} className={`chat chat-start ${clsx({ 'chat-end': !isMe })}`}>
                                <div className="chat-header">
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble max-w-1/2 text-sm">{message.message}
                                    {message.image?.map((url, index) => {
                                        return (
                                            <div key={index} className='relative' onClick={() => imagePreview(url)}>
                                                <Image width={0} className='mt-2 rounded size-full' sizes='1' height={0} src={url} alt="" />
                                                <div className='z-20 inset-0 absolute  cursor-pointer transition-colors hover:bg-[#00000030]'>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            <form onSubmit={handleSendMessage} className='relative flex px-4 gap-x-2'>
                <motion.div
                    initial={{ opacity: 0.6, translateY: 30 }}
                    animate={{ opacity: files?.length ? 1 : 0.6, translateY: files?.length ? 0.6 : 30 }}
                    className={`py-2 absolute -top-16 left-4 right-4 flex rounded ${clsx({
                        'bg-[#00000020]': files?.length
                    })}`}>
                    {/* <img className='w-12 mx-4' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" /> */}
                    <AnimatePresence mode='sync'>
                        {files?.map((file, index) => {
                            return (
                                <motion.div
                                    className='opacity-0 translate-x-2 relative'
                                    animate={{ opacity: 1, translateX: 0 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    key={index} >
                                    <Image width={46} height={46} className='mx-4 bg-red-50 h-[46px] w-[46px] object-cover' objectFit='cover' src={URL.createObjectURL(file)} alt="" />
                                    <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        className='absolute -top-2 right-2 cursor-pointer'
                                    >
                                        <CloseSvg className="fill-primary-content bg-neutral size-6 " onClick={() => handleRemoveFile(file.name)} />
                                    </motion.div>
                                </motion.div>
                            )
                        }
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className='input px-0 flex items-center justify-center w-full'>
                    <button className="btn btn-primary hover:bg-base-300 px-3 bg-transparent border-none hover:bg-tranmparent relative">
                        <ImageSvg className="fill-base-content" />
                        <input onChange={onChangeImage} onClick={(e) => e.currentTarget.value = ''} type="file" accept="image/*" multiple className='absolute bg-red-50 inset-0 z-10 opacity-0 cursor-pointer top-0 bottom-0 right-0 w-full h-full' />
                    </button>
                    <input type="text" placeholder="Aa" className=" input-bordered w-full placeholder:text-base-content" value={message} onChange={handleChangeMessage} />
                </div>
                <button className="btn btn-primary btn-square" onClick={handleSendMessage}>
                    <SendSvg className="fill-primary-content" />
                </button>
            </form >
        </motion.div >
    )
}
function ChatBubble() {

    const dataProvider: DataProvider = useSelector((state: any) => state.dataProvider.value)

    return (
        <AnimatePresence mode='sync'>
            {
                dataProvider.chats.map((chat, index) => {
                    return (
                        <ChatBubbleItem chat={chat} key={index} index={index} />
                    )
                })
            }

        </AnimatePresence>

    )
}

export default ChatBubble
