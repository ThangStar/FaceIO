"use client"
import React from 'react'
import { motion } from "framer-motion"
import Hero from '@/components/layout/Hero'
import Section from '@/components/layout/Section'
import Image from 'next/image'
function Page() {
  return (
    <>
      <Hero />
      <Section>
        <h2 className="mb-12">Khám phá thế giới mới</h2>
        <motion.div layout
          className='w-2/3 mx-auto'
          initial={{ rotate: 0 }} style={{ overflow: "scroll" }}
          whileHover={{ rotateZ: 2, scale: 1.1, transition: { duration: 0.5 } }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}>
          <Image alt='' width={2000} height={2000} 
            src="/images/img_section_1.png"
            className='w-full rounded-lg'
          />
        </motion.div>
      </Section>
      <Section>
        <h2 className="mb-12">Tự do thể hiện, an toàn tuyệt đối</h2>
      </Section>
    </>
  )
}

export default Page