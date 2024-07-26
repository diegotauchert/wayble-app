import React from 'react';

export const Footer = (): React.ReactElement => (
  <footer className="md:flex text-center items-center justify-center py-4">
    <p className="text-sm text-gray-600 dark:text-slate-400">
      &copy; {new Date().getFullYear()} Wayble. All rights reserved.
    </p>
  </footer>
);