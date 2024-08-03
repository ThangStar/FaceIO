import PreLoader from '@/components/layout/PreLoader'
import React from 'react'

function PreLoaderProvider() {
    const [isFirstJoin, setIsFirstJoin] = React.useState(false)

    return isFirstJoin && <PreLoader />
}

export default PreLoaderProvider
