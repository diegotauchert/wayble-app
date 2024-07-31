import { ReactNode } from "react";
import type { Metadata } from "next";
import { Archivo } from 'next/font/google'
import '@/styles/globals.css'
import '@mantine/core/styles.css';
import { cn } from "@/lib/utils"
import AppProvider from '@/providers/AppProvider';

const archivo = Archivo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wayble - Jobs & Resources for International Students',
  description: 'Diverse Early Talent Recruitment · Employer Learning Hub · Meet Candidates Now. Contact Send us an email at: hello@joinwayble.com',
  keywords: 'Wayble, Jobs & Resources, International Students, Talent Recruitment, Canada Recruitment',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content='#FFFFFF' />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta property="og:title" content="Wayble - Jobs & Resources for International Students" />
        <meta property="og:description" content="Diverse Early Talent Recruitment · Employer Learning Hub · Meet Candidates Now. Contact Send us an email at: hello@joinwayble.com" />
        <meta property="og:image" content="/images/logo.png" />
        <link rel="canonical" href="https://wayble-app.vercel.app" />
      </head>

      <body
        className={cn(
          "bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-200 bg-no-repeat bg-cover min-h-screen font-sans antialiased",
          archivo.className
        )}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
