import { socket } from '@/http/socket'
import React, { useEffect, useState } from 'react'

function useReconnect() {
    const [status, setStatus] = useState()
    useEffect(() => {
        if(socket.disconnected){
            // socket.connect()
        }
        return () => {
            socket.close()
        }
    }, [])

    return {status }
}
export default useReconnect