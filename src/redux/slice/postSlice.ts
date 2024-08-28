import { addPostDto, postApi } from '@/firebase/api/post.api'
import { post } from '@/types/post'
import { saveToStorage } from '@/utils/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const action = {
    addPost: createAsyncThunk(
        'post/add',
        async (addPostDto: addPostDto, thunkAPI) => {
            try {
                const data = await postApi.add(addPostDto)
                return data
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    ),
    getAllPost: createAsyncThunk(
        'post',
        async (_, thunkAPI) => {
            try {
                const data = await postApi.getAll()
                return data
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    ),
}

export const initialData: post[] = []

export const postSlice = createSlice({
    name: 'auth',
    initialState: {
        value: initialData
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(action.addPost.fulfilled, (state, action) => {
            // Axios.token = action.payload
            toast("Đã đăng");
            saveToStorage('token', action.payload)
        })
            .addCase(action.addPost.rejected, (state, action) => {
                toast.error(`Lỗi: ${action.payload}`);
            })
    },
})

// Action creators are generated for each case reducer function
export const postAction = {
    ...postSlice.actions, ...action
}
export default postSlice.reducer



