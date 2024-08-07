import React, { HTMLAttributes } from 'react'
import CloseSvg from '/public/svg/close.svg'
import IconButton from '../button/IconButton'
import { AnimatePresence, motion } from "framer-motion"

type Props = HTMLAttributes<HTMLDivElement> & {
    children: any,
}
function Modal({ children, className }: Props) {
    return (
        <dialog id="modal-show" className="modal  !z-0 !fixed rounded h-full bg-transparent ">
            <div className={`modal-box w-11/12 max-w-5xl bg-transparent p-0 m-0 relative overflow-hidden ${className}`}>
                {children}
                <div className="modal-action p-0 m-0">
                    <form method="dialog">
                        <button className='absolute top-0 right-0 bg-transparent border-none'>
                            <IconButton className="btn bg-transparent border-none ">
                                <CloseSvg className="fill-white"></CloseSvg>
                            </IconButton>
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal
