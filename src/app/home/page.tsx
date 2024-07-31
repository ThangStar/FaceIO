import Artical from '@/components/artical/Artical'
import Navigation from '@/components/Navigation'
import React from 'react'

function Page() {
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
