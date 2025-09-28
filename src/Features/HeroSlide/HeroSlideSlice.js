import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import heroSlideService from "./HeroSlideService";

const initialState = {
    heroSlides: [],
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    isMessage: "",
}

// Create new hero slide
export const createHeroSlide = createAsyncThunk("heroSlide/create", async (formData, thunkAPI) => {
    try {
        console.log(formData)
        return await heroSlideService.createHeroSlide(formData)
    } catch (error) {
        console.log("error :", error)

        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all hero slides
export const getHeroSlides = createAsyncThunk("heroSlide/getAll", async (_, thunkAPI) => {
    try {
        return await heroSlideService.getHeroSlides()
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteHeloSlide = createAsyncThunk("heroSlide/delete", async(id, thunkAPI) => {
    try {
        return await heroSlideService.deleteHeroSlides(id)
    } catch (error) {
         const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const heroSlideSlice = createSlice({
    name: "heroSlide",
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
            .addCase(createHeroSlide.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHeroSlide.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.heroSlides.push(action.payload)
            })
            .addCase(createHeroSlide.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isMessage = action.payload
            })
            .addCase(getHeroSlides.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHeroSlides.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.heroSlides = action.payload
                // console.log("Fetched hero slides:", action.payload)
            })
            .addCase(getHeroSlides.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = heroSlideSlice.actions
export default heroSlideSlice.reducer