import React, { HTMLAttributes, useEffect, useId, useRef, useState } from 'react'
import { and, collection, getDocs, limit, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/setup'
import moment from 'moment'
import 'moment/locale/vi';
import clsx from 'clsx'
import { message } from '@/types/message';
import { user } from '@/types/user';
import { useDispatch, useSelector } from 'react-redux';
import { DataProvider, dataProviderActions } from '@/redux/slice/dataProviderSlice';
import useSound from 'use-sound';

function ObserveMessageProvider({ children }: any) {
    const dispatch = useDispatch()
    const { setMessages } = dataProviderActions
    const [isLoading, setIsLoading] = useState(true)
    const [play] = useSound('/audio/notification.mp3');
    const [isObserve, setIsObserve] = useState(false)
    const [isNewMessage, setIsNewMessage] = useState(false)
    const cle = useRef(false)
    useEffect(() => {
        const fetchData = async () => {
            console.log('getting message...');
            onSnapshot(query(
                collection(db, "messages"),
                or(
                    where('user_send', '==', auth.currentUser?.uid), where('user_receive', '==', auth.currentUser?.uid)
                ),
                limit(100), orderBy('createdAt', 'desc'),
            ), async (doc) => {
                console.log('detected new message...');
                cle.current = true
                const users: string[] = []
                let msgs: message[] = []
                doc.docs.forEach((item) => {
                    const m = item.data() as message;
                    const notMe = m.user_send != auth.currentUser?.uid ? m.user_send : m.user_receive
                    if (!users.includes(notMe)) {
                        users.push(notMe)
                        msgs.push({ ...m, id: item.id })
                    }
                })
                const usrs = await fetchUser(users)
                const newMsgs = msgs.map((msg) => {
                    return { ...msg, user: usrs.find(user => user.uid === (msg.user_send == auth.currentUser?.uid ? msg.user_receive : msg.user_send)) }
                })
                // dispatch newMsgs here
                dispatch(setMessages({
                    messages: newMsgs
                }))

            }, (error) => {
                console.log("error", error);
                setIsLoading(false)
            }, () => {
                console.log('getted message completed...');
                setIsObserve(true)
                setIsLoading(false)
            });
        }

        const fetchUser = async (users: string[]): Promise<user[]> => {
            const q = query(collection(db, "users"), where("uid", "in", users));
            const snapshot = await getDocs(q);
            return snapshot.empty ? [] : snapshot.docs.map(doc => doc.data() as user)
        }
        (auth.currentUser && !isObserve) && fetchData()
        return () => {
        }
    }, [])

    const dataProvider: DataProvider = useSelector((state: any) => state.dataProvider.value)

    function handlePlaySfx(event: any): void {
        let a = true
        const inv = setInterval(() => {
            if (cle.current) {
                play()
                cle.current = false
            }
        }, 1000);
    }
    return (
        <div className='mt-24' onClick={handlePlaySfx} >
            {children}
        </div>
    )
}

export default ObserveMessageProvider
