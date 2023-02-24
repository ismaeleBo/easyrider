import React, { type FC, type ReactNode, createContext } from 'react';
import { NativeModules, Platform } from 'react-native';
import { I18n } from 'i18n-js';
import en from './values/en';
import it from './values/it';

const languages = { en, it };

export type DeepKeys<T, S extends string> = T extends Record<string, unknown>
  ? S extends `${infer I1}.${infer I2}`
    ? I1 extends keyof T
      ? `${I1}.${DeepKeys<T[I1], I2>}`
      : keyof T & string
    : S extends keyof T
    ? `${S}`
    : keyof T & string
  : '';

export type LanguagesType = keyof typeof languages;
export type LocalizationKeys = keyof typeof en;
export type CallbackTranslation = <S extends string>(
  scope: DeepKeys<typeof en, S>,
  options?: Record<string, unknown>,
) => string;
export type CallbackSetTranslation = (language: LanguagesType) => void;

interface LocalizationContextProps {
  t: CallbackTranslation;
  setLocale: CallbackSetTranslation;
}

export const sanitizeLanguage = (code: string) => {
  if (code) {
    const splitOnDash = code.split('-');
    if (splitOnDash.length !== 1) {
      return splitOnDash[0]?.toLowerCase();
    }
    const splitOnUnderscore = code.split('_');
    if (splitOnUnderscore.length !== 1) {
      return splitOnUnderscore[0]?.toLowerCase();
    }
  }
  return null;
};

export const retrieveDeviceLanguage = (): string | null | undefined => {
  if (Platform.OS === 'ios') {
    const iosLang =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
    return sanitizeLanguage(iosLang);
  }
  if (Platform.OS === 'android') {
    const androidLang = NativeModules.I18nManager.localeIdentifier;
    return sanitizeLanguage(androidLang);
  }
  return null;
};

export const getStartLocale = (defaultLanguage: LanguagesType = 'en') => {
  const deviceLanguage = retrieveDeviceLanguage();
  if (deviceLanguage && languages[deviceLanguage as LanguagesType]) {
    return deviceLanguage;
  }

  return defaultLanguage;
};

const i18n = new I18n(languages, {
  defaultLocale: getStartLocale(),
  locale: getStartLocale(),
});

const providerOptions: LocalizationContextProps = {
  t: (scope, options = {}) => i18n.t(scope, options),
  setLocale: (lang: LanguagesType) => (i18n.locale = lang),
};

export const LocalizationContext =
  createContext<LocalizationContextProps>(providerOptions);

export const LocalizationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <LocalizationContext.Provider value={providerOptions}>
    {children}
  </LocalizationContext.Provider>
);
