import React, { useState } from 'react'

interface DataProvider {
    chats: user[],
}

export const dataProvider: DataProvider = {
    chats: [
        {
            id: 0,
            username: 'thangvan1',
            messages: [
                {
                    id: 2,
                    message: 'hello',
                    time: 'now',
                    id_user_send: 0,
                    id_user_receive: 1
                },
                {
                    id: 3,
                    message: 'Welcome',
                    time: 'now',
                    id_user_send: 0,
                    id_user_receive: 1
                }
            ]
        },
        {
            id: 1,
            username: 'thangvan2',
            messages: [
                {
                    id: 1,
                    message: 'Welcome',
                    time: 'now',
                    id_user_send: 0,
                    id_user_receive: 1
                },
                {
                    id: 1,
                    message: 'hello',
                    time: 'now',
                    id_user_send: 0,
                    id_user_receive: 1
                }
            ]
        }
    ],
}
function useDataProvider() {
    const [dProvider, setDprovider] = useState<DataProvider>(dataProvider)
    return { dProvider, setDprovider }
}

export default useDataProvider
