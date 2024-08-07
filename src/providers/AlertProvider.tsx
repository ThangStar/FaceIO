import React from 'react'
import { motion } from 'framer-motion'

export default function AlertProvider({ children }: any) {
    return (
        <>
            <div className="toast">
                <motion.div
                    initial={{
                        opacity: 0.6,
                        translateX: 200,
                    }}
                    animate={{
                        opacity: 1,
                        translateX: 0,
                    }}
                    exit={{
                        opacity: 0.6,
                        translateX: 200,
                    }}
                    className="alert alert-info"
                >
                    <span>New message arrived.</span>
                </motion.div>
            </div>
            {children}
        </>
    )
}
