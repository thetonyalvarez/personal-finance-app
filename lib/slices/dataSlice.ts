import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  processedData: any;
}

const initialState: DataState = {
  processedData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setProcessedData: (state, action: PayloadAction<any>) => {
      state.processedData = action.payload;
    },
  },
});

export const { setProcessedData } = dataSlice.actions;
export default dataSlice.reducer;