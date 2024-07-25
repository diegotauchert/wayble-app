'use client'

import React, { ErrorInfo, ReactNode } from "react";
import { ErrorBoundaries } from "@/components/widgets/ErrorBoundaries";

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

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  }

  render() {
    try {
      if (this.state.hasError) {
        return (
          <ErrorBoundaries error={this.state.error} onRetry={this.handleRetry} />
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