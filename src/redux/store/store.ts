import { configureStore } from '@reduxjs/toolkit'
import { dataProviderSlice } from '../slice/dataProviderSlice'
import { authSlice } from '../slice/authSlice'
export default configureStore({
    reducer: {
        dataProvider: dataProviderSlice.reducer,
        authSlice: authSlice.reducer
    }
})