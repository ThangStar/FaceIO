import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseSvg from '/public/svg/close.svg'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions } from '@/redux/slice/dataProviderSlice'
import SendSvg from '/public/svg/send.svg'
import ImageSvg from '/public/svg/image.svg'
import useSound from 'use-sound';
import clsx from 'clsx'
import Image from 'next/image'
import { ModalContext } from '@/context/ModalContext'
import ModalImage from '../modal/ModalImage'
import Avatar from '../avatar/Avatar'
import { user } from '@/types/user'
import { and, collection, getDoc, getDocs, limit, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/setup'
import { message } from '@/types/message'

type Props = {
    index: number,
    userId: string
}
function ChatBubbleItem({ index, userId }: Props) {
    // const { dProvider: { chats }, setDprovider } = useDataProvider()
    const rightPos = useRef(24)
    const dispatch = useDispatch()

    const { addNewChat, removeChat, addNewMessage } = dataProviderActions
    const handleCloseBubble = (idUser: string) => {
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
    const [play] = useSound('/audio/pop.mp3');

    const handlePlaySound = () => {
        play()
    }
    const [files, setFiles] = useState<File[]>()
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (message || files) {
            const ran = Math.random()
            dispatch(addNewMessage({
                message: {
                    message: message, user_send: auth.currentUser?.uid || '', user_receive: userId, images: [], imagesFile: files
                }
            }))
            setMessage('')
            handlePlaySound()
            handleRemoveFile(undefined, true)
            refScrollChat.current?.scrollTo(0, refScrollChat.current.scrollHeight)
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
    const refContainer = useRef<HTMLDivElement | null>(null)
    const [widthContainer, setWidthContainer] = useState(490)
    const [user, setUser] = useState<user>()



    const [messages, setMessages] = useState<message[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userId));
            const snapshot = await getDocs(q);
            snapshot.empty || setUser(snapshot.docs[0].data() as user)
        }

        const q = query(collection(db, "messages"),
            or(and(where('user_send', '==', auth.currentUser?.uid), where('user_receive', '==', userId)),
                and(where('user_send', '==', userId), where('user_receive', '==', auth.currentUser?.uid))
            ),
            orderBy('createdAt', 'desc'), limit(20)
        )

        const onSnapshotMessages = () => onSnapshot(q, (snapshot) => {
            setMessages([])
            console.log(snapshot.docs.length);

            snapshot.docs.map((doc) => {
                setMessages(snapshot.docs.map(doc => doc.data() as message))
            })
        })
        fetchUser()
        onSnapshotMessages()

        return () => {
        }
    }, [userId])

    useEffect(() => {
        if (refContainer.current) {
            const width = refContainer.current.clientWidth + 8;
            setWidthContainer(width);
        }

    }, [refContainer])
    return (
        <motion.div
            ref={refContainer}
            key={index}
            exit={{ opacity: 0, translateY: 200 }}
            transition={{ type: "spring" }}
            animate={{ opacity: 1, translateX: (rightPos.current - (index * widthContainer)) }}
            className="card rounded-md z-20 glass sm:w-1/3 xl:w-1/4 h-4/5 md:h-3/5 fixed translate-x-6 opacity-0 bottom-3 right-14 pt-3 pb-3">
            <div className='card-title px-4 border-base-100  shadow-md pb-2 '>
                <Avatar sizeAvatar={8} nameClass='text-lg' user={user} />
            </div>
            <button onClick={() => handleCloseBubble(userId)} className='absolute right-0 top-0 btn-circle btn bg-transparent border-none shadow-none'>
                <CloseSvg className='' />
            </button>

            <div className=" h-full py-3 mb-1 overflow-y-auto scroll-smooth flex flex-col-reverse mx-4 " ref={refScrollChat}>

                <AnimatePresence mode='sync'>

                    {messages.map((message, index) => {
                        const isMe = message.user_send === auth.currentUser?.uid
                        return (
                            <motion.div
                                exit={{ opacity: 0, translateY: 200 }}
                                initial={{ opacity: 0.3, translateY: 30 }}
                                animate={{ opacity: 1, translateY: 0, transition: { duration: 0.6, type: 'spring' } }}
                                key={index} className={`chat chat-start ${clsx({ 'chat-end': isMe })}`}>
                                <div className="chat-header">
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble p-3 rounded-md max-w-1/2 text-sm">{message.message}
                                    {message.images?.map((url, index) => {
                                        const img = `https://firebasestorage.googleapis.com/v0/b/chat-app-9dedc.appspot.com/o/images%2Fchats%2F${url}.jpg?alt=media`
                                        return (
                                            <div key={index} className='relative' onClick={() => imagePreview(img)}>
                                                <Image width={0} className='mt-2 rounded size-full' sizes='1' height={0} src={img} alt="" />
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
                                    <img width={46} height={46} className='mx-4 bg-red-50 h-[46px] w-[46px] object-cover' src={URL.createObjectURL(file)} alt="" />
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
                dataProvider.users.map((userId, index) => {
                    return (
                        <ChatBubbleItem userId={userId} key={index} index={index} />
                    )
                })
            }

        </AnimatePresence>

    )
}

export default ChatBubble
