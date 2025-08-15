"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Ignore clipboard API errors
    if (
      error.name === 'NotAllowedError' ||
      error.message.includes('Clipboard') ||
      error.message.includes('writeText') ||
      error.message.includes('permissions policy')
    ) {
      console.debug('Clipboard API error suppressed:', error.message)
      return { hasError: false }
    }
    
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Ignore clipboard-related errors
    if (
      error.name === 'NotAllowedError' ||
      error.message.includes('Clipboard') ||
      error.message.includes('writeText') ||
      error.message.includes('permissions policy')
    ) {
      return
    }
    
    // Log other errors
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback
      
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={this.state.error}
            reset={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
            <p className="mb-4 text-slate-400">
              {this.state.error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// Hook to suppress clipboard errors
export function useClipboardErrorSuppression() {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.name === 'NotAllowedError' ||
        event.message?.includes('Clipboard') ||
        event.message?.includes('writeText') ||
        event.message?.includes('permissions policy')
      ) {
        event.preventDefault()
        event.stopPropagation()
        console.debug('Clipboard error suppressed:', event.message)
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      if (
        reason?.name === 'NotAllowedError' ||
        reason?.message?.includes('Clipboard') ||
        reason?.message?.includes('writeText') ||
        reason?.message?.includes('permissions policy')
      ) {
        event.preventDefault()
        console.debug('Clipboard promise rejection suppressed:', reason.message)
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
}
