"use client"

import { createContext, useContext, useState, type PropsWithChildren } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

type FocusState = { open: boolean; src: string; alt: string }
const Ctx = createContext<{ set: (s: FocusState) => void } | null>(null)

export function FocusProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<FocusState>({ open: false, src: "", alt: "" })
  return (
    <Ctx.Provider value={{ set: setState }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setState({ open: false, src: "", alt: "" })}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 aspect-[4/3] w-[min(92vw,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Image src={state.src || "/placeholder.svg"} alt={state.alt} fill className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

export function FocusImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const ctx = useContext(Ctx)
  return (
    <button
      type="button"
      className={className}
      onClick={() => ctx?.set({ open: true, src, alt })}
      aria-label="Ampliar imagen"
    />
  )
}
