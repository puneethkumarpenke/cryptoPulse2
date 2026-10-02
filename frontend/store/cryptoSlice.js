import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchMarkets = createAsyncThunk("crypto/fetchMarkets", async () => {
  const { data } = await api.get("/crypto/markets");
  return data.data || [];
});

const slice = createSlice({
  name: "crypto",
  initialState: { coins: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMarkets.pending, s => { s.loading = true; s.error = null; })
      .addCase(fetchMarkets.fulfilled, (s, a) => { s.loading = false; s.coins = a.payload; })
      .addCase(fetchMarkets.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  }
});
export default slice.reducer;
