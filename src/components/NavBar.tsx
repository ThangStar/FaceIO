import React from 'react'
import ToggleTheme from './ToggleTheme'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Avatar from './Avatar'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import MenuSvg from '/public/svg/menu.svg';
import IconButton from './button/IconButton'


function NavBar() {
    const pathname = usePathname()
    if (pathname === '/') {
        return <NavBarIntro />
    } else {
        return <NavBarHome />
    }

}

function NavBarHome() {
    return (
        <nav className="navbar shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-20">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <span className="text-lg font-bold">FaceIO</span>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <Navigation className='w-1/2 mx-auto' />
                </div>
                <div className="flex-none px-2 mx-2">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href="#">
                            <Avatar />
                        </a>
                    </div>
                </div>
                <div className='sppace-x-2 flex'>
                    <IconButton >
                        <ChatSvg className="fill-primary" />
                    </IconButton>

                    <IconButton >
                        <NotifiSvg className="fill-primary" />
                    </IconButton>

                    <IconButton >
                        <MenuSvg className="fill-primary" />
                    </IconButton>
                </div>
                <ToggleTheme iconStyle='w-10 h-10' />
            </div>
        </nav>
    )
}

const NavBarIntro = () => {
    return (
        <nav className="navbar shadow-lg bg-neutral text-neutral-content h-[64px] fixed z-20">
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
