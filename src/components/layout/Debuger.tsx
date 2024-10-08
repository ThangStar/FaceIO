import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function Debuger({ children }: any) {
    const pathname = usePathname()
    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <div className='fixed z-30 left-6 bottom-6 bg-base-300 rounded'>
            <h3 className='border-b p-3'>Debuger</h3>
            <div className='p-12 text-left'> pathname: {pathname}</div>
        </div>
    )
}

export default Debuger
