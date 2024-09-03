import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import SendSvg from '/public/svg/send.svg'
import ImageSvg from '/public/svg/image.svg'

const InputComment = () => {
    const [files, setFiles] = useState<File[]>()

    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }
    const [comment, setComment] = useState('')
    const handleSubmitComment = () => {

    }
    const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {

    }
    return (
        <div className='my-6 px-4 py-1 rounded bg-[#00000010]'>
            <h4 className='text-xl font-bold my-3'>Trả lời <span className='text-primary'>@Thắng</span></h4>
            <form className='mb-3 flex max-w-md' onSubmit={handleSubmitComment}>
                <div className='input px-0 flex items-center justify-center w-full'>
                    <input type="text" placeholder="Aa" className="input input-bordered w-full placeholder:text-base-content" value={comment} onChange={handleChangeComment} />
                </div>
                <button className="btn btn-primary btn-square ms-3" type='submit'>
                    <SendSvg className="fill-primary-content" />
                </button>
            </form>
            <button className="btn btn-primary hover:bg-base-300 px-3 bg-transparent border-base-300 hover:bg-tranmparent relative">
                <ImageSvg className="fill-base-content" />
                <input onChange={onChangeImage} onClick={(e) => e.currentTarget.value = ''} type="file" accept="image/*" multiple className='absolute bg-red-50 inset-0 z-10 opacity-0 cursor-pointer top-0 bottom-0 right-0 w-full h-full' />
            </button>
        </div>
    )
}
function Comment() {
    return (
        <div>
            <h4 className='text-xl font-bold my-3'>Bình luận</h4>
            <ul className="menu rounded-box">
                <li>
                    <details open>
                        <summary>
                            <div>
                                <Avatar sizeAvatar={8} time='5 phut' subtitle='HEllo' />
                            </div>
                        </summary>
                        <button className='text-primary mx-14 font-bold mb-3'>Trả lời</button>
                        <ul>
                            <li className=''>
                                <a>
                                    <Avatar sizeAvatar={8} time='5 phut' subtitle='HEllo' />
                                </a>
                                <button className='hover:bg-transparent focus:bg-transparent text-primary mx-10 font-bold mb-3'>Trả lời</button>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div className="divider divider-start my-0 w-full"></div>

            <InputComment />
        </div>
    )
}

export default Comment
