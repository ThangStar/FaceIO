"use client"
import Modal from '@/components/modal/modal'
import React, { ReactNode } from 'react'

export const ModalContext = React.createContext({

})
function ModalProvider({ children }: any) {
    const [childrenModal, setChildrenModal] = React.useState<ReactNode>()
    const changeChildrenModal = (children: ReactNode) => {
        setChildrenModal(children)
    }
    return (
        <ModalContext.Provider value={{ childrenModal, changeChildrenModal }}>
            <Modal>{childrenModal}</Modal>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
