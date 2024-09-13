import React, { useEffect, useId, useRef, useState } from 'react'
import ToggleTheme from './ToggleTheme'
import { usePathname, useRouter } from 'next/navigation'
import Navigation from './Navigation'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import MenuSvg from '/public/svg/menu.svg';
import LogoSvg from '/public/svg/logo_solid.svg';
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
import NotiList from '../notification/NotiList';
import { redirectConfig } from '@/utils/utils';
import BrowserMockup from '../mockup/BrowserMockup';

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
            window.location.href = `${redirectConfig()}`
        })
    }
    const [toggleSetting, setToggleSetting] = useState(false)
    const [toggleNoti, setToggleNoti] = useState(false)

    const onVisibleToggleNoti = () => {
        setToggleNoti(prev => !prev)
    }
    const messages: message[] = useSelector((state: any) => state.dataProvider.value.messages)
    const [lengthMessage, setLengthMessage] = useState(0)
    useEffect(() => {
        setLengthMessage(messages.filter(m => m.seenUserId?.indexOf(auth.currentUser?.uid || '') == -1).length || 0)
    }, [messages])


    const refChatList = useRef<HTMLDivElement | null>(null)
    const refBtnChat = useRef<HTMLDivElement | null>(null)

    const refNotiIcon = useRef<HTMLDivElement | null>(null)
    const refNotiList = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (refChatList.current && !refChatList.current.contains(event.target) && !refBtnChat.current?.contains(event.target)) {
                setVisibleChatList(false);
            }
            if (refNotiList.current && !refNotiList.current.contains(event.target) && !refNotiIcon.current?.contains(event.target)) {
                setToggleNoti(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [refChatList, refChatList]);

    const imgUris = useRef([
        '/images/bg_01.jpg',
        '/images/bg_02.jpg',
        '/images/bg_03.jpg',
        '/images/bg_04.jpg',
        '/images/bg_05.jpg',
        '/images/bg_06.jpg',
    ])

    return (
        <nav className="navbar top-0 shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-[20]">
            <div className="w-full flex justify-between">
                <div className="px-2 mx-2 w-full">
                    <a href='/' className="btn bg-transparent border-none text-lg font-bold"><LogoSvg className="fill-primary size-8" /></a>
                </div>
                <div className=" hidden md:block w-full px-3">
                    <Navigation className='' />
                </div>

                <div className='flex w-full justify-end'>
                    <div className='flex'>
                        <div className='relative' ref={refChatList}>
                            <IconButton onClick={handleVisibleChatList} className=' md:flex ' refButton={refBtnChat}>
                                <div className='inline-block indicator'>
                                    <span className={`indicator-item badge bg-error text-base-content p-1 badge-secondary ${clsx([
                                        lengthMessage != 0 ? '!visible' : 'hidden',
                                    ])}`}>{lengthMessage}</span>
                                    <ChatSvg className="fill-primary" />
                                </div>
                            </IconButton>
                            {
                                visibleChatList &&
                                (
                                    <ChatList setVisibleChatList={setVisibleChatList} className='absolute top-16 -left-40 md:left-auto w-fit ms-12 sm:ms-0 md:w-auto bg-base-200 right-0 shadow-md border-primary border border-dashed min-w-[calc(100vw/4)]' />
                                )
                            }
                        </div>

                        <IconButton refButton={refNotiIcon} onClick={onVisibleToggleNoti} className=' md:flex' >
                            <div className='inline-block indicator '>
                                <span className={`indicator-item badge bg-error p-1 text-base-content badge-secondary ${clsx([
                                    lengthMessage ? '!visible' : 'hidden',
                                ])}`}>12</span>
                                <NotifiSvg className="fill-primary" />
                                {toggleNoti &&
                                    <NotiList refNoti={refNotiList} className='absolute top-14 -left-56 md:left-auto w-fit min-h-96 px-18 ms-12 sm:ms-0 md:w-auto bg-base-200 right-0 shadow-md border-primary border border-dashed min-w-[calc(100vw/4)]' />
                                }
                            </div>
                        </IconButton>

                        <div className="drawer md:flex w-12">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer" className="drawer-button">
                                    <IconButton className='bg-transparent border-none '>
                                        <MenuSvg className="fill-primary" />
                                    </IconButton>
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu bg-base-200 text-base-content p-0 min-h-full w-1/2 md:p-4">
                                    {/* Sidebar content here */}
                                    <h3 className='text-left text-2xl hover:bg-none mx-4 pb-12 pt-3'>Cài đặt</h3>
                                    <div className='text-xl tracking-wider space-y-3'>
                                        <li>
                                            <div tabIndex={0} className="collapse border-base-300 bg-base-200 border">
                                                <div className="collapse-title text-xl font-medium">Ảnh nền</div>
                                                <div className='grid collapse-content grid-flow-row-dense md:grid-cols-3 px-3 gap-4'>
                                                    {imgUris.current.map((uri, index) => <BrowserMockup key={index} imgUri={uri} />)}
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div tabIndex={0} className="collapse border-base-300 bg-base-200 border">
                                                <div className="collapse-title text-xl font-medium">Khác</div>
                                                <div className="collapse-content">
                                                    <p>tabindex={0} attribute is necessary to make the div focusable</p>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ToggleTheme className='hidden md:block' iconStyle='w-10 h-10' />
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
            </div >
        </nav >
    )
}

const NavBarIntro = () => {
    return (
        <nav className="navbar top-0 shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-20">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <a href='/' className="btn bg-transparent border-none text-lg font-bold"><LogoSvg className="fill-primary size-8" /></a>
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
