import React from 'react'
import ToggleTheme from './ToggleTheme'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Avatar from './Avatar'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import MenuSvg from '/public/svg/menu.svg';
import IconButton from './button/IconButton'
import ChatList from './chat/ChatList'


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
    return (
        <nav className="navbar top-0 shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-30">
            <div className="container">
                <div className="flex-1 px-2 mx-2">
                    <span className="text-lg font-bold">FaceIO</span>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <Navigation className='w-1/2 mx-auto' />
                </div>

                <div className='space-x-2 flex-1  flex justify-end'>
                    <div>

                    <IconButton className='relative' onClick={handleVisibleChatList}>
                            <div className='inline-block indicator'>
                                <span className="indicator-item badge bg-error size-2 p-0 badge-secondary"></span>
                                <ChatSvg className="fill-primary" />
                            {
                                visibleChatList &&
                                (
                                    <ChatList className='absolute top-14 right-0 bg-base-200 shadow-md border-primary border border-dashed' />
                                )
                            }
                            </div>
                        </IconButton>
                           
                        <IconButton >
                            <div className='inline-block indicator'>
                                <span className="indicator-item badge bg-error size-2 p-0 badge-secondary"></span>
                                <NotifiSvg className="fill-primary" />
                            </div>
                        </IconButton>

                        <IconButton className='bg-transparent border-none '>
                            <MenuSvg className="fill-primary" />
                        </IconButton>
                    </div>


                    <ToggleTheme iconStyle='w-10 h-10' />
                    <div className="px-2">
                        <div className="flex items-stretch">
                            <a className="btn btn-ghost rounded-btn" href="#">
                                <Avatar />
                            </a>
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
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Đăng nhập
                        </a>
                    </div>
                </div>
                <ToggleTheme iconStyle='w-10 h-10' />
            </div>
        </nav>
    )
}
export default NavBar
