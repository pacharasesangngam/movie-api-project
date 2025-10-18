import { Link } from 'react-router-dom';
import type { BookListItem } from '../../Types/book';
import { useAppSelector } from '../../store/hooks';

type BookCardProps = {
  book: BookListItem;
  isInCollection?: boolean;
  onToggleCollection?: () => void;
  variantIndex?: number;
};

type VariantConfig = {
  container: string;
  heading: string;
  meta: string;
  hoverShadow: string;
  buttonDefault: string;
  buttonActive: string;
};

const DARK_VARIANTS: VariantConfig[] = [
  {
    container:
      'border border-sky-500/40 bg-sky-950/50',
    heading: 'text-white',
    meta: 'text-sky-100/80',
    hoverShadow: 'hover:shadow-sky-500/30',
    buttonDefault:
      'border-sky-500/60 text-sky-200 hover:bg-sky-500 hover:text-sky-950',
    buttonActive:
      'border-sky-300 bg-sky-300 text-sky-950 hover:bg-sky-200',
  },
  {
    container:
      'border border-emerald-500/40 bg-emerald-950/50',
    heading: 'text-white',
    meta: 'text-emerald-100/80',
    hoverShadow: 'hover:shadow-emerald-500/30',
    buttonDefault:
      'border-emerald-500/60 text-emerald-200 hover:bg-emerald-500 hover:text-emerald-950',
    buttonActive:
      'border-emerald-300 bg-emerald-300 text-emerald-950 hover:bg-emerald-200',
  },
  {
    container:
      'border border-fuchsia-500/40 bg-fuchsia-950/50',
    heading: 'text-white',
    meta: 'text-fuchsia-100/80',
    hoverShadow: 'hover:shadow-fuchsia-500/30',
    buttonDefault:
      'border-fuchsia-500/60 text-fuchsia-200 hover:bg-fuchsia-500 hover:text-fuchsia-950',
    buttonActive:
      'border-fuchsia-300 bg-fuchsia-300 text-fuchsia-950 hover:bg-fuchsia-200',
  },
  {
    container:
      'border border-amber-500/40 bg-amber-950/50',
    heading: 'text-white',
    meta: 'text-amber-100/80',
    hoverShadow: 'hover:shadow-amber-500/30',
    buttonDefault:
      'border-amber-500/60 text-amber-200 hover:bg-amber-500 hover:text-amber-950',
    buttonActive:
      'border-amber-300 bg-amber-300 text-amber-950 hover:bg-amber-200',
  },
];

const LIGHT_VARIANTS: VariantConfig[] = [
  {
    container: 'border border-sky-400/40 bg-sky-50',
    heading: 'text-sky-900',
    meta: 'text-sky-700',
    hoverShadow: 'hover:shadow-sky-200',
    buttonDefault:
      'border-sky-400 text-sky-600 hover:bg-sky-500 hover:text-white',
    buttonActive:
      'border-sky-600 bg-sky-600 text-white hover:bg-sky-500',
  },
  {
    container: 'border border-emerald-400/40 bg-emerald-50',
    heading: 'text-emerald-900',
    meta: 'text-emerald-700',
    hoverShadow: 'hover:shadow-emerald-200',
    buttonDefault:
      'border-emerald-400 text-emerald-600 hover:bg-emerald-500 hover:text-white',
    buttonActive:
      'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500',
  },
  {
    container: 'border border-fuchsia-400/40 bg-fuchsia-50',
    heading: 'text-fuchsia-900',
    meta: 'text-fuchsia-700',
    hoverShadow: 'hover:shadow-fuchsia-200',
    buttonDefault:
      'border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-500 hover:text-white',
    buttonActive:
      'border-fuchsia-600 bg-fuchsia-600 text-white hover:bg-fuchsia-500',
  },
  {
    container: 'border border-amber-400/40 bg-amber-50',
    heading: 'text-amber-900',
    meta: 'text-amber-700',
    hoverShadow: 'hover:shadow-amber-200',
    buttonDefault:
      'border-amber-400 text-amber-600 hover:bg-amber-500 hover:text-white',
    buttonActive:
      'border-amber-600 bg-amber-600 text-white hover:bg-amber-500',
  },
];

const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/500x750.png?text=No+Image';

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

const BookCard = ({
  book,
  isInCollection = false,
  onToggleCollection,
  variantIndex = 0,
}: BookCardProps) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const imageSrc = book.imageUrl || PLACEHOLDER_IMAGE;
  const isLight = theme === 'light';
  const palettes = isLight ? LIGHT_VARIANTS : DARK_VARIANTS;
  const variant = palettes[variantIndex % palettes.length];
  const baseContainerClass = isLight
    ? 'bg-white shadow-md hover:-translate-y-1'
    : 'bg-black/40 shadow-lg hover:-translate-y-1';
  const borderTopClass = isLight
    ? 'border-neutral-200 bg-white'
    : 'border-white/5 bg-black/40';
  const displayYear = book.year ?? (book.loggedAt ? book.loggedAt.match(/\d{4}/)?.[0] : undefined);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border transition-transform duration-300 ease-in-out hover:shadow-xl ${baseContainerClass} ${variant.container} ${variant.hoverShadow}`}
    >
      <Link to={`/book/${book.id}`} className="group block">
        <img
          src={imageSrc}
          alt={book.title}
          className="aspect-[2/3] h-auto w-full object-cover"
        />
        <div className="p-3">
          <h3
            className={`truncate text-md font-bold transition-colors duration-300 ${
              isLight ? '' : 'group-hover:text-white'
            } ${variant.heading}`}
          >
            {book.title}
          </h3>
          {book.authors && book.authors.length > 0 && (
            <p className={`mt-1 text-xs font-medium ${variant.meta}`}>
              {book.authors.join(', ')}
            </p>
          )}
          <div
            className={`mt-2 flex items-center text-sm ${variant.meta}`}
          >
            <p>ปีที่พิมพ์: {displayYear ?? 'ไม่ระบุ'}</p>
          </div>
        </div>
      </Link>
      {onToggleCollection && (
        <div className={`border-t p-3 ${borderTopClass}`}>
          <button
            type="button"
            onClick={onToggleCollection}
            aria-label={
              isInCollection ? 'นำออกจากคอลเลกชัน' : 'บันทึกเข้าคอลเลกชัน'
            }
            title={
              isInCollection ? 'นำออกจากคอลเลกชัน' : 'บันทึกเข้าคอลเลกชัน'
            }
            className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
              isInCollection ? variant.buttonActive : variant.buttonDefault
            }`}
          >
            <BookmarkIcon filled={isInCollection} />
          </button>
        </div>
      )}
    </article>
  );
};

export default BookCard;
