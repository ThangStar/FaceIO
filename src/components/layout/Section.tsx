import React from 'react'

function Section({ children }: any) {
    return (
        <div className='bg-section min-h-96 w-full px-14 py-16'>{children}</div>
    )
}

export default Section