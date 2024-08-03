import React from 'react'
import CloseSvg from '/public/svg/close.svg'
import IconButton from '../button/IconButton'


function Modal({ children }: any) {
    return (
        <dialog id="modal-show" className="modal rounded h-full bg-transparent">
            <div className="modal-box w-11/12 max-w-5xl bg-transparent p-0 m-0 relative overflow-hidden">
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
