import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';
import '@testing-library/jest-dom'
import en from '@/locales/en.json';
import { IntlProvider } from 'react-intl';

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={en}>
      {component}
    </IntlProvider>
  );
};

test('renders the Footer component', () => {
  renderWithIntl(<Footer />);
  
  const copyrightElement = screen.getByText(/Wayble\. All rights reserved\./i);
  expect(copyrightElement).toBeInTheDocument();
});