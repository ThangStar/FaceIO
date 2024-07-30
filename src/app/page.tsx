import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'
import PreLoader from '@/components/PreLoader'
import ToggleTheme from '@/components/ToggleTheme'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div>
      <PreLoader />
      <NavBar />
      {/* breadcrumbs */}
      <Breadcrumbs />
      {/* hero */}
      <Hero />
      <Footer/>
    </div>
  )
}

export default Page
