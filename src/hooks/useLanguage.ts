import { useContext } from 'react';
import {
  type CallbackSetTranslation,
  type CallbackTranslation,
  LocalizationContext,
} from '../locales/localizationContext';

export const useLanguage = (): [
  CallbackTranslation,
  CallbackSetTranslation,
] => {
  const { t, setLocale } = useContext(LocalizationContext);
  return [t, setLocale];
};
