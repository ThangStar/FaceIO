import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    contents: string[]
}
export default function AlertProvider({ contents }: Props) {
    return (
        <div className="toast z-[1000]">
            {contents.map((content, index) => (
                <div key={index} className="alert alert-info">
                    <span>New message arrived.</span>
                </div>
            ))};
        </div>
    )
}
