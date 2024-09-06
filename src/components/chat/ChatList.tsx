import React, { HTMLAttributes, useEffect, useId, useState } from 'react'
import { motion } from "framer-motion"
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions } from '@/redux/slice/dataProviderSlice'
import { and, collection, getDocs, limit, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/setup'
import { message } from '@/types/message'
import moment from 'moment'
import 'moment/locale/vi';
import { user } from '@/types/user'
import clsx from 'clsx'

type Props = HTMLAttributes<HTMLDivElement> & {
    refChat?: React.MutableRefObject<HTMLDivElement | null>
}

function ChatList({ className, refChat }: Props) {
    const { addNewChat, removeChat } = dataProviderActions
    const dispatch = useDispatch()
    const messages: message[] = useSelector((state: any) => state.dataProvider.value.messages)

    const handleNewChat = (idUser: string) => {
        dispatch(addNewChat({ idUser }))
    }

    return (
        <div ref={refChat} className={`${className}`}>
            <ul className="list">
                {messages.map((message) => (
                    <motion.li
                        layoutId={`chat-${message.id}`}
                        className="relative flex items-center gap-4 p-4 border-b border-base-100"
                        key={message.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNewChat(message.user_receive)}
                    >
                        <Avatar sizeAvatar={8} user={message.user} subtitleStyle={clsx({
                            'opacity-65 font-normal': message.seenUserId?.includes(auth.currentUser?.uid || '')
                        })} subtitle={message.message} time={moment(message.createdAt).locale('vi').fromNow()} />
                    </motion.li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
