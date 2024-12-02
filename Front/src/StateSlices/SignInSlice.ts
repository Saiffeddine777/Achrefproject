import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import EnvUrl from "../EnvUrl"
import CookieManagement from "../Helpers/CookieManagement"


export interface UserSignedIn {
    address?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    occupation?: string,
    phonNumber?: string,
    role?: string
    token?: string,
    _id?: string
}

export interface SignedInStateInterface {
    status: 'waitingForRequest' | 'loading' | 'success' | 'failure',
    signedIn: UserSignedIn,
    error: any

}

export const signedInUser: SignedInStateInterface = {
    status: "waitingForRequest",
    signedIn: {},
    error: null

}




export const fetchUserAPIThunk = createAsyncThunk("user/signin", async (credentials: { email: string, password: string }, thunkAPI) => {
    try {
        const res = await axios.post(`${EnvUrl}/api/users/signin`, credentials ,{withCredentials:true})
        CookieManagement.setCookie("token" , res.data?.token , 1);
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


export const signedInUserSlice = createSlice({
    name: "signedInUser",
    initialState: signedInUser,
    reducers: {
      signOut :(state)=>{
        state ={
            status: "waitingForRequest",
            signedIn: {},
            error: null
        }
      }
    },
    extraReducers: ((builder) => {
        builder.
            addCase(fetchUserAPIThunk.pending, (state => {
                state.status = "loading"
            }))
            .addCase(fetchUserAPIThunk.fulfilled, (state, action) => {
                state.status = "success"
                state.signedIn = action.payload
                state.error = null
            })
            .addCase(fetchUserAPIThunk.rejected, (state, action) => {
                state.status = "failure"
                state.error = action.error.message || "an Error has Occured "
            })
    })
})
export const {signOut} = signedInUserSlice.actions
export default signedInUserSlice.reducer
