import React, { HTMLAttributes } from 'react'
import CloseSvg from '/public/svg/close.svg'
import IconButton from '../button/IconButton'
import { AnimatePresence, motion } from "framer-motion"
import ModalRegister from './ModalRegister'
import ReactDOM from 'react-dom'
type Props = HTMLAttributes<HTMLDivElement> & {
    children: any,
    id?: string
}
function Modal({ children, className, id = '' }: Props) {
    return ReactDOM.createPortal(
        <div id={`${id.replace(/^#/, '')}`} className="modal rounded h-full bg-transparent fixed inset-0 z-50">
            <div className={`modal-box w-11/12 max-w-5xl bg-transparent p-0 m-0 relative ${className}`}>
                {children}
                <div className="modal-action p-0 m-0">
                    <form method="dialog">
                        <a href='#' className='absolute top-0 right-0 bg-transparent border-none'>
                            <IconButton className="btn bg-transparent border-none ">
                                <CloseSvg className="fill-white"></CloseSvg>
                            </IconButton>
                        </a>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal
