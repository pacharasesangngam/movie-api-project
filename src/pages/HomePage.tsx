import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks } from '../store/slices/booksSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const bookStatus = useAppSelector((state) => state.books.status);
  const books = useAppSelector((state) => state.books.items);
  const totalBooks = books.length;
  const collectionCount = useAppSelector(
    (state) => Object.keys(state.collection.items).length,
  );
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';

  const featuredBooks = useMemo(() => books.slice(0, 5), [books]);

  useEffect(() => {
    if (bookStatus === 'idle') {
      void dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  return (
    <section
      className={`w-full space-y-10 py-10 ${
        isLight ? 'text-neutral-900' : 'text-white'
      }`}
    >
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1 space-y-6">
          <p
            className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
              isLight
                ? 'border-neutral-300 text-neutral-600'
                : 'border-zinc-700 text-zinc-300'
            }`}
          >
            คลังหนังสือออนไลน์
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            WEB แสดงรายการหนังสือจาก Open Library API
          </h1>
          <p className={isLight ? 'text-neutral-600' : 'text-zinc-300'}>
            ค้นหาไอเดียการอ่านเล่มใหม่ บันทึกหนังสือโปรดไว้ในคอลเลกชันส่วนตัว
            ข้อมูลทุกอย่างถูกเก็บไว้บนเครื่องของคุณด้วย local storage
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/items"
              className={`rounded-md border px-6 py-3 text-sm font-semibold transition ${
                isLight
                  ? 'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700'
                  : 'border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              เริ่มสำรวจหนังสือ
            </Link>
            <Link
              to="/collection"
              className={`rounded-md border px-6 py-3 text-sm font-semibold transition ${
                isLight
                  ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                  : 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ดูคอลเลกชันของฉัน
            </Link>
          </div>
        </div>
        <div
          className={`flex-1 space-y-4 rounded-xl border p-6 shadow-lg transition-colors duration-300 ${
            isLight
              ? 'border-neutral-200 bg-white'
              : 'border-zinc-800 bg-black/60'
          }`}
        >
          <h2 className="text-xl font-semibold">สรุปรายละเอียด</h2>
          <div className={isLight ? 'space-y-3 text-neutral-600' : 'space-y-3 text-zinc-300'}>
            <p>
              • หนังสือทั้งหมดในระบบตอนนี้{' '}
              <span className="font-semibold text-current">{totalBooks}</span> รายการ
            </p>
            <p>
              • หนังสือที่บันทึกไว้{' '}
              <span className="font-semibold text-current">{collectionCount}</span>{' '}
              รายการ
            </p>
            <p className={isLight ? 'text-sm text-neutral-500' : 'text-sm text-zinc-400'}>
              เคล็ดลับ: เพิ่มหนังสือที่สนใจลงในคอลเลกชันเพื่อกลับมาดูทีหลัง และติดตามหมวดหมู่ที่ชอบได้ง่ายขึ้น
            </p>
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl border p-6 shadow-lg transition-colors duration-300 ${
          isLight ? 'border-neutral-200 bg-white' : 'border-zinc-800 bg-black/60'
        }`}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold">หนังสือแนะนำ</h2>
          <p className={`text-sm ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
            ระบบเลือกมาแสดงสูงสุด 5 เล่มจากข้อมูลล่าสุดที่ดึงจาก Open Library
          </p>
        </div>

        {bookStatus === 'loading' ? (
          <p className={isLight ? 'text-neutral-600' : 'text-zinc-300'}>
            กำลังเตรียมรายการแนะนำ...
          </p>
        ) : featuredBooks.length === 0 ? (
          <p className={isLight ? 'text-neutral-600' : 'text-zinc-300'}>
            ยังไม่มีหนังสือสำหรับแนะนำ
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className={`flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition ${
                  isLight
                    ? 'border-neutral-200 bg-white hover:border-neutral-300'
                    : 'border-zinc-700 bg-black/60 hover:border-zinc-500'
                }`}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="h-52 w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-base font-semibold">{book.title}</h3>
                  {book.authors && book.authors.length > 0 && (
                    <p className={`text-xs ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
                      ผู้แต่ง: {book.authors.join(', ')}
                    </p>
                  )}
                  <p className={`text-xs ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
                    ปีที่พิมพ์: {book.year ?? 'ไม่ระบุ'}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <Link
                      to={`/book/${book.id}`}
                      className={`rounded-md border px-3 py-1 text-xs font-semibold transition ${
                        isLight
                          ? 'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700'
                          : 'border-white text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
