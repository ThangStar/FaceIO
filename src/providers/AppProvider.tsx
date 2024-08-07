"use client"
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ModalProvider from '@/context/ModalContext'
import ThemeProvider from '@/context/ThemeContext'
import React, { } from 'react'
import { Provider } from 'react-redux'
import ContainerViewProvider from './ContainerViewProvider'
import BodyViewProvider from './BodyViewProvider'
import PreLoaderProvider from './PreLoaderProvider'
import ChatBubble from '@/components/chat/ChatBubble'
import NavBar from '@/components/layout/NavBar'
import Debuger from '@/components/layout/Debuger'
import Footer from '@/components/layout/Footer'
import store from '@/redux/store/store'
import AlertProvider from './AlertProvider'
function AppProvider({ children }: any) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <PreLoaderProvider />
                <AlertProvider />
                <ContainerViewProvider>
                    <ModalProvider>
                        <NavBar />
                        <Debuger />
                        <ChatBubble />
                        <Breadcrumbs />
                        <BodyViewProvider>
                            {children}
                        </BodyViewProvider>
                        <Footer />
                    </ModalProvider>
                </ContainerViewProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default AppProvider
