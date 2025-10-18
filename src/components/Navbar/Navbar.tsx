import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';

const baseLinkClass = 'rounded-md px-3 py-2 text-sm font-semibold transition';

const Navbar = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  const isLight = theme === 'light';

  const navBackground = isLight
    ? 'border-neutral-200 bg-white/95 text-neutral-900 supports-[backdrop-filter]:bg-white/80'
    : 'border-neutral-800 bg-neutral-950/90 text-white supports-[backdrop-filter]:bg-neutral-950/75';

  const activeClass = isLight
    ? 'bg-neutral-200 text-neutral-900'
    : 'bg-neutral-800 text-white';
  const inactiveClass = isLight ? 'text-neutral-500' : 'text-neutral-300';
  const hoverClass = isLight
    ? 'hover:bg-neutral-100 hover:text-neutral-900'
    : 'hover:bg-neutral-800 hover:text-white';

  return (
    <nav
      className={`border-b backdrop-blur transition-colors duration-300 ${navBackground}`}
    >
      <div
        className="flex w-full items-center justify-between py-4"
        style={{ paddingInline: '40px' }}
      >
        <Link
          to="/"
          className={`text-xl font-bold ${
            isLight ? 'text-neutral-900' : 'text-white'
          }`}
        >
          BookHaven
        </Link>
        <ul className="flex items-center gap-2">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/items', label: 'Items' },
            { to: '/collection', label: 'My Collection' },
            { to: '/about', label: 'About' },
          ].map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${baseLinkClass} ${
                    isActive ? activeClass : inactiveClass
                  } ${hoverClass}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className={`ml-2 flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${
                isLight
                  ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                  : 'border-neutral-700 text-white hover:bg-neutral-800'
              }`}
            >
              {isLight ? (
                <>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.75V3m0 18v-1.75M7.5 7.5 6.25 6.25m11.5 11.5L17.25 17.25M4.75 12H3m18 0h-1.75M7.5 16.5 6.25 17.75m11.5-11.5L17.75 6.25M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.12A8.998 8.998 0 1 1 9.88 3.75a6.5 6.5 0 1 0 10.37 10.37Z"
                    />
                  </svg>
                  Dark
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
