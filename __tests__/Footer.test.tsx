import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

test('renders the Footer component', () => {
  render(<Footer />);
  
  const copyrightElement = screen.getByText(/Wayble\. All rights reserved\./i);
  expect(copyrightElement).toBeInTheDocument();
});