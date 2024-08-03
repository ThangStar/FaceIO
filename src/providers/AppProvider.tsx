"use client"
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ModalProvider from '@/context/ModalContext'
import ThemeProvider from '@/context/ThemeContext'
import store from '@/redux/store'
import React, {  } from 'react'
import { Provider } from 'react-redux'
import ContainerViewProvider from './ContainerViewProvider'
import BodyViewProvider from './BodyViewProvider'
import PreLoaderProvider from './PreLoaderProvider'
import ChatBubble from '@/components/chat/ChatBubble'
import NavBar from '@/components/layout/NavBar'
import Debuger from '@/components/layout/Debuger'
import Footer from '@/components/layout/Footer'
function AppProvider({ children }: any) {
    return (
        <Provider store={store}>
            <ThemeProvider>
               <PreLoaderProvider/>
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
