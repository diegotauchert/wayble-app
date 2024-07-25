import React, { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout//Footer';
import { Container, Paper } from '@mantine/core';

export const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="flex flex-col justify-center items-center mx-auto w-11/12 md:w-10/12">
      <Header />
        <Paper shadow="lg" p="xl" radius="lg" className="w-full min-h-[calc(100dvh-200px)]">
          <Container fluid m={0} p={0} className="h-full">
            {children}
          </Container>
        </Paper>
      <Footer />
    </main>
  )
}