import { configureStore } from "@reduxjs/toolkit";
import bucketListReducer from "../features/bucketListSlice";
import placeReducer from "../features/placeSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bucketList: bucketListReducer,
    place: placeReducer,
  },
});
