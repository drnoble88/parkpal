import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const parkSearchSlice = createSlice({
  name: "parkSearch",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = initialState.value;
    },
    search: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { reset, search } = parkSearchSlice.actions;

export default parkSearchSlice.reducer;
