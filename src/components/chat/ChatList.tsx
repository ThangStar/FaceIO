import React, { HTMLAttributes, useEffect, useId, useState } from 'react'
import { motion } from "framer-motion"
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions } from '@/redux/slice/dataProviderSlice'
import { collection, limit, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/setup'
import { message } from '@/types/message'
import moment from 'moment'
import 'moment/locale/vi';

type Props = HTMLAttributes<HTMLDivElement> & {

}

function ChatList({ className }: Props) {
    const { addNewChat, removeChat } = dataProviderActions
    const dispatch = useDispatch()
    const dataProvider: DataProvider = useSelector((state: any) => state.dataProvider.value)

    const handleNewChat = (idUser: string) => {
        dispatch(addNewChat({idUser}))
    }
    const [messages, setMessages] = useState<message[]>([])
    useEffect(() => {
        onSnapshot(query(
            collection(db, "messages"), or(where('user_send', '==', '2ia9LovcgFg6cKboSH83HdpzesC2'), where('user_receive', '==', auth.currentUser?.uid)),
            limit(10), orderBy('createdAt', 'desc'),
        ), (doc) => {
            setMessages(doc.docs.map((item) => {
                return { ...item.data() as message, id: item.id }
            }));
            console.log(doc.docs.map((item) => item.data() as message));
        });
        return () => {
        }
    }, [])
    return (
        <div className={`${className}`}>
            <ul className="list">
                {messages.map((message) => (
                    <motion.li
                        layoutId={`chat-${message.id}`}
                        className="relative flex items-center gap-4 p-4 border-b border-base-100"
                        key={message.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNewChat(message.user_receive)}
                    >
                        <Avatar sizeAvatar={8} subtitle={message.message} time={moment(message.createdAt).locale('vi').fromNow()} />
                    </motion.li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
