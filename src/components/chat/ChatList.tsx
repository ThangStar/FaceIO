import React, { HTMLAttributes, useId } from 'react'
import { motion } from "framer-motion"
import Avatar from '../avatar/Avatar'
import useDataProvider from '@/hooks/useDataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { DataProvider, dataProviderActions } from '@/redux/dataProviderSlice'
type Props = HTMLAttributes<HTMLDivElement> & {

}

function ChatList({ className }: Props) {
    const { dProvider: { chats }, setDprovider } = useDataProvider()
    const { addNewChat, removeChat } = dataProviderActions
    const dispatch = useDispatch()
    const dataProvider: DataProvider = useSelector((state: any) => state.dataProvider.value)

    const handleNewChat = () => {
        const ran = Math.random()
        dispatch(addNewChat({
            ...dataProvider, id: ran, username: `${ran}`, messages: [
                {
                    id: ran,
                    message: 'Welcome',
                    time: 'now',
                    id_user_send: ran,
                    id_user_receive: ran
                }
            ]
        }))
    }
    return (
        <a className={`${className}`} onClick={handleNewChat}>
            <ul className="list">
                {[1, 2, 3, 4, 5].map((item) => (
                    <motion.li
                        layoutId={`chat-${item}`}
                        className="relative flex items-center gap-4 p-4 border-b border-base-100"
                        key={item}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex flex-col space-y-3">
                            <div className='flex'>
                                <Avatar sizeAvatar={8} />
                            </div>
                            <div className="text-base-content truncate">
                                <span className=' font-normal'>
                                    <span className='pr-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                                    <span>Vừa xong</span>
                                </span>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </a>
    )
}

export default ChatList
