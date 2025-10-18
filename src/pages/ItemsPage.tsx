import { useState } from 'react';
import BookList from '../components/Booklist/BookList';
import { useAppSelector } from '../store/hooks';

const ItemsPage = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const sortClasses = isLight
    ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
    : 'border-zinc-600 text-white hover:bg-zinc-800';

  return (
    <section
      className={`w-full py-8 ${
        isLight ? 'text-neutral-900' : 'text-white'
      }`}
    >
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">รายการหนังสือ</h1>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className={`rounded border px-4 py-2 text-sm font-semibold transition ${sortClasses}`}
          >
            จัดเรียงตามปีที่พิมพ์: {sortOrder === 'desc' ? 'ใหม่ → เก่า' : 'เก่า → ใหม่'}
          </button>
        </div>
      </header>
      <BookList sortOrder={sortOrder} />
    </section>
  );
};

export default ItemsPage;
