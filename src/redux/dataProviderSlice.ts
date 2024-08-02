import { socket } from '@/http/socket'
import { createSlice } from '@reduxjs/toolkit'

export type DataProvider = {
    chats: user[],
}

export const initialData: DataProvider = {
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
        }
    ],
}

export const dataProviderSlice = createSlice({
    name: 'counter',
    initialState: {
        value: initialData
    },
    reducers: {
        addNewChat: (state, action: { payload: user }) => {
            state.value = { ...state.value, chats: [...state.value.chats, action.payload] }
        },
        removeChat: (state, action: { payload: { id: number } }) => {
            state.value = { ...state.value, chats: [...state.value.chats.filter((chat) => chat.id !== action.payload.id)] }
        },
        addNewMessage: (state, action: {
            payload: {
                message: message,
                userId: number
            }
        }) => {
            socket.emit("SEND_MESSAGE_TO_USER_ID", action.payload.message)
            const index = state.value.chats.findIndex((chat) => chat.id === action.payload.userId);
            const newChats = [...state.value.chats];
            newChats[0].messages = [action.payload.message, ...newChats[0].messages ? [...newChats[0].messages] : []];
            state.value = { ...state.value, chats: newChats };
        },
        connectToServer: (state) => {
            socket.emit("SEND_MESSAGE", "hello server")
        }
    }
})

// Action creators are generated for each case reducer function
export const dataProviderActions = dataProviderSlice.actions
export default dataProviderSlice.reducer




