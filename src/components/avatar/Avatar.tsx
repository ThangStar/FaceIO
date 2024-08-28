import React, { HTMLAttributes } from 'react'
import VerifySvg from '/public/svg/verify.svg'
import { AnimatePresence, motion } from "framer-motion"
import { auth } from '@/firebase/setup'
import Image from 'next/image'

type Props = HTMLAttributes<HTMLDivElement> & {
    sizeAvatar?: number,
    fullName?: string,
    nameClass?: React.ComponentProps<'div'>['className'],
    containerTextStyle?: React.ComponentProps<'div'>['className'],
    time?: string
}

function Avatar({ sizeAvatar = 10, fullName = "TV", nameClass, containerTextStyle, time }: Props) {
    const currentUser = auth.currentUser
    return (
        <div className='justify-center items-center flex gap-3'>
            <motion.div
                whileHover={{
                    scale: 1.1
                }}
                className="avatar online cursor-pointer">
                <div className={`rounded-full ring-2 ring-offset-2 ring-offset-base-100 w-${sizeAvatar}`}>
                    <Image width={80} height={80} alt='avatar' src={currentUser?.photoURL || ''} />
                </div>
            </motion.div>
            <div className=''>
                <div className={`items-center flex gap-1 ${containerTextStyle}`}>
                    <p className={`font-bold truncate ${nameClass}`}>{currentUser?.displayName}</p>

                    <motion.div
                        whileHover={
                            { scale: 1.1 }
                        }
                        className="tooltip text-left" data-tip="Các tài khoản có huy hiệu đã xác minh đều đã được xác thực và có thể là người đăng ký dịch vụ FaceIO đã xác minh hoặc cá nhân/thương hiệu nổi tiếng.">
                        <VerifySvg className="fill-primary" />
                    </motion.div>
                </div>
                {time && <p className='text-left opacity-65'>{time}</p>}
            </div>
        </div>
    )
}

export default Avatar
