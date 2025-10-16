import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import navigationReducer from './slices/navigationSlice';
import editReducer from './slices/editSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    navigation: navigationReducer,
    edit: editReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
