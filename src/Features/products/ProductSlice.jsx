import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "./ProductService";

const initialState = {
    products: [],

    isMessage: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const getProduct = createAsyncThunk("product/getAll", async (thunkAPI) => {
    try {

        return await ProductService.getProduct()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createProduct = createAsyncThunk("product/create" ,async (FormData, thunkAPI) =>     {
    try {
        console.log(FormData)
        return await ProductService.CreateProduct(FormData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const DeleteProduct = createAsyncThunk("product/delete" ,async (id, thunkAPI) =>     {
    try {
       console.log(id)
        return await ProductService.deleteProduct(id)
    } catch (error) {
        console.log(error)
        const message = (error.response && error.response.data  ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const updateProduct = createAsyncThunk("product/update" ,async (formData ,thunkAPI) =>     {
    try {
    //    console.log('id and data', formData)
        return await ProductService.UpadteProduct(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
         error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
                state.isSuccess = false,
                state.isLoading = false,
                state.isMessage = ''
        }

    },
    extraReducers: (builder) => {
        builder
            // getProduct
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isSuccess = true,
                    state.isLoading = false,
                    state.products = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isError = true,
                    state.isSuccess = false,
                    state.isLoading = false,
                    state.isMessage = action.payload
            })
            // create Product 
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isSuccess = true,
                    state.isLoading = false,
                    state.products = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isError = true,
                    state.isSuccess = false,
                    state.isLoading = false,
                    state.isMessage = action.payload
            })
            // delete products
             .addCase(DeleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.isSuccess = true,
                    state.isLoading = false,
                    state.products = action.payload
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                state.isError = true,
                    state.isSuccess = false,
                    state.isLoading = false,
                    state.isMessage = action.payload
            })
            // update product
              .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isSuccess = true,
                    state.isLoading = false,
                    state.products = action.payload
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isError = true,
                    state.isSuccess = false,
                    state.isLoading = false,
                    state.isMessage = action.payload
            })
    }
})

export const { reset } = ProductSlice.actions
export default ProductSlice.reducer