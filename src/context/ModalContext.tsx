"use client"
import Modal from '@/components/modal/Modal'
import React, { HTMLAttributes, ReactNode } from 'react'

export const ModalContext = React.createContext({

})
function ModalProvider({ children }: any) {
    const [childrenModal, setChildrenModal] = React.useState<ReactNode>()
    const [className, setClassName] = React.useState<string | undefined>()
    const changeChildrenModal = (children: ReactNode) => {
        setChildrenModal(children)
    }
    const changeClassName = (className: HTMLAttributes<HTMLDivElement>['className']) => {
        setClassName(className)
    }
    return (
        <ModalContext.Provider value={{ childrenModal, changeChildrenModal, changeClassName}}>
            <Modal className={className}>{childrenModal}</Modal>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
