import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './auth.service';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}   

// API METHODS CALLING TO OUR BACKEND. /////////////////////////////////////////////
// Register user to db. register() returns data from db so that we can store that data to our state.
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.message
        ) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

// Login user. login() returns data from db.
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log(user);
})



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;