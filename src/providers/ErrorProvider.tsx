'use client'

import React, { ErrorInfo, ReactNode } from "react";
import Image from 'next/image';
import { Button } from '@mantine/core';

interface ErrorProviderProps {
  children: ReactNode;
}

interface ErrorProviderState {
  hasError: boolean;
  error: Error | null;
}

class ErrorProvider extends React.Component<ErrorProviderProps, ErrorProviderState> {
  constructor(props: ErrorProviderProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorProviderState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
  }

  render() {
    try {
      if (this.state.hasError) {
        return (
          <div className="bg-red-50 h-screen w-full flex flex-col items-center justify-center space-y-4">
            <Image 
              src="/images/writer.svg" 
              alt='Error' 
              priority
              width={250}
              height={250}
            />
            <h2 className="text-red-700 font-medium text-sm md:text-lg text-center mx-4">{'<'}We are sorry but we are experiencing instability in our application{'/>'}</h2>
            <p className="bg-slate-100 font-medium px-4 py-2 text-center flex items-center gap-1 text-sm"> Details: {this.state.error?.message}</p>
            <Button 
              type="button" 
              variant="contained"
              onClick={() => this.setState({ hasError: false })}
              className="flex items-center justify-center gap-1"
            >
              Try again?
            </Button>
          </div>
        );
      }

      return this.props.children;
    } catch (error) {
      console.error("Error caught by ErrorProvider:", error);
      return null;
    }
  }
}

export default ErrorProvider;