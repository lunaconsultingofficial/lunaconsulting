"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, Shield, Award } from "lucide-react"

const navItems = [
  { href: "#featured", label: "Portfolio" },
  { href: "/stocks", label: "Exclusive Assets" },
  { href: "/services", label: "Private Services" },
  { href: "#contact", label: "Contact" },
]

export default function NavbarPremium() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.95)"]
  )
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 z-50 w-full border-b border-white/10 transition-all duration-300"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 blur-sm" />
              <div className="relative rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Lu&Na
              </span>
              <span className="text-xs text-emerald-400 font-medium tracking-wider">
                CONSULTING
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="group relative px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:text-emerald-300"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 rounded-lg bg-emerald-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex items-center gap-4"
          >
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="h-4 w-4" />
              <span>Private Client</span>
            </div>
            <Button 
              asChild
              size="sm"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2 font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
            >
              <Link href="#contact" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Access Portfolio</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-12 transition-transform duration-700 group-hover:translate-x-[100%]" />
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2 text-white transition-colors duration-200 hover:text-emerald-400"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl md:hidden"
      >
        <div className="px-6 py-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-lg font-medium text-slate-300 transition-colors duration-200 hover:text-emerald-400"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: isOpen ? 0.4 : 0 }}
            className="pt-4 border-t border-white/10"
          >
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold shadow-lg"
            >
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                Access Portfolio
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
