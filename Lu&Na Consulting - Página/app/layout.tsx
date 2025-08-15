import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import PageTransition from "@/components/page-transition"
import BackgroundVisual from "@/components/background-visual"
import { FocusProvider } from "@/components/ui/focus-overlay"
import ErrorBoundary from "@/components/error-boundary"
import ClientErrorSuppression from "@/components/client-error-suppression"

export const metadata: Metadata = {
  title: "Lu&Na Consulting",
  description: "B2B brokerage: we connect verified buyers and sellers.",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0b1411] text-white antialiased">
        <ErrorBoundary>
          <ClientErrorSuppression />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <BackgroundVisual />
            <FocusProvider>
              <PageTransition>{children}</PageTransition>
            </FocusProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
