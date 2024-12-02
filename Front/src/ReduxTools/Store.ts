import { configureStore, Store } from "@reduxjs/toolkit";
import signedInUserReducer from "../StateSlices/SignInSlice"

export const store :Store = configureStore({
    reducer:{
         signedInUser : signedInUserReducer
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
