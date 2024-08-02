import React from 'react'
import CloseSvg from '/public/svg/close.svg'
import IconButton from '../button/IconButton'


function Modal({ children }: any) {
    return (
        <dialog id="modal-show" className="modal h-full bg-transparent">
            <div className="modal-box w-11/12 max-w-5xl bg-transparent relative overflow-hidden">
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button className='absolute top-0 right-0 bg-transparent border-none'>
                            <IconButton className="btn bg-neutral-content">
                                <CloseSvg></CloseSvg>
                            </IconButton>
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal
