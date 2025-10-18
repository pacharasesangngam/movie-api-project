import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard/BookCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearCollection,
  toggleBook,
} from '../store/slices/collectionSlice';
import { showToast } from '../store/slices/toastSlice';

const CollectionPage = () => {
  const dispatch = useAppDispatch();
  const collectionItemsMap = useAppSelector((state) => state.collection.items);
  const collectionItems = useMemo(
    () => Object.values(collectionItemsMap),
    [collectionItemsMap],
  );
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';

  const handleToggle = (book: typeof collectionItems[number]) => {
    dispatch(toggleBook(book));
    dispatch(
      showToast({
        message: 'นำหนังสือออกจากคอลเลกชันแล้ว',
        type: 'warning',
      }),
    );
  };

  if (collectionItems.length === 0) {
    return (
      <section
        className={`w-full py-10 text-center ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        <h1 className="text-3xl font-bold">คอลเลกชันของฉัน</h1>
        <p className={`mt-4 ${isLight ? 'text-neutral-600' : 'text-zinc-400'}`}>
          คุณยังไม่ได้บันทึกหนังสือไว้เลย ลองเลือกหนังสือที่สนใจจากหน้า Items
          แล้วบันทึกเก็บไว้ได้เลย
        </p>
        <Link
          to="/items"
          className={`mt-6 inline-block rounded border px-6 py-3 text-sm font-semibold transition ${
            isLight
              ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              : 'border-zinc-600 text-white hover:bg-zinc-800'
          }`}
        >
          ไปที่หน้า Items
        </Link>
      </section>
    );
  }

  return (
    <section
      className={`w-full py-8 ${
        isLight ? 'text-neutral-900' : 'text-white'
      }`}
    >
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">คอลเลกชันของฉัน</h1>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearCollection())}
          className={`rounded border px-4 py-2 text-sm font-semibold transition ${
            isLight
              ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              : 'border-zinc-600 text-white hover:bg-zinc-800'
          }`}
        >
          ลบคอลเลกชันทั้งหมด
        </button>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {collectionItems.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            isInCollection
            onToggleCollection={() => handleToggle(book)}
            variantIndex={index}
          />
        ))}
      </div>
    </section>
  );
};

export default CollectionPage;
