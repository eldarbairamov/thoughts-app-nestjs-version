import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   error: string | undefined
}

const initialState: IInitialState = {
   error: undefined
}

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setError: (state, { payload }) => {
         state.error = payload
      }
   }
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions