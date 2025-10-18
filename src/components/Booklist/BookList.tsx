import { useEffect, useMemo } from 'react';
import BookCard from '../BookCard/BookCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBooks } from '../../store/slices/booksSlice';
import { toggleBook } from '../../store/slices/collectionSlice';
import { showToast } from '../../store/slices/toastSlice';
import type { BookListItem } from '../../Types/book';

type BookListProps = {
  sortOrder?: 'asc' | 'desc';
};

const parseYear = (year?: string) => {
  if (!year) {
    return undefined;
  }
  const asNumber = Number.parseInt(year, 10);
  return Number.isNaN(asNumber) ? undefined : asNumber;
};

const BookList = ({ sortOrder = 'desc' }: BookListProps) => {
  const dispatch = useAppDispatch();
  const { items: books, status, error } = useAppSelector(
    (state) => state.books,
  );
  const collectionItems = useAppSelector((state) => state.collection.items);
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';

  const sortedBooks = useMemo(() => {
    const copy = [...books];
    copy.sort((a, b) => {
      const yearA = parseYear(a.year);
      const yearB = parseYear(b.year);

      if (yearA === undefined && yearB === undefined) {
        return 0;
      }
      if (yearA === undefined) {
        return 1;
      }
      if (yearB === undefined) {
        return -1;
      }

      return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
    });
    return copy;
  }, [books, sortOrder]);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <p className={`text-center ${isLight ? 'text-neutral-600' : 'text-zinc-300'}`}>
        กำลังโหลดข้อมูล...
      </p>
    );
  }

  if (status === 'failed') {
    return (
      <div
        className={`space-y-4 text-center ${
          isLight ? 'text-neutral-700' : 'text-zinc-200'
        }`}
      >
        <p>
          เกิดข้อผิดพลาด: {error ?? 'ไม่สามารถดึงข้อมูลหนังสือได้'}
        </p>
        <button
          type="button"
          onClick={() => dispatch(fetchBooks())}
          className={`rounded border px-4 py-2 text-sm font-semibold transition ${
            isLight
              ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              : 'border-zinc-600 text-white hover:bg-zinc-800'
          }`}
        >
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  if (sortedBooks.length === 0) {
    return (
      <p
        className={`text-center ${
          isLight ? 'text-neutral-600' : 'text-zinc-300'
        }`}
      >
        ยังไม่มีหนังสือสำหรับแสดงผล
      </p>
    );
  }

  const handleToggle = (book: BookListItem, currentlySaved: boolean) => {
    dispatch(toggleBook(book));
    dispatch(
      showToast({
        message: currentlySaved
          ? 'นำหนังสือออกจากคอลเลกชันแล้ว'
          : 'บันทึกหนังสือลงคอลเลกชันแล้ว',
        type: currentlySaved ? 'warning' : 'success',
      }),
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {sortedBooks.map((book, index) => (
        <BookCard
          key={book.id}
          book={book}
          isInCollection={Boolean(collectionItems[book.id])}
          onToggleCollection={() =>
            handleToggle(book, Boolean(collectionItems[book.id]))
          }
          variantIndex={index}
        />
      ))}
    </div>
  );
};

export default BookList;
