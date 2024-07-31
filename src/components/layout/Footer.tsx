"use client"

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer = (): React.ReactElement => {
  const { FormattedLang } = useLanguage();

  return (
    <footer className="md:flex text-center items-center justify-center py-4">
      <p className="text-sm text-gray-600 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Wayble. <FormattedLang id="text.copyright" />.
      </p>
    </footer>
  )
}