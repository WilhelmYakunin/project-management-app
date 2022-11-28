import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

import translate from '../utils/translate';
import { setLocale } from '../features/locales/localeSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTranslate = () => {
  const lang = useAppSelector((state) => state.locale.lang);
  const dispatch = useAppDispatch();
  const setLang = useCallback((lang: string) => dispatch(setLocale(lang)), []);

  const t = useCallback(
    (text: string, number: number | undefined = undefined) => {
      return translate(lang, text, number);
    },
    [lang]
  );

  return { lang, setLang, t };
};
