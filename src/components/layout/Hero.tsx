"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import ModalRegister from '../modal/ModalRegister'
import { ModalContext } from '@/context/ModalContext'

function Hero() {
    const { childrenModal, changeChildrenModal, changeClassName } = useContext<any>(ModalContext)

    const handleShowRegister = () => {
        if (typeof changeChildrenModal === 'function') {
            changeChildrenModal(<ModalRegister />);
        }
        (document.getElementById('modal-show') as any).showModal()
    }
    return (
        <div className="hero mb-28 min-h-[calc(100vh-240px-48px)]">
            <div className="hero-content p-0 text-center">
                <div className="max-w-xl ">
                    <h1 className="text-3xl font-bold leading-10 md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
                        Mạng xã hội {" "}
                        <span className='wrapper'>
                            <span className="text-primary gradient-text text-transparent relative glitch" data-glitch="Ẩn danh">Ẩn danh
                                <div className='absolute bottom-0 w-full h-1 bg-red-50 right-0 bg-gradient-to-r from-purple-500 to-violet-600'></div>
                            </span>,
                        </span>
                        <br />
                        Kết nối trò truyện ngay với {' '}
                        <span className="text-pink-500">Mọi người</span>
                    </h1>
                    <p className="py-6">
                        Tham gia ngay cộng đồng của chúng tôi
                    </p>
                    <div className='space-x-2'>
                        <button onClick={handleShowRegister} className="gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600
                    hover:from-violet-600 hover:to-pink-500
                    px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all ease-out hover:text-white md:font-semibold"
                        >
                            <span>Đăng kí ngay</span>
                        </button>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default Hero
