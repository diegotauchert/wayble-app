import { render, screen } from '@testing-library/react';
import JobDetails from '../src/app/jobs/[id]/page';
import { JobProvider } from '@/context/JobContext';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('renders job details', async () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { id: '1' },
  }));

  render(
    <JobProvider>
      <JobDetails />
    </JobProvider>
  );
  expect(await screen.findByText('Job 1')).toBeInTheDocument();
  expect(await screen.findByText('Lorem Ipsum')).toBeInTheDocument();
});
