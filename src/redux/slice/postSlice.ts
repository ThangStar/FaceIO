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
                let imid: string[] = []
                if(addPostDto.fileImages && addPostDto.fileImages.length){
                    imid = await postApi.addImage(addPostDto.fileImages)
                }
                const postRef = await postApi.add({ ...addPostDto,images: imid && imid.join(',')});
                return thunkAPI.fulfillWithValue(postRef)
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    ),
    getAllPost: createAsyncThunk<any>(
        'post',
        async (_, thunkAPI) => {
            try {
                const data = postApi.getAll()
                console.log("data",data);
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
            .addCase(action.getAllPost.fulfilled, (state, action: { payload: { posts: post[] } }) => {
                state.value = action.payload.posts
                toast("Đã get all");
            })
            .addCase(action.getAllPost.rejected, (state, action) => {
            })

    },
})

// Action creators are generated for each case reducer function
export const postAction = {
    ...postSlice.actions, ...action
}
export default postSlice.reducer



