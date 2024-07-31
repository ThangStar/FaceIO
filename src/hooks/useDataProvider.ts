import React, { useState } from 'react'

interface DataProvider {
    chats: user[],
}

export const dataProvider: DataProvider = {
    chats: [
        {
            id: 1,
            username: 'thangvan1'
        },
        {
            id: 2,
            username: 'thangvan2'
        }
    ],
}
function useDataProvider() {
    const [dProvider, setDprovider] = useState<DataProvider>(dataProvider)
    return { dProvider, setDprovider }
}

export default useDataProvider
