"use client"
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import React from 'react'
import { motion } from "framer-motion"
function Page() {
  return (
    <>
      <Hero />
      <Section>
        <h2 className="mb-12">Khám phá thế giới mới</h2>
        <motion.img layout
          src="/img_section_1.png"
          className='w-1/3 mx-auto rounded-lg'
          initial={{ rotate: 0 }} style={{ overflow: "scroll" }}
          whileHover={{ rotateZ: 2, scale: 1.1, transition: { duration: 0.5 } }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        />
      </Section>
      <Section>
        <h2 className="mb-12">Tự do thể hiện, an toàn tuyệt đối</h2>
      </Section>
    </>
  )
}

export default Page