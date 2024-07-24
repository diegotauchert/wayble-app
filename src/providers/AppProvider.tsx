'use client';

import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { JobProvider } from '@/context/JobContext';

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider>
        <Notifications />
          <JobProvider>
            {children}
          </JobProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
