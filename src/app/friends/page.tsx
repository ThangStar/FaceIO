"use client"
import { db } from '@/firebase/setup'
import { dataProviderActions } from '@/redux/slice/dataProviderSlice'
import { user } from '@/types/user'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
const ProfilePlaholder = () => {
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  )
}

function Page() {
  const [friends, setFriends] = useState<user[]>([])
  const fetchFriends = async () => {
    const q = query(collection(db, "users"), limit(10));
    const snapshot = await getDocs(q)
    setFriends(snapshot.docs.map(doc => doc.data() as user))
    return () => {
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [])
  const dispatch = useDispatch()
  const { addNewChat, removeChat } = dataProviderActions

  function handleOpenChatBubble(uid: string): void {
    dispatch(addNewChat({
      idUser:
        uid
    }))
  }

  return (
    <div className='min-h-screen px-6'>
      <div className='mb-6'>
        <h3 className='text-left text-3xl'>Gợi ý</h3>
      </div>
      <div className='grid sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 md:grid-cols-4 gap-3 items-center'>
        <Suspense fallback={<ProfilePlaholder />}>
          {friends.map((friend, index) => (
            <div key={friend.uid} className="card border p-6">
              <figure>
                <Image
                  width={200}
                  height={300}
                  className='object-cover size-32 rounded-md'
                  src={friend.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                  alt="car!" />
              </figure>
              <div className="card-body px-2 pb-3">
                <h2 className="justify-center mb-3 truncate text-xl">{friend.displayName}</h2>
                <div className="card-actions justify-center">
                  {/* <button className="btn btn-primary">Kết bạn</button> */}
                  <button className="btn btn-outline" onClick={() => handleOpenChatBubble(friend.uid)}>Nhắn tin</button>
                </div>
              </div>
            </div>
          ))}
        </Suspense>
      </div>
      <div className='mx-auto w-fit mt-6'>
        <div className="join mx-auto">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  )
}


export default Page
