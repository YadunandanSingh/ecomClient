import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const token = JSON.parse(localStorage.getItem("token"))
console.log("Initial token from localStorage:", token)

const initialState = {
    user: null,
    token:  null,
    isAuthenticated: token ? true : false,
    isAdmin: false,
    cart: [],
    address: [],

    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}
                console.log('auth sclic e',initialState.cart)

// Register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        console.log("error :", error)

        const message =
            (error.response.data.msg )  ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const data = await authService.login(user);
        // console.log('✅ Login successful, API response data:', data); // <-- ADD THIS LOG
        // thunkAPI.dispatch(getUser());
        return data; 
    } catch (error) {
        console.log("error :", error)
        const message =
            (error.response.data.msg ) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getUser = createAsyncThunk("auth/userInfo", async (_, thunkAPI) => {
    try {
        const userInfo = await authService.getUser()
        
        return userInfo
    } catch (error) {
        const message =
           (error.response.data.msg ) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
    const data = await authService.logout()
    console.log("Logging out user...",data)
})

export const addCart = createAsyncThunk("auth/userCart" ,async (formData ,thunkAPI) =>     {
    try {
       console.log('cart slice', formData)
        return await authService.AddCart(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
        error.message ||
        error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const updateCartQuntity = createAsyncThunk("auth/updateQuntity" ,async (formData ,thunkAPI) =>     {
    try {
       console.log('cart slice', formData)
        return await authService.AddQuantity(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
        error.message ||
        error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const removeCartItem = createAsyncThunk("auth/removeCartItem" ,async (formData ,thunkAPI) =>     {
    try {
       console.log('cart slice', formData)
        return await authService.RemoveCartItem(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
        error.message ||
        error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

// addAddress
export const addAddress = createAsyncThunk("auth/addAddress" ,async (formData ,thunkAPI) =>     {
    try {
       console.log('addAddress slice', formData)
        return await authService.AddAddress(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
        error.message ||
        error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})

export const RemoveAddress = createAsyncThunk("auth/RemoveAddress" ,async (formData ,thunkAPI) =>     {
    try {
       console.log('RemoveAddress slice', formData)
        return await authService.RemoveAddress(formData)
    } catch (error) {
        const message = (error.response && error.response.data  ) ||
        error.message ||
        error.toString()
          return thunkAPI.rejectWithValue(message)
    }
})



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.token = action.payload.accessToken
                state.isAuthenticated = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.token = null
                state.isAuthenticated = false
            })
            // login cases
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
                // state.token = action.payload.accessToken
                state.isAuthenticated = true
                
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.token = null
                state.isAuthenticated = false
            })
            // logout cases
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.isAuthenticated = false
            })
            // get user cases
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isAdmin = action.payload.role == 0 ? false : true
                state.cart = action.payload.cart
                state.address = action.payload.address

                // console.log('auth sclic e',state.Cart)
                
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.token = null
                state.isAuthenticated = false
            })
            // addCart
            .addCase(addCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cart = action.payload.user.cart
                console.log('add cart fullfiled',action.payload)
            })
            .addCase(addCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
               
            })
            // updateCartQuntity
             .addCase(updateCartQuntity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCartQuntity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cart = action.payload.user.cart
                console.log('add cart fullfiled',action.payload)
            })
            .addCase(updateCartQuntity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
               
            })
            // removeCartItem
             .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cart = action.payload.user.cart
                console.log('add cart fullfiled',action.payload)
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
               
            })
            // addAddress
             .addCase(addAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.address = action.payload.user.address
                console.log('add cart fullfiled',action.payload)
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
               
            })
            // removeAddress
             .addCase(RemoveAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(RemoveAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.address = action.payload.user.address
                
            })
            .addCase(RemoveAddress.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
               
            })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer