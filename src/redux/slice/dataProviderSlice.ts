import { socket } from '@/http/socket'
import { user } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'

export type DataProvider = {
    users: string[],
}

export const initialData: DataProvider = {
    users: []
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
                message: message,
                userId: number
            }
        }) => {
            // socket.emit("SEND_MESSAGE_TO_USER_ID", action.payload.message)
            // const index = state.value.chats.findIndex((chat) => chat.id === action.payload.userId);
            // const newChats = [...state.value.chats];
            // newChats[0].messages = [action.payload.message, ...newChats[0].messages ? [...newChats[0].messages] : []];
            // state.value = { ...state.value, chats: newChats };
        },
        connectToServer: (state) => {
            socket.emit("SEND_MESSAGE", "hello server")
        }
    }
})

export const dataProviderActions = dataProviderSlice.actions
export default dataProviderSlice.reducer




