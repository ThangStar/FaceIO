import { Axios, http } from '@/http/http'
import { socket } from '@/http/socket'
import { createSlice } from '@reduxjs/toolkit'


export const initialData: user = {
    id: 0,
    username: '',
}
export type registerDto = { username: string, email: string, password: string, displayName: string }

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: initialData
    },
    reducers: {
        handleActionLogin: (state, action: { payload: { username: string, password: string } }) => {
            http.post("/auth/login", action.payload).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })
        },
        handleActionRegister: (state, action: { payload: registerDto }) => {
            http.post("/auth/register", action.payload).then((res) => {
                console.log("data", res.data);
                if(res.data){
                    Axios.token = res.data
                }
                return res.data
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
        }
    }
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions
export default authSlice.reducer




