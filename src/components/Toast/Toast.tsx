import { useEffect } from 'react';
import { hideToast } from '../../store/slices/toastSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const darkStyles: Record<string, string> = {
  success: 'border-emerald-500/60 bg-emerald-900/80 text-emerald-100',
  info: 'border-sky-500/60 bg-sky-900/80 text-sky-100',
  warning: 'border-amber-500/60 bg-amber-900/80 text-amber-100',
};

const lightStyles: Record<string, string> = {
  success: 'border-emerald-400/60 bg-emerald-50 text-emerald-800',
  info: 'border-sky-400/60 bg-sky-50 text-sky-800',
  warning: 'border-amber-400/60 bg-amber-50 text-amber-800',
};

const Toast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast);
  const theme = useAppSelector((state) => state.theme.mode);
  const palette = theme === 'light' ? lightStyles : darkStyles;

  useEffect(() => {
    if (!toast.visible) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch(hideToast());
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [dispatch, toast.visible]);

  if (!toast.visible || !toast.message) {
    return null;
  }

  const style = palette[toast.type] ?? palette.info;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center px-4 sm:justify-end sm:px-6">
      <div
        className={`pointer-events-auto flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur ${style}`}
      >
        <span className="text-sm font-medium">{toast.message}</span>
        <button
          type="button"
          onClick={() => dispatch(hideToast())}
          className={`pointer-events-auto text-xs uppercase tracking-wide transition ${
            theme === 'light'
              ? 'text-neutral-600 hover:text-neutral-800'
              : 'text-white/80 hover:text-white'
          }`}
        >
          ปิด
        </button>
      </div>
    </div>
  );
};

export default Toast;
