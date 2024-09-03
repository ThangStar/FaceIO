"use client"
import React, { useContext, useEffect, useId, useRef, useState } from 'react'
import Avatar from '../avatar/Avatar'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import HeartSvg from '/public/svg/heart.svg';
import FaceHeart from '/public/svg/face_heart.svg';
import EditSvg from '/public/svg/edit.svg';
import HeartAnim from '/public/anim/heart.json';
import IconButton from '../button/IconButton';
import Lottie from 'lottie-react';
import AvatarGroup from '../avatar/AvatarGroup';
import { AnimatePresence, motion } from "framer-motion"
import ModalImage from '../modal/ModalImage';
import { ModalContext } from '@/context/ModalContext';
import Modal from '../modal/Modal';
import DotsHorizontal from '/public/svg/dots_horizontal.svg';
import ReportSvg from '/public/svg/report.svg';
import TrashSvg from '/public/svg/trash.svg';
import Image from 'next/image';
import { post } from '@/types/post';
import clsx from 'clsx';
import { auth } from '@/firebase/setup';
import { useDispatch } from 'react-redux';
import { postAction } from '@/redux/slice/postSlice';
import moment from 'moment';
import 'moment/locale/vi';
import Comment from '../comment/comment';
type Props = {
    post: post,
}

function Artical({ post }: Props) {
    const { childrenModal, changeChildrenModal } = useContext<any>(ModalContext)
    const [urlSelected, setUrlSelected] = useState<string>('')
    const showModalImage = (url: string) => {
        setUrlSelected(url)
    }
    const idModalArtical = `#${useId()}`
    const [liked, setLiked] = useState(false)
    const dispatch = useDispatch<any>()
    const onChangeLiked = () => {
        liked ? dispatch(postAction.unLike(post.id)) : dispatch(postAction.like(post.id))
    }
    useEffect(() => {
        setLiked(post.likes && post.likes?.indexOf(auth.currentUser?.uid || '') > -1 || false)
        return () => {
        }
    }, [post])

    const [toggleMore, setToggleMore] = useState(false)
    function handleEdit(id: string): void {
        alert(id)
    }
    const [toggleComment, setToggleComment] = useState(false)
    return (
        <motion.div
            className="artboard artboard-horizontal bg-base-100 !h-auto rounded my-4">
            <Modal id={idModalArtical} className='overflow-hidden bg-[#00000096]'>
                <ModalImage url={urlSelected} />
            </Modal>
            <div className="flex flex-col md:flex-row ">
                <div className="flex-1 ">
                    <div className="flex items-center justify-between p-4">
                        <Avatar time={moment(post.createdAt).locale('vi').fromNow()} user={post.userCreated} />
                        <div className="flex items-center relative">
                            <IconButton onClick={() => setToggleMore(prev => !prev)} className='border-none'><DotsHorizontal className="fill-base-content" /></IconButton>
                            <ul className={`menu bg-base-200 absolute shadow-sm top-14 -right-2 z-1 w-56 ${clsx([toggleMore ? 'absolute' : 'hidden'])}`}>
                                <li>
                                    <a>
                                        <ReportSvg />
                                        Báo cáo bài viết
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <TrashSvg />
                                        Xóa bài đăng này</a>
                                </li>
                                <li>
                                    <a onClick={() => handleEdit(post.id)}>
                                        <EditSvg />
                                        Sửa
                                    </a>
                                </li>
                            </ul>
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
                        <div className="p-2 space-y-2 md:p-4">
                            <div className="flex items-center justify-between mt-2">
                                <div className='flex gap-4'>
                                    <button onClick={onChangeLiked} className={`btn btn-ghost hover:bg-error ${clsx(
                                        {
                                            'bg-error': liked
                                        }
                                    )}`}>
                                        <span className="font-bold text-lg">{post.likes?.length || 0}</span>
                                        <FaceHeart className="fill-base-content" />
                                    </button>
                                    <button onClick={() => setToggleComment(prev => !prev)} className={`flex gap-x-3 items-center justify-between px-2 py-0 rounded-md btn-ghost ${clsx({
                                        'bg-secondary' : toggleComment
                                    })}`}>
                                        <span className="font-bold text-lg">22</span>
                                        <ChatSvg className="fill-base-content" />
                                    </button>
                                </div>
                                <div className='hidden md:flex items-center justify-center gap-x-3'>
                                    <AvatarGroup />
                                </div>
                            </div>
                            {toggleComment &&
                                <div>
                                    <div className="divider divider-start my-0 w-full"></div>
                                    <Comment />
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default Artical
