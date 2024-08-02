import React, { HTMLAttributes } from 'react'
import VerifySvg from '/public/svg/verify.svg'
import { AnimatePresence, motion } from "framer-motion"

type Props = HTMLAttributes<HTMLDivElement> & {
    sizeAvatar?: number,
    fullName?: string,
    nameClass?: React.ComponentProps<'div'>['className']
}

function Avatar({ sizeAvatar = 10, fullName = "TV", nameClass }: Props) {
    return (
        <div className='justify-center items-center flex gap-3'>
            <motion.div
                whileHover={{
                    scale: 1.1
                }}
                className="avatar online cursor-pointer">
                <div className={`rounded-full ring-2 ring-offset-2 ring-offset-base-100 w-${sizeAvatar}`}>
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </motion.div>
            <span className={`font-bold ${nameClass}`}>{fullName}</span>
            <motion.div
                whileHover={
                    { scale: 1.1 }
                }
                className="tooltip text-left" data-tip="Các tài khoản có huy hiệu đã xác minh đều đã được xác thực và có thể là người đăng ký dịch vụ FaceIO đã xác minh hoặc cá nhân/thương hiệu nổi tiếng.">
                <VerifySvg className="fill-primary" />
            </motion.div>
        </div>
    )
}

export default Avatar
