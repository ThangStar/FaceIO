'use client'
import Artical from '@/components/artical/Artical'
import Avatar from '@/components/avatar/Avatar'
import IconButton from '@/components/button/IconButton'
import useReconnect from '@/hooks/useReconnect'
import React, { useEffect, useRef, useState } from 'react'
import SmileSvg from '/public/svg/smile.svg'
import ImageSvg from '/public/svg/image.svg'
import Image from 'next/image'
import { AnimatePresence, motion } from "framer-motion"
import CloseSvg from '/public/svg/close.svg'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { postAction } from '@/redux/slice/postSlice'
import { addPostDto } from '@/firebase/api/post.api'
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/setup'
import { post } from '@/types/post'
import { user } from '@/types/user'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
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
    dispatch(postAction.addPost({ body: content, title: '123', fileImages: files }))
    setContent('')
    setFiles([])
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ((files?.length && files) || content) && handleAddPost();
  }

  function handleGetAllPost(): void {
    // dispatch(postAction.getAllPost())
  }
  const [posts, setPosts] = useState<post[]>([])

  const mergePostsAndUsers = async (uids: string[], posts: post[]) => {
    const q = query(collection(db, "users"), where("uid", "in", uids));
    const snapshot = await getDocs(q)
    const users: user[] = snapshot.docs.map(doc => doc.data()) as user[]

    posts.map(post => {
      const user = users.find(user => user.uid === post.createdBy)
      if (user) {
        post.userCreated = user
      }
    })
    setPosts(posts)
  }
  const [toggleEmoji, setToggleEmoji] = useState(false)
  const refEmoij = useRef<HTMLDivElement>(null)
  const handleToggleEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    setToggleEmoji(!toggleEmoji)
  }
  useEffect(() => {
    onSnapshot(query(
      collection(db, "posts"),
      limit(10), orderBy('createdAt', 'desc')
    ), (doc) => {
      const uids: string[] = []
      const posts = doc.docs.map(doc => {
        uids.push(doc.data().createdBy)
        const post = { ...doc.data(), id: doc.id }
        return post as post
      })
      mergePostsAndUsers(uids, posts)
    });

    // emoij fetch

    return () => {
    }
  }, [])

  return (
    <div className='items-center gap-y-6 w-full'>

      <div className='mx-auto w-fit max-w-full px-2 md:px-6 lg:phone-6'>
        <div className='mb-6 bg-base-100 p-6 rounded shadow-md'>
          <h4 className='mb-6 font-bold'>
            Bạn đang nghĩ gì? ✨
          </h4>
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
                  <button className="btn bg-[#00000010] rounded-full px-3 relative">
                    <ImageSvg className="fill-primary" />
                    <input onChange={onChangeImage} onClick={(e) => e.currentTarget.value = ''} type="file" accept="image/*" multiple className='absolute inset-0 z-10 opacity-0 cursor-pointer top-0 bottom-0 right-0 w-full h-full' />
                  </button>
                  <div className='flex w-fit gap-x-2 relative'>
                    <IconButton className='bg-[#00000010] ' onClick={handleToggleEmoji}>

                      <SmileSvg className="fill-secondary" /></IconButton>
                    {/* <select value={''} className="select select-ghost w-full max-w-xs">
                      <option disabled selected>Cảm xúc / Hoạt động</option>
                      <option>Svelte</option>
                      <option>Vue</option>
                      <option>React</option>
                    </select> */}
                    {toggleEmoji && <div className='w-full absolute right-0 z-20 top-14'>
                      <Picker data={data} onEmojiSelect={(props: any) => console.log(setContent(prev => prev += props.native))} />
                    </div>
                    }
                  </div>

                </div>
                <button className="btn btn-outline btn-primary" type='submit'>Đăng</button>
              </div>
            </form>
          </div>
        </div>
        <h3 className='text-left text-2xl'>Bài đăng mới</h3>
        <div className="divider divider-start my-0 w-full"></div>
        {
          posts.map((post, index) => {
            // transform post
            return (
              <Artical post={post} key={post.id} />
            )
          })
        }
      </div >
    </div >
  )
}

export default Page
