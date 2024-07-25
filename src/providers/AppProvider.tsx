'use client';

import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { JobProvider } from '@/context/JobContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider>
          <Notifications />
          <JobProvider>
            {children}
          </JobProvider>
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
