import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookListItem } from '../../Types/book';

const STORAGE_KEY = 'book-collection';

const loadFromStorage = (): Record<string, BookListItem> => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, BookListItem>;
    if (!parsed) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).map(([id, item]) => [
        id,
        {
          ...item,
          year: item.year ?? (item.loggedAt ? item.loggedAt.match(/\d{4}/)?.[0] : undefined),
        },
      ]),
    );
  } catch {
    return {};
  }
};

const saveToStorage = (items: Record<string, BookListItem>) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage write errors
  }
};

type CollectionState = {
  items: Record<string, BookListItem>;
};

const initialState: CollectionState = {
  items: loadFromStorage(),
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookListItem>) => {
      state.items[action.payload.id] = action.payload;
      saveToStorage(state.items);
    },
    removeBook: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      saveToStorage(state.items);
    },
    toggleBook: (state, action: PayloadAction<BookListItem>) => {
      const id = action.payload.id;
      if (state.items[id]) {
        delete state.items[id];
      } else {
        state.items[id] = action.payload;
      }
      saveToStorage(state.items);
    },
    clearCollection: (state) => {
      state.items = {};
      saveToStorage(state.items);
    },
  },
});

export const { addBook, removeBook, toggleBook, clearCollection } =
  collectionSlice.actions;
export const collectionReducer = collectionSlice.reducer;
