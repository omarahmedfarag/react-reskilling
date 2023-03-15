import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { loadingSpinner:false},
  reducers: {
    toggle(state) {
      state.loadingSpinner = !state.loadingSpinner;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
