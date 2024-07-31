"use client"

import React, { ComponentType } from 'react'
import { FormattedMessage, useIntl } from 'react-intl';

interface LanguageHook {
  lang: (title: string | void) => string;
  currentLang: string;
  FormattedLang: ComponentType<{ id: string }>;
}

export const useLanguage = (): LanguageHook => {
  const intl = useIntl();
  const lang = (title) => intl.formatMessage({ id: title })
  const currentLang: string = intl.locale;
  
  const FormattedLang: ComponentType<{ id: string }> = ({ id }) => (
    <FormattedMessage id={id} />
  );

  return { lang, currentLang, FormattedLang };
}