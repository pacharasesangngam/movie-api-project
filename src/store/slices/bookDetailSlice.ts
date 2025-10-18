import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  BookDetail,
  OpenLibraryWorkDetail,
  OpenLibraryDescription,
} from '../../Types/book';

const API_BASE_URL = 'https://openlibrary.org';
const COVERS_BASE_URL = 'https://covers.openlibrary.org/b/id';
const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/640x960.png?text=No+Cover';

const getDescriptionText = (
  description?: OpenLibraryDescription,
): string | undefined => {
  if (!description) {
    return undefined;
  }

  if (typeof description === 'string') {
    return description;
  }

  return description.value;
};

const mapDetail = (detail: OpenLibraryWorkDetail): BookDetail => {
  const firstCoverId = detail.covers?.[0];

  return {
    id: detail.key.replace(/^\/works\//, ''),
    title: detail.title,
    description: getDescriptionText(detail.description),
    imageUrl: firstCoverId
      ? `${COVERS_BASE_URL}/${firstCoverId}-L.jpg`
      : PLACEHOLDER_IMAGE,
    subjects: detail.subjects ?? [],
    firstPublishYear: detail.first_publish_year,
  };
};

export const fetchBookDetail = createAsyncThunk<BookDetail, string>(
  'bookDetail/fetchBookDetail',
  async (bookId: string) => {
    const response = await axios.get<OpenLibraryWorkDetail>(
      `${API_BASE_URL}/works/${bookId}.json`,
    );
    const data = response.data;
    return mapDetail(data);
  },
);

type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type BookDetailState = {
  entities: Record<string, BookDetail>;
  statusById: Record<string, FetchStatus>;
  errorById: Record<string, string | null>;
};

const initialState: BookDetailState = {
  entities: {},
  statusById: {},
  errorById: {},
};

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetail.pending, (state, action) => {
        const bookId = action.meta.arg;
        state.statusById[bookId] = 'loading';
        state.errorById[bookId] = null;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        const bookId = action.payload.id;
        state.entities[bookId] = action.payload;
        state.statusById[bookId] = 'succeeded';
        state.errorById[bookId] = null;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        const bookId = action.meta.arg;
        state.statusById[bookId] = 'failed';
        state.errorById[bookId] =
          action.error.message ?? 'เกิดข้อผิดพลาดในการดึงรายละเอียด';
      });
  },
});

export const bookDetailReducer = bookDetailSlice.reducer;
