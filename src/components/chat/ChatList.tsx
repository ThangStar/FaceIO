import React, { HTMLAttributes, useEffect, useId, useState } from 'react'
import { motion } from "framer-motion"
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions, messageActions } from '@/redux/slice/dataProviderSlice'
import { and, collection, getDocs, limit, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/setup'
import { message } from '@/types/message'
import moment from 'moment'
import 'moment/locale/vi';
import { user } from '@/types/user'
import clsx from 'clsx'

type Props = HTMLAttributes<HTMLDivElement> & {
    refChat?: React.MutableRefObject<HTMLUListElement | null>,
    setVisibleChatList: React.Dispatch<React.SetStateAction<boolean>>
}

function ChatList({ className, setVisibleChatList, refChat }: Props) {
    const { addNewChat, removeChat } = dataProviderActions
    const dispatch = useDispatch<any>()
    const messages: message[] = useSelector((state: any) => state.dataProvider.value.messages)

    const handleNewChat = (idUser: string, idMessageNew: string) => {
        setVisibleChatList(false)
        dispatch(addNewChat({ idUser }))
        idMessageNew && dispatch(messageActions.seen(idMessageNew))
    }

    const [tabChatSelected, setTabChatSelected] = useState(1)
    const [isLoadingNoti, setIsLoadingNoti] = useState(false)

    return (
        <div className={`${className}`}>
            <div className='bg-base-100 shadow-base-300 px-4 border-b border-base-100 shadow-2xl'>
                <h3 className='text-left text-2xl py-3 text-base-content'>Tin nhắn</h3>
                <div role="tablist" className="tabs gap-x-1 tabs-boxed w-fit bg-base-100 border border-[#ffffff20] mb-2">
                    <button onClick={() => setTabChatSelected(1)} role="tab" className={`tab font-bold transition-colors ${clsx({ 'tab-active': tabChatSelected === 1 })}`}>Hộp thư</button>
                    <button onClick={() => setTabChatSelected(2)} role="tab" className={`tab font-bold relative transition-colors ${clsx({ 'tab-active': tabChatSelected === 2 })}`}>Cộng đồng
                        <span className="badge top-0 absolute right-0 badge-secondary badge-xs"></span>
                    </button>

                </div>
            </div>
            {tabChatSelected == 1 &&
                <ul className="list" >
                    {messages.map((message) => (
                        <motion.li
                            layoutId={`chat-${message.id}`}
                            className="relative flex text-base-content items-center gap-4 p-4 border-b border-base-100 cursor-pointer"
                            key={message.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleNewChat(message.user_receive !== auth.currentUser?.uid ? message.user_receive : message.user_send, message.id || '')}
                        >
                            <Avatar sizeAvatar={8} user={message.user} subtitleStyle={clsx([
                                message.seenUserId?.includes(auth.currentUser?.uid || '') ? 'opacity-65 font-normal' : 'font-bold'
                            ])} subtitle={message.message} time={moment(message.createdAt).locale('vi').fromNow()} />
                        </motion.li>
                    ))}
                </ul>
            }
            {tabChatSelected == 2 && <div className="flex w-full p-3 flex-col opacity-45  gap-4">
                <div className="skeleton bg-base-content h-4 w-28"></div>
                <div className="skeleton bg-base-content h-4 w-full"></div>
                <div className="skeleton bg-base-content h-4 w-full"></div>
            </div>}
        </div>
    )
}

export default ChatList
