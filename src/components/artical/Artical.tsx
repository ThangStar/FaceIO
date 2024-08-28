"use client"
import React, { useContext, useId, useRef, useState } from 'react'
import Avatar from '../avatar/Avatar'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import HeartSvg from '/public/svg/heart.svg';
import HeartAnim from '/public/anim/heart.json';
import IconButton from '../button/IconButton';
import Lottie from 'lottie-react';
import AvatarGroup from '../avatar/AvatarGroup';
import { AnimatePresence, motion } from "framer-motion"
import ModalImage from '../modal/ModalImage';
import { ModalContext } from '@/context/ModalContext';
import Modal from '../modal/Modal';
import DotsHorizontal from '/public/svg/dots_horizontal.svg';
import Image from 'next/image';


function Artical() {
    const { childrenModal, changeChildrenModal } = useContext<any>(ModalContext)
    const [urlSelected, setUrlSelected] = useState<string>('')
    const showModalImage = (url: string) => {
        setUrlSelected(url)
    }
    const idModalArtical = `#${useId()}`

    return (
        <motion.div
            className="artboard artboard-horizontal bg-base-100 phone-6 !h-auto rounded my-8">
            <Modal id={idModalArtical}>
                <ModalImage url={urlSelected} />
            </Modal>
            <div className="flex flex-col md:flex-row ">
                {/* <Avatar /> */}
                <div className="flex-1 ">
                    <div className="flex items-center justify-between p-4">
                        <Avatar time='4 ngày trước' />
                        <div className="flex items-center">
                            <IconButton className='border-none'><DotsHorizontal className="fill-base-content" /></IconButton>
                        </div>
                    </div>
                    <div className="divider divider-start my-0 w-full"></div>
                    <div className=''>
                        <figure className="w-full mt-4">
                            <a
                                href={idModalArtical}
                                onClick={() => showModalImage('https://picsum.photos/500/300')}>
                                <Image
                                    width={500}
                                    height={500}
                                    src="https://picsum.photos/500/300" alt="Post image"
                                    className=" w-full max-h-96 cursor-pointer" />
                            </a>
                        </figure>
                        <div className="p-4">
                            <p className="text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc et libero suscipit, vitae euismod orci tincidunt. Sed nec nunc lobortis, ultrices purus in, euismod nunc. Maecenas euismod, dui in aliquam venenatis, lectus nisi fermentum tellus, vel vulputate nulla felis non risus. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. </p>
                            <div className="flex items-center justify-between mt-4">
                                <div className='flex gap-4'>
                                    <button className="btn">
                                        <HeartSvg className="fill-base-content" />
                                        Button
                                    </button>

                                    <button className="btn">
                                        <ChatSvg className="fill-base-content" />
                                        Button
                                    </button>
                                </div>
                                <AvatarGroup />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default Artical
