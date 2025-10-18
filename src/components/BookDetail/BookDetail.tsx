import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { BookListItem } from '../../Types/book';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBookDetail } from '../../store/slices/bookDetailSlice';
import { toggleBook } from '../../store/slices/collectionSlice';
import { showToast } from '../../store/slices/toastSlice';

const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.5 2.25h9a.75.75 0 0 1 .75.75v14.25l-5.25-3-5.25 3V3a.75.75 0 0 1 .75-.75Z"
    />
  </svg>
);

const BookDetail = () => {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  const bookDetail = useAppSelector((state) =>
    bookId ? state.bookDetail.entities[bookId] : undefined,
  );
  const status = useAppSelector(
    (state) => (bookId ? state.bookDetail.statusById[bookId] : 'idle'),
  );
  const errorMessage = useAppSelector(
    (state) => (bookId ? state.bookDetail.errorById[bookId] : null),
  );
  const isInCollection = useAppSelector((state) =>
    bookId ? Boolean(state.collection.items[bookId]) : false,
  );
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';

  useEffect(() => {
    if (!bookId) {
      return;
    }

    if (!bookDetail && (status === undefined || status === 'idle')) {
      void dispatch(fetchBookDetail(bookId));
    }
  }, [bookDetail, bookId, dispatch, status]);

  if (!bookId) {
    return (
      <div
        className={`space-y-4 text-center ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        <p className={isLight ? 'text-neutral-600' : 'text-zinc-300'}>
          ไม่พบรหัสหนังสือที่ต้องการ
        </p>
        <Link
          to="/"
          className={isLight ? 'text-neutral-500 hover:underline' : 'text-zinc-200 hover:underline'}
        >
          กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <p className={`text-center ${isLight ? 'text-neutral-600' : 'text-zinc-300'}`}>
        กำลังโหลดรายละเอียด...
      </p>
    );
  }

  if (status === 'failed') {
    return (
      <div
        className={`space-y-4 text-center ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        <p className={isLight ? 'text-neutral-600' : 'text-zinc-200'}>
          เกิดข้อผิดพลาด: {errorMessage ?? 'ไม่สามารถดึงข้อมูลหนังสือได้'}
        </p>
        <button
          type="button"
          onClick={() => dispatch(fetchBookDetail(bookId))}
          className={`rounded border px-4 py-2 text-sm font-semibold transition ${
            isLight
              ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              : 'border-zinc-600 text-white hover:bg-zinc-800'
          }`}
        >
          ลองอีกครั้ง
        </button>
        <Link
          to="/items"
          className={isLight ? 'block text-neutral-500 hover:underline' : 'block text-zinc-200 hover:underline'}
        >
          กลับไปหน้า Items
        </Link>
      </div>
    );
  }

  if (!bookDetail) {
    return (
      <div
        className={`space-y-4 text-center ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        <p className={isLight ? 'text-neutral-600' : 'text-zinc-300'}>
          ไม่พบข้อมูลหนังสือที่ต้องการ
        </p>
        <Link
          to="/items"
          className={isLight ? 'text-neutral-500 hover:underline' : 'text-zinc-200 hover:underline'}
        >
          กลับไปหน้า Items
        </Link>
      </div>
    );
  }

  const bookListItem: BookListItem = {
    id: bookDetail.id,
    title: bookDetail.title,
    imageUrl: bookDetail.imageUrl,
    year: bookDetail.firstPublishYear
      ? bookDetail.firstPublishYear.toString()
      : undefined,
    authors: [],
    loggedAt: bookDetail.firstPublishYear
      ? bookDetail.firstPublishYear.toString()
      : new Date().getFullYear().toString(),
    rating: undefined,
  };

  return (
    <article
      className={`mx-auto flex max-w-4xl flex-col gap-6 rounded-lg border p-6 shadow-lg md:flex-row transition-colors duration-300 ${
        isLight
          ? 'border-neutral-200 bg-white'
          : 'border-zinc-800 bg-black/60'
      }`}
    >
      <img
        src={bookDetail.imageUrl}
        alt={bookDetail.title}
        className="mx-auto w-full max-w-xs rounded-lg object-cover shadow-md md:mx-0"
      />
      <div className={`space-y-4 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
        <div>
          <h1 className="text-2xl font-bold">{bookDetail.title}</h1>
          {bookDetail.firstPublishYear && (
            <p className={`text-sm ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
              ปีที่ตีพิมพ์ครั้งแรก: {bookDetail.firstPublishYear}
            </p>
          )}
        </div>

        {bookDetail.description ? (
          <p className={`leading-relaxed ${isLight ? 'text-neutral-700' : 'text-zinc-200'}`}>
            {bookDetail.description}
          </p>
        ) : (
          <p className={`italic ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
            ไม่มีคำบรรยายสำหรับเรื่องนี้
          </p>
        )}

        {bookDetail.subjects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">หมวดหมู่</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {bookDetail.subjects.map((subject) => (
                <li
                  key={subject}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    isLight
                      ? 'border-neutral-300 text-neutral-600'
                      : 'border-zinc-700 text-zinc-200'
                  }`}
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              dispatch(toggleBook(bookListItem));
              dispatch(
                showToast({
                  message: isInCollection
                    ? 'นำหนังสือออกจากคอลเลกชันแล้ว'
                    : 'บันทึกหนังสือลงคอลเลกชันแล้ว',
                  type: isInCollection ? 'warning' : 'success',
                }),
              );
            }}
            aria-label={
              isInCollection ? 'นำออกจากคอลเลกชัน' : 'บันทึกเข้าคอลเลกชัน'
            }
            title={
              isInCollection ? 'นำออกจากคอลเลกชัน' : 'บันทึกเข้าคอลเลกชัน'
            }
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              isInCollection
                ? isLight
                  ? 'border-neutral-400 bg-neutral-900 text-white hover:bg-neutral-700'
                  : 'border-white bg-white text-black hover:bg-zinc-200'
                : isLight
                  ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                  : 'border-zinc-600 text-white hover:bg-zinc-800'
            }`}
          >
            <BookmarkIcon filled={isInCollection} />
          </button>
          <Link
            to="/items"
            className={`inline-flex items-center rounded border px-4 py-2 text-sm font-semibold transition ${
              isLight
                ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                : 'border-zinc-600 text-white hover:bg-zinc-800'
            }`}
          >
            ← กลับหน้า Items
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BookDetail;
