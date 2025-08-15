"use client"

import { useClipboardErrorSuppression } from './error-boundary'
import { useEffect } from 'react'

export default function ClientErrorSuppression() {
  // Use the clipboard error suppression hook
  useClipboardErrorSuppression()

  // Additional client-side error suppression
  useEffect(() => {
    // Override console.error to filter out clipboard errors
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      
      // Skip clipboard-related errors
      if (
        message.includes('NotAllowedError') ||
        message.includes('Clipboard') ||
        message.includes('writeText') ||
        message.includes('permissions policy') ||
        message.includes('414348233')
      ) {
        return
      }
      
      // Log other errors normally
      originalConsoleError.apply(console, args)
    }

    // Override console.warn for clipboard warnings
    const originalConsoleWarn = console.warn
    console.warn = (...args) => {
      const message = args.join(' ')
      
      // Skip clipboard-related warnings
      if (
        message.includes('Clipboard') ||
        message.includes('writeText') ||
        message.includes('permissions policy')
      ) {
        return
      }
      
      // Log other warnings normally
      originalConsoleWarn.apply(console, args)
    }

    // Cleanup function
    return () => {
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    }
  }, [])

  // Suppress React DevTools warnings
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable React DevTools clipboard functionality
      try {
        Object.defineProperty(navigator, 'clipboard', {
          value: undefined,
          writable: false,
        })
      } catch (e) {
        // Silently ignore if we can't override
      }
    }
  }, [])

  return null
}
