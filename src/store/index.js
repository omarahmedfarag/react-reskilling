import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import booksSlice from './books-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, books: booksSlice.reducer },
});

export default store;
