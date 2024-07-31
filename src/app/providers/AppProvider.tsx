"use client"
import Breadcrumbs from '@/components/Breadcrumbs'
import ChatBubble from '@/components/ChatBubble'
import Debuger from '@/components/Debuger'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import PreLoader from '@/components/PreLoader'
import ThemeProvider from '@/context/ThemeContext'
import { useRouter } from 'next/router'
import React from 'react'

function AppProvider({ children }: any) {
    const [isFirstJoin, setIsFirstJoin] = React.useState(false)
    return (
        <ThemeProvider>
            {
                isFirstJoin && <PreLoader />
            }
            <div className="h-screen overflow-y-auto overflow-x-hidden relative w-screen">
                <NavBar />
                <Debuger />
                <ChatBubble/>
                {/* breadcrumbs */}
                <Breadcrumbs />
                <div className="w-full min-h-[calc(100%-240px-48px-64px)] py-12 bg-base-200">
                    {children}
                </div>
                <Footer />
            </div>

        </ThemeProvider>
    )
}

export default AppProvider
