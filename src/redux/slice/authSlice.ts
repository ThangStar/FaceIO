import { authApi, loginDto, registerDto } from '@/firebase/api/auth.api'
import { Axios, http } from '@/http/http'
import { user } from '@/types/user'
import { saveToStorage } from '@/utils/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

const action = {
    register: createAsyncThunk(
        'auth/register',
        async (registerDto: registerDto, thunkAPI) => {
            console.log("registerDto: ", registerDto);
            (registerDto)
            try {
                const data = await authApi.register(registerDto)
                authApi.updateProfile({
                    displayName: registerDto.displayName,
                })
                return data
            } catch (error: any) {
                if (error.code == 'auth/email-already-in-use') {
                    return thunkAPI.rejectWithValue("Email đã được sử dụng")
                }
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    ),

    login: createAsyncThunk(
        'auth/login',
        async (loginDto: loginDto, thunkAPI) => {
            try {
                const data = await authApi.login(loginDto)
                return data
            } catch (error: any) {
                const errorCode = error.code;
                if (errorCode == 'auth/invalid-credential') {
                    return thunkAPI.rejectWithValue("Tài khoản hoặc mật khẩu không chính xác")
                }
                const errorMessage = error.message;
                return thunkAPI.rejectWithValue(errorMessage)
            }
        }
    ),
}

export const initialData: user = {
    id: 0,
    email: '',
    password: '',
    username: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: initialData
    },
    reducers: {
        logout: (state) => {
            state.value = initialData
        }
    },

    extraReducers: (builder) => {
        builder.addCase(action.register.fulfilled, (state, action) => {
            // Axios.token = action.payload
            toast("Tạo tài khoản thành công!");
            saveToStorage('token', action.payload)
        })
            .addCase(action.register.rejected, (state, action) => {
                toast.error(`Lỗi: ${action.payload}`);
            })
        builder.addCase(action.login.fulfilled, (state, action) => {
            // Axios.token = action.payload
            toast("Đăng nhập thành công");
            saveToStorage('idToken', action.payload)
        })
            .addCase(action.login.rejected, (state, action) => {
                toast.error(`Lỗi: ${action.payload}`);
            })
    },
})

// Action creators are generated for each case reducer function
export const authActions = {
    ...authSlice.actions, ...action
}
export default authSlice.reducer



