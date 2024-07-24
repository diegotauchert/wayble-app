import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Home from '../src/app/page';
import { JobProvider } from '@/context/JobContext';

expect.extend({ toBeInTheDocument });

test('renders job listings', async () => {
  render(
    <JobProvider>
      <Home />
    </JobProvider>
  );
  expect(screen.getByText('Job Listings')).toBeInTheDocument();
  expect(await screen.findByText('Job 1')).toBeInTheDocument();
});
