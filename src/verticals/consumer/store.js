import { configureStore } from "@reduxjs/toolkit";
import addToCartSlice  from "./Feature/AddToCartSlice/Slice"
import  historyCartSlice  from "./Feature/History/Slice";

const store=configureStore({
    reducer:{
        addToCart:addToCartSlice,
        history:historyCartSlice
    }
});
export default store;