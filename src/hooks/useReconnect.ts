import { socket } from '@/http/socket'
import React, { useEffect, useState } from 'react'

function useReconnect() {
    const [status, setStatus] = useState()
    useEffect(() => {
        console.log(1);
        if(socket.disconnected){
            socket.connect()
        }
        return () => {
            socket.close()
        }
    }, [])

    return {status }
}
export default useReconnect