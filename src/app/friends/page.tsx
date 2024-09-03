import { user } from '@/types/user'
import React, { useEffect, useState } from 'react'

function Page() {
  const [friends, setFriends] = useState<user[]>([])
  useEffect(() => {
    return () => {
    }
  }, [])
  
  return (
    <div>
      Gợi ý

    </div>
  )
}

export default Page
