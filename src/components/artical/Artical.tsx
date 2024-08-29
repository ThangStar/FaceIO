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
import { post } from '@/types/post';

type Props = {
    post: post
}

function Artical({ post }: Props) {
    const { childrenModal, changeChildrenModal } = useContext<any>(ModalContext)
    const [urlSelected, setUrlSelected] = useState<string>('')
    const showModalImage = (url: string) => {
        setUrlSelected(url)
    }
    const idModalArtical = `#${useId()}`

    return (
        <motion.div
            className="artboard artboard-horizontal bg-base-100 !h-auto rounded my-4">
            <Modal id={idModalArtical} className='overflow-hidden bg-[#00000096]'>
                <ModalImage url={urlSelected} />
            </Modal>
            <div className="flex flex-col md:flex-row ">
                <div className="flex-1 ">
                    <div className="flex items-center justify-between p-4">
                        <Avatar time='4 ngày trước' />
                        <div className="flex items-center">
                            <IconButton className='border-none'><DotsHorizontal className="fill-base-content" /></IconButton>
                        </div>
                    </div>
                    <div className="divider divider-start my-0 w-full"></div>

                    <div className=''>
                        <p className="text-base-content px-4 py-4">{post.body}</p>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-wrap bg-[#00000020]'>
                            {post.images && post.images?.split(',').map((image, index) => {
                                const urlTransform = `https://firebasestorage.googleapis.com/v0/b/chat-app-9dedc.appspot.com/o/images%2F${image}.jpg?alt=media`
                                return <figure key={index} className="w-fit">
                                    <a
                                        href={idModalArtical}
                                        onClick={() => showModalImage(urlTransform)}>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={urlTransform} alt="Post image"
                                            className="w-52 h-52 cursor-pointer object-cover" />
                                    </a>
                                </figure>;
                            }
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mt-4">
                                <div className='flex gap-4'>
                                    <button className="btn">
                                        <HeartSvg className="fill-base-content" />
                                        Thích
                                    </button>

                                    <button className="btn">
                                        <ChatSvg className="fill-base-content" />
                                        Bình luận
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
