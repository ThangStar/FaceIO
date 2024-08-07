import React from 'react'
import AlertProvider from './AlertProvider'

function BodyViewProvider({ children }: any) {
    return (
        <div className="w-full min-h-[calc(100%-240px-48px-64px)] py-12 bg-base-200">
            {children}
        </div>
    )
}

export default BodyViewProvider
