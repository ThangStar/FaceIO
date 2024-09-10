import React, { useState } from 'react'
import { motion } from "framer-motion";
import { getInStorage } from '@/utils/utils';
import { usePathname } from 'next/navigation';
import { repeat } from 'lodash';
const icon = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(255, 255, 255, 1)",
    }
};

type Props = {
    label?: string
}
function LogoProgress({ label = 'FaceIO.com' }: Props) {
    return (
        <>
            <div>
                <motion.div
                    className='fixed mx-auto self-center inset-0 w-fit justify-center items-center z-[999] bg-base-100'>
                    <div className="h-60 w-60 mx-auto flex justify-center items-center bg-[#ffffff10] p-8 rounded-full">
                        <motion.svg xmlns="http://www.w3.org/2000/svg"
                            className="item-icon size-52"
                            viewBox="0 0 24 24">
                            <motion.path
                                variants={icon}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    default: { duration: 1, ease: "easeInOut" },
                                    fill: { duration: 1,repeat: Infinity, ease: [1, 0, 0.8, 1] },
                                }}
                                d={`M12 22c3.719 0 7.063-2.035 8.809-5.314L13 13l7.809-4.686C19.063 4.035 15.719 2 12 2 6.486 2 2 6.486 2 12s4.486 10 10 10zm-.5-16a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 11.5 6z`}>
                            </motion.path>
                        </motion.svg>
                    </div>

                    <motion.h3
                        className='mt-3'
                    >{label}</motion.h3>
                </motion.div>
            </div>
        </>
    )
}

export default LogoProgress
