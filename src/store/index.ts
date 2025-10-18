import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './slices/booksSlice';
import { bookDetailReducer } from './slices/bookDetailSlice';
import { collectionReducer } from './slices/collectionSlice';
import { toastReducer } from './slices/toastSlice';
import { themeReducer } from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    bookDetail: bookDetailReducer,
    collection: collectionReducer,
    toast: toastReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
