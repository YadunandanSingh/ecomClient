
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice.js";
import  heroSlideSlice  from "../Features/HeroSlide/HeroSlideSlice.js";
import categoryReducer from "../Features/category/categorySlice.js"
import  ProductSlice  from "../Features/products/ProductSlice.jsx";
import  getAllPaymentData  from "../Features/Payment/PaymentSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        heroSlide: heroSlideSlice,
        category: categoryReducer,
        Product: ProductSlice,
        Payment: getAllPaymentData,

    },
});
