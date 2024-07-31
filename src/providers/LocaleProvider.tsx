'use client'

import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import en from '@/locales/en.json';
import pt from '@/locales/pt-BR.json';

type ILocaleProviderProps = {
  children: ReactNode;
}

const supportedLocales = {
  en,
  pt,
};
const defaultLocale = 'en';

export default function LocaleProvider({ children }: ILocaleProviderProps) {
  const [locale, setLocale] = useState<string>(defaultLocale);

  useLayoutEffect(() => {
    const browserLocale = navigator.language.split(/[-_]/)[0];
    setLocale(supportedLocales[browserLocale] ? browserLocale : defaultLocale);
  }, []);

  const messages = supportedLocales[locale] || supportedLocales[defaultLocale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}