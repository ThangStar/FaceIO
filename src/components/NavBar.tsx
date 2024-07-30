import React from 'react'
import ToggleTheme from './ToggleTheme'

function NavBar() {
    return (
        <nav className="navbar shadow-lg bg-neutral text-neutral-content ">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <span className="text-lg font-bold">MyApp</span>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <div className="items-stretch hidden lg:flex">
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Home
                        </a>
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Documentation
                        </a>
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Contact
                        </a>
                    </div>
                </div>
                <div className="flex-none px-2 mx-2">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost btn-sm rounded-btn" href="#">
                            Login
                        </a>
                    </div>
                </div>
                <ToggleTheme iconStyle='w-10 h-10' />
            </div>
        </nav>
    )
}

export default NavBar
