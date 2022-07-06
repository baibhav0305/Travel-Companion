import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  place: "",
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    clear: (state) => initialState,
    addPlace: (state, action) => {
      state.place = action.payload;
    },
  },
});

export const { clear, addPlace } = placeSlice.actions;
export const getPlace = (state) => state.place;
export default placeSlice.reducer;
