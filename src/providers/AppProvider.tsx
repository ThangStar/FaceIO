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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { GoogleAuthProvider } from 'firebase/auth'
import { AuthProvider } from './AuthProvider'
import ObserveMessageProvider from './ObserveMessageProvider'
import LogoLoader from '@/components/layout/LogoLoader'
import BackgroundHomeContext from '@/context/BackgroundHomeContext'
function AppProvider({ children }: any) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <PreLoaderProvider />
                <LogoLoader>
                    <AuthProvider>
                        <ContainerViewProvider>
                            <ObserveMessageProvider>
                                <BackgroundHomeContext>
                                    <ToastContainer position='top-center' />
                                    <NavBar />
                                    {/* <Debuger /> */}
                                    <ChatBubble />
                                    <Breadcrumbs />
                                    <BodyViewProvider>
                                        {children}
                                    </BodyViewProvider>
                                    <Footer />
                                </BackgroundHomeContext>
                            </ObserveMessageProvider>
                        </ContainerViewProvider>
                    </AuthProvider>
                </LogoLoader>
            </ThemeProvider>
        </Provider >
    )
}

export default AppProvider
