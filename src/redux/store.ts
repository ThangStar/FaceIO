import { configureStore } from '@reduxjs/toolkit'
import { dataProviderSlice } from './dataProviderSlice'
export default configureStore({
    reducer: {
        dataProvider: dataProviderSlice.reducer
    }
})