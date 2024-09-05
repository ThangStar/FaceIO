import React, { useEffect, useId, useRef, useState } from 'react'
import ToggleTheme from './ToggleTheme'
import { usePathname, useRouter } from 'next/navigation'
import Navigation from './Navigation'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import MenuSvg from '/public/svg/menu.svg';
import IconButton from '../button/IconButton';
import ChatList from '../chat/ChatList';
import Avatar from '../avatar/Avatar';
import { auth } from '@/firebase/setup';
import { userAuthToUserDb } from '@/firebase/utils';
import clsx from 'clsx';
import Modal from '../modal/Modal';
import ModalRegister from '../modal/ModalRegister';
import { useSelector } from 'react-redux';
import { message } from '@/types/message';

function NavBar() {
    const pathname = usePathname()
    if (pathname === '/') {
        return <NavBarIntro />
    } else {
        return <NavBarHome />
    }

}

function NavBarHome() {
    const [visibleChatList, setVisibleChatList] = React.useState(false)
    const handleVisibleChatList = () => {
        setVisibleChatList(prev => !prev)
    }
    const router = useRouter()
    async function handleLogout() {
        await auth.signOut().then(() => {
            localStorage.removeItem("idToken")
            router.replace('/')
        })
    }
    const [toggleSetting, setToggleSetting] = useState(false)
    const messages: message[] = useSelector((state: any) => state.dataProvider.value.messages)
    const lengthMessage = useRef(messages.filter(m => m.seenUserId != auth.currentUser?.uid).length.toString() || '')

    return (
        <nav className="navbar top-0 shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-30">
            <div className="w-full flex justify-between">
                <div className="px-2 mx-2 w-full">
                    <span className="text-lg font-bold">FaceIO</span>
                </div>
                <div className=" hidden md:block w-full px-3">
                    <Navigation className='' />
                </div>

                <div className='flex w-full justify-end'>
                    <div className='flex'>
                        <IconButton className='hidden md:flex relative' onClick={handleVisibleChatList}>
                            <div className='inline-block indicator'>
                                <span className={`indicator-item badge bg-error p-1 badge-secondary ${clsx([
                                    lengthMessage.current ? '!visible' : 'hidden',
                                ])}`}>{lengthMessage.current}</span>
                                <ChatSvg className="fill-primary" />
                                {
                                    visibleChatList &&
                                    (
                                        <ChatList className='absolute top-14 right-0 bg-base-200 shadow-md border-primary border border-dashed min-w-[calc(100vw/4)]' />
                                    )
                                }
                            </div>
                        </IconButton>

                        <IconButton className='hidden md:flex' >
                            <div className='inline-block indicator '>
                                <span className={`indicator-item badge bg-error p-1 badge-secondary ${clsx([
                                    lengthMessage.current ? '!visible' : 'hidden',
                                ])}`}>12</span>
                                <NotifiSvg className="fill-primary" />
                            </div>
                        </IconButton>

                        <IconButton className='bg-transparent border-none '>
                            <MenuSvg className="fill-primary" />
                        </IconButton>
                    </div>
                    <ToggleTheme iconStyle='w-10 h-10' />
                    <div className="">
                        <div className="flex items-stretch relative">
                            <a className="btn btn-ghost rounded-btn " onClick={() => setToggleSetting(prev => !prev)}>
                                <Avatar containerTextStyle='hidden md:flex' />
                            </a>
                            <ul className={`menu shadow-md bg-neutral absolute top-14 -right-2 z-1 w-56 ${clsx([toggleSetting ? 'absolute' : 'hidden'])}`}>
                                <li>
                                    <a>Chủ đề</a>
                                </li>
                                <li>
                                    <a>Cài đặt tài khoản</a>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavBarIntro = () => {
    return (
        <nav className="navbar top-0 shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-20">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <span className="text-lg font-bold">FaceIO</span>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <div className="items-stretch hidden lg:flex">
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Home
                        </a>
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Tài liệu
                        </a>
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Liên hệ
                        </a>
                    </div>
                </div>
                <div className="flex-none px-2 mx-2">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost btn-sm rounded-btn">
                        </a>
                    </div>
                </div>
                {/* <ToggleTheme iconStyle='w-10 h-10' /> */}
            </div>
        </nav>
    )
}
export default NavBar
