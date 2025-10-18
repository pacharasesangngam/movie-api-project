import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'info' | 'warning';

type ToastState = {
  message: string | null;
  type: ToastType;
  visible: boolean;
};

type ShowToastPayload = {
  message: string;
  type?: ToastType;
};

const initialState: ToastState = {
  message: null,
  type: 'info',
  visible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
      state.visible = true;
    },
    hideToast: (state) => {
      state.visible = false;
    },
    clearToast: (state) => {
      state.message = null;
      state.visible = false;
    },
  },
});

export const { showToast, hideToast, clearToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
