import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PaymentService from './paymentService';

const initialState = {
    Payment: '',

    isError: false,
    isSuccess: false,
    isLoading: false,
    isMessage: "",
};

export const getAllPaymentData = createAsyncThunk("getAllPaymentData/getAll", async (_, thunkAPI) => {
    try {
        return await PaymentService.getAllPaymentData()
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const UpdateSippmentStatus = createAsyncThunk("UpdateSippmentStatus/Update", async (formData, thunkAPI) => {
    try {
        console.log('UpdateSippmentStatus',formData)
        return await PaymentService.UpdateSippmentStatus(formData)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const PaymentSlice = createSlice({
    name: 'Payment',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isMessage = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPaymentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPaymentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.Payment = action.payload;
            })
            .addCase(getAllPaymentData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isMessage = action.payload;
               
            })
            // UpdateSippmentStatus
            .addCase(UpdateSippmentStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateSippmentStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.Payment = action.payload;
                // console.log('slice check ',action.payload )
            })
            .addCase(UpdateSippmentStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isMessage = action.payload;
               
            })
    }
})

export const { reset } = PaymentSlice.actions;
export default PaymentSlice.reducer;