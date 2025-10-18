import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  BookListItem,
  OpenLibraryEntry,
  OpenLibraryListResponse,
} from '../../Types/book';

const API_URL = 'https://openlibrary.org/people/mekBot/books/want-to-read.json';
const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/500x750.png?text=No+Image';

const extractAuthors = (entry: OpenLibraryEntry): string[] => {
  const work = entry.work;
  if (!work) {
    return [];
  }

  if (Array.isArray(work.author_names) && work.author_names.length > 0) {
    return work.author_names;
  }

  if (Array.isArray(work.author_name) && work.author_name.length > 0) {
    return work.author_name;
  }

  return [];
};

const deriveYear = (entry: OpenLibraryEntry): string | undefined => {
  const workYear = entry.work?.first_publish_year;
  if (workYear) {
    return workYear.toString();
  }

  if (entry.logged_date) {
    const match = entry.logged_date.match(/\d{4}/);
    if (match) {
      return match[0];
    }
  }

  return undefined;
};

const mapEntryToBook = (entry: OpenLibraryEntry): BookListItem | null => {
  const work = entry.work;

  if (!work?.key || !work.title) {
    return null;
  }

  const imageUrl = work.cover_id
    ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`
    : PLACEHOLDER_IMAGE;

  const normalizedId = work.key.replace(/^\/works\//, '');

  return {
    id: normalizedId,
    title: work.title,
    imageUrl,
    year: deriveYear(entry),
    authors: extractAuthors(entry),
    rating: work.rating?.average,
    loggedAt: entry.logged_date ?? undefined,
  };
};

export const fetchBooks = createAsyncThunk<BookListItem[]>(
  'books/fetchBooks',
  async () => {
    const response = await axios.get<OpenLibraryListResponse>(API_URL);
    const data = response.data;
    const mappedBooks =
      data.reading_log_entries
        ?.map(mapEntryToBook)
        .filter((book): book is BookListItem => Boolean(book)) ?? [];

    return mappedBooks.slice(0, 30);
  },
);

type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type BooksState = {
  items: BookListItem[];
  status: FetchStatus;
  error: string | null;
};

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ?? 'เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ';
      });
  },
});

export const booksReducer = booksSlice.reducer;
