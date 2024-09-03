import React, { HTMLAttributes, useEffect, useState } from 'react'
import VerifySvg from '/public/svg/verify.svg'
import { AnimatePresence, motion } from "framer-motion"
import { app, auth, } from '@/firebase/setup'
import Image from 'next/image'
import { user } from '@/types/user'
import { userAuthToUserDb } from '@/firebase/utils'
import { getAuth } from 'firebase/auth'

type Props = HTMLAttributes<HTMLDivElement> & {
    sizeAvatar?: number,
    fullName?: string,
    nameClass?: React.ComponentProps<'div'>['className'],
    containerTextStyle?: React.ComponentProps<'div'>['className'],
    time?: string,
    user?: user,
    subtitle?: string
}

function Avatar({ sizeAvatar = 10, user: usr, subtitle, nameClass, containerTextStyle, time }: Props) {
    const [user, setUser] = useState<user>()
    useEffect(() => {
        if (!usr) {
            setUser(userAuthToUserDb(auth.currentUser))
        } else {
            setUser(usr)
        }
        return () => {
        }
    }, [auth.currentUser])
    return (
        <div className='justify-center items-center flex gap-3 relative'>
            <motion.div
                whileHover={{
                    scale: 1.1
                }}
                className="avatar online cursor-pointer">
                <div className={`rounded-full ring-2 ring-offset-2 ring-offset-base-100 w-${sizeAvatar}`}>
                    <Image placeholder='empty' width={80} height={80} alt='avatar' src={user?.photoURL || 'https://picsum.photos/200'} />

                </div>
            </motion.div>
            <div className=''>
                <div className={`items-center flex gap-1 ${containerTextStyle}`}>
                    <p className={`font-bold truncate ${nameClass}`}>{user?.displayName}</p>

                    <motion.div
                        whileHover={
                            { scale: 1.1 }
                        }
                        className="tooltip text-left" data-tip="Các tài khoản có huy hiệu đã xác minh đều đã được xác thực và có thể là người đăng ký dịch vụ FaceIO đã xác minh hoặc cá nhân/thương hiệu nổi tiếng.">
                        <VerifySvg className="fill-primary scale-75" />
                    </motion.div>
                </div>
                <div className='flex'>
                    {subtitle && <span className='mr-3'> {subtitle}</span>}
                    {time && <span className='text-left opacity-65'>{time}</span>}
                </div>
            </div>
        </div >
    )
}

export default Avatar
