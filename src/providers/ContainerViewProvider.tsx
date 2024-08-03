import React from 'react'

function ContainerViewProvider({ children }: any) {
    return (
        <div className="h-screen overflow-y-auto overflow-x-hidden relative w-screen">
            {children}
        </div>
    )
}

export default ContainerViewProvider
