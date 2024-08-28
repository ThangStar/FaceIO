'use client'
import Artical from '@/components/artical/Artical'
import Avatar from '@/components/avatar/Avatar'
import IconButton from '@/components/button/IconButton'
import useReconnect from '@/hooks/useReconnect'
import React, { useEffect, useState } from 'react'
import SmileSvg from '/public/svg/smile.svg'
import ImageSvg from '/public/svg/image.svg'
import Image from 'next/image'
import { AnimatePresence, motion } from "framer-motion"
import CloseSvg from '/public/svg/close.svg'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { postAction } from '@/redux/slice/postSlice'
import { addPostDto } from '@/firebase/api/post.api'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase/setup'

const Page = () => {
  const [files, setFiles] = useState<File[]>()
  const [content, setContent] = useState('')
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleRemoveFile = (fileName?: string, removeAll: boolean = false) => {
    if (removeAll) {
      setFiles([])
    } else {
      const newFiles: File[] = Array.from(files || []).filter((file) => file.name !== fileName)
      setFiles(newFiles)
    }
  }

  const dispatch = useDispatch<any>()

  const handleAddPost = () => {
    dispatch(postAction.addPost({ body: content, title: '123' }))
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ((files?.length && files) || content) && handleAddPost();
  }

  function handleGetAllPost(): void {
    console.log('start obser');
    const q = query(collection(db, "cities"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
    // dispatch(postAction.getAllPost())

  }
  return (
    <div className='items-center gap-y-6 '>
      <div className='mx-auto w-fit'>
        <div className='mb-12'>
          <div className='flex gap-6 items-start'>
            <Avatar containerTextStyle='hidden' />
            <form onSubmit={onSubmit} className='w-full'>
              <textarea value={content} onChange={e => setContent(e.target.value)} className="textarea textarea-bordered min-h-16 w-full" placeholder="Bạn đang nghĩ gì?    "></textarea>
              <div className={`flex flex-shrink ${clsx({
                'my-6': files?.length || 0 > 0
              })}`}>
                <AnimatePresence>
                  {files?.map((file, index) => {
                    return (
                      <motion.div
                        className='opacity-0 translate-x-2 relative w-fit'
                        animate={{ opacity: 1, translateX: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key={index} >
                        <Image width={46} height={46} className='mr-4 bg-red-50 h-[120px] w-[120px] object-cover' objectFit='cover' src={URL.createObjectURL(file)} alt="" />
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className='absolute -top-2 right-2 cursor-pointer'
                        >
                          <CloseSvg className="fill-primary-content bg-neutral size-6 " onClick={() => handleRemoveFile(file.name)} />
                        </motion.div>
                      </motion.div>
                    )
                  }
                  )}
                </AnimatePresence>
              </div>
              <div className='flex justify-between mt-3'>
                <div className='space-x-4 flex'>
                  <button className="btn !bg-base-100 rounded-full px-3 border-none relative">
                    <ImageSvg className="fill-primary" />
                    <input onChange={onChangeImage} onClick={(e) => e.currentTarget.value = ''} type="file" accept="image/*" multiple className='absolute inset-0 z-10 opacity-0 cursor-pointer top-0 bottom-0 right-0 w-full h-full' />
                  </button>
                  <div className='flex w-fit gap-x-2'>
                    <IconButton><SmileSvg className="fill-secondary" /></IconButton>
                    {/* <select value={''} className="select select-ghost w-full max-w-xs">
                      <option disabled selected>Cảm xúc / Hoạt động</option>
                      <option>Svelte</option>
                      <option>Vue</option>
                      <option>React</option>
                    </select> */}
                  </div>
                </div>
                <button className="btn btn-outline btn-primary" type='submit'>Đăng</button>
              </div>
            </form>
            <button className="btn btn-outline btn-primary" onClick={handleGetAllPost}>GET ALL POST</button>
          </div>
        </div>

        <Artical />
        <Artical />
        <Artical />
        <Artical />
      </div>
    </div >
  )
}

export default Page
