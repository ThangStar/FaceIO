import React, { HTMLAttributes } from 'react'
import { motion } from "framer-motion"
import { notification } from '@/types/notification'
import NotificationOffSvg from '/public/svg/notification_off.svg'

type Props = HTMLAttributes<HTMLDivElement> & {
    refNoti?: React.MutableRefObject<HTMLDivElement | null>,
    notifications?: notification[],
}

function NotiList({ refNoti, className, notifications }: Props) {
    return (
        <div ref={refNoti} className={`${className}`}>
             <div className='bg-base-100 shadow-base-300 px-4 border-b border-base-100 shadow-2xl'>
                <h3 className='text-left text-2xl py-3 text-base-content'>Thông báo</h3>
            </div>
            <ul className="list">
                {notifications?.map((message) => (
                    <motion.li
                        layoutId={`chat-${message.id}`}
                        className="relative flex items-center gap-4 p-4 border-b border-base-100"
                        key={message.id}
                        whileHover={{ scale: 1.02 }}
                    // onClick={() => handleNewChat(message.user_receive)}
                    >
                        {/* <Avatar sizeAvatar={8} user={message.user} subtitleStyle={clsx({
                            'opacity-65 font-normal': message.seenUserId?.includes(auth.currentUser?.uid || '')
                        })} subtitle={message.message} time={moment(message.createdAt).locale('vi').fromNow()} /> */}

                    </motion.li>
                ))}
                {!notifications &&
                    <div className='translate-y-1/2 opacity-45'>
                        <NotificationOffSvg className="fill-base-content mx-auto size-40" />
                        <h3>Không có thông báo nào..</h3>
                    </div>
                }
            </ul>
        </div>
    )
}

export default NotiList
