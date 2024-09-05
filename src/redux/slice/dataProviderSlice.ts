import { messageApi, sendMessageDto } from '@/firebase/api/message.api'
import { message } from '@/types/message'
import { user } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'

export type DataProvider = {
    users: string[],
    messages: message[]
}

export const initialData: DataProvider = {
    users: [],
    messages: []
}

export const dataProviderSlice = createSlice({
    name: 'counter',
    initialState: {
        value: initialData
    },
    reducers: {
        addNewChat: (state, action: { payload: { idUser: string } }) => {
            state.value = { ...state.value, users: [...state.value.users, action.payload.idUser] }
        },
        removeChat: (state, action: { payload: { id: string } }) => {
            state.value = { ...state.value, users: [...state.value.users.filter((chat) => chat !== action.payload.id)] }
        },
        addNewMessage: (state, action: {
            payload: {
                message: sendMessageDto,
            }
        }) => {
            console.log(action.payload.message.imagesFile);
            
            if (action.payload.message.imagesFile && action.payload.message.imagesFile.length > 0) {
                
                messageApi.addImage(action.payload.message.imagesFile || []).then((images: string[]) => {
                    messageApi.send({...action.payload.message, images: images})
                })
            }else{
                console.log(action.payload.message);
                
                messageApi.send(action.payload.message)
            }
        },
        // connectToServer: (state) => {
        //     socket.emit("SEND_MESSAGE", "hello server")
        // },
        setMessages: (state, action: {payload: {messages: message[]}}) => {
            state.value.messages = [...action.payload.messages]
        }
    }
})

export const dataProviderActions = dataProviderSlice.actions
export default dataProviderSlice.reducer




