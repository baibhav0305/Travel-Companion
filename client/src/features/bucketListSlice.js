import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bucketList: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createBucketList = createAsyncThunk(
  "bucketList/createBucketList",
  async (place, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await axios.post(
        "/api/bucketList",
        { place },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBucketList = createAsyncThunk(
  "bucketList/getBucketList",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await axios.get("/api/bucketList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBucketList = createAsyncThunk(
  "bucketList/deleteBucketList",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await axios.delete(`/api/bucketList/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bucketListSlice = createSlice({
  name: "bucketList",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createBucketList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBucketList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bucketList = action.payload;
      })
      .addCase(createBucketList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBucketList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBucketList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bucketList = action.payload;
      })
      .addCase(getBucketList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBucketList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBucketList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bucketList = state.bucketList.filter(
          (bucketList) => bucketList._id !== action.payload.id
        );
      })
      .addCase(deleteBucketList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bucketListSlice.actions;
export const getBucketListItems = (state) => state.bucketList;
export default bucketListSlice.reducer;
