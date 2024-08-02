"use client"
import Breadcrumbs from '@/components/Breadcrumbs'
import ChatList from '@/components/chat/ChatList'
import ChatBubble from '@/components/ChatBubble'
import Debuger from '@/components/Debuger'
import Footer from '@/components/Footer'
import Modal from '@/components/modal/modal'
import NavBar from '@/components/NavBar'
import PreLoader from '@/components/PreLoader'
import ModalProvider from '@/context/ModalContext'
import ThemeProvider from '@/context/ThemeContext'
import store from '@/redux/store'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import { Provider } from 'react-redux'
function AppProvider({ children }: any) {
    const [isFirstJoin, setIsFirstJoin] = React.useState(false)
    const [modalChildren, setModalChildren] = useState<ReactNode>()
    return (
        <Provider store={store}>
            <ThemeProvider>
                {
                    isFirstJoin && <PreLoader />
                }
                <div className="h-screen overflow-y-auto overflow-x-hidden relative w-screen">
                    <NavBar />
                    <ModalProvider>
                        <Debuger />
                        <ChatBubble />
                        {/* breadcrumbs */}
                        <Breadcrumbs />
                        <div className="w-full min-h-[calc(100%-240px-48px-64px)] py-12 bg-base-200">
                            {children}
                        </div>
                        <Footer />
                    </ModalProvider>
                </div>

            </ThemeProvider>
        </Provider>
    )
}

export default AppProvider
