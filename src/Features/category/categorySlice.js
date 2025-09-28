import  { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import categoryService from "./categoryService"

const initialState={
    category : [],

    isMessage:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
}

export const getCategory = createAsyncThunk("category/getAll" ,async (FormData, thunkAPI) =>     {
    try {
        
        return await categoryService.getcategory(FormData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.msg ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const createCategory = createAsyncThunk("category/create" ,async (FormData, thunkAPI) =>     {
    try {
        console.log(FormData)
        return await categoryService.Createcategory(FormData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const DeleteCategory = createAsyncThunk("category/delete" ,async (id, thunkAPI) =>     {
    try {
       
        return await categoryService.deleteCategory(id)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const updateCategory = createAsyncThunk("category/update" ,async (formData ,thunkAPI) =>     {
    try {
       console.log('id and data', formData.data)
        return await categoryService.UpadteCategory(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})


export const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        reset:(state) =>{
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state. isMessage = ''
        }
    },

    extraReducers: (builder) =>{
        builder
        // getcategory
        .addCase(getCategory.pending , (state) => {
            state.isLoading = true
        })
        .addCase(getCategory.fulfilled, (state ,action) => {
            state.isSuccess = true,
            state.isLoading = false,
            state.category = action.payload
        })
        .addCase(getCategory.rejected, (state,action) => {
            state.isError = true,
            state.isSuccess = false,
            state.isLoading = false,
           state.isMessage = action.payload
        })

        // create category
        .addCase(createCategory.pending , (state) => {
            state.isLoading = true
        })
        .addCase(createCategory.fulfilled, (state ,action) => {
            state.isSuccess = true,
            state.isLoading = false,
            state.isMessage = action.payload
        })
        .addCase(createCategory.rejected, (state,action) => {
            state.isError = true,
            state.isSuccess = false,
            state.isLoading = false,
           state.isMessage = action.payload
        })
        // delete
        .addCase(DeleteCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(DeleteCategory.fulfilled, (state ,action) => {
            state.isSuccess = true,
            state.isLoading = false,
            state.isMessage = action.payload
        })
        .addCase(DeleteCategory.rejected, (state,action) => {
            state.isError = true,
            state.isSuccess = false,
            state.isLoading = false,
           state.isMessage = action.payload
        })

        // updateCategory
        .addCase(updateCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateCategory.fulfilled, (state ,action) => {
            state.isSuccess = true,
            state.isLoading = false,
            state.isMessage = action.payload
        })
        .addCase(updateCategory.rejected, (state,action) => {
            state.isError = true,
            state.isSuccess = false,
            state.isLoading = false,
           state.isMessage = action.payload
        })
        
    }

})

export const {reset} = CategorySlice.actions
export default CategorySlice.reducer
