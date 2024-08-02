'use client'
import Artical from '@/components/artical/Artical'
import Navigation from '@/components/Navigation'
import useReconnect from '@/hooks/useReconnect'
import React from 'react'

export const Page = () => {
  const { status } = useReconnect()
  return (
    <div className='items-center flex flex-wrap justify-center gap-y-6'>
      <Artical />
      <Artical />
      <Artical />
      <Artical />
    </div>
  )
}

export default Page
