"use client"

import { motion } from "framer-motion"
import { Shield, Award, Globe, TrendingUp, Users, Lock } from "lucide-react"

const credentials = [
  {
    icon: Shield,
    title: "SEC Registered",
    description: "Securities and Exchange Commission approved advisor",
    value: "RIA-7442"
  },
  {
    icon: Award,
    title: "Private Banking",
    description: "Exclusive partnership with leading institutions",
    value: "Tier 1"
  },
  {
    icon: Globe,
    title: "International",
    description: "Licensed across 25+ jurisdictions",
    value: "Global"
  },
  {
    icon: Lock,
    title: "Assets Protected",
    description: "Client assets under institutional custody",
    value: "$500M+"
  },
  {
    icon: Users,
    title: "Ultra-HNW Clients",
    description: "Minimum investable assets requirement",
    value: "$10M+"
  },
  {
    icon: TrendingUp,
    title: "Track Record",
    description: "Consistent outperformance since inception",
    value: "15+ Years"
  }
]

const partnerships = [
  "Swiss Private Bank",
  "Institutional Custody Services",
  "Global Investment Platform",
  "Regulatory Compliance Partner"
]

export default function CredentialsSection() {
  return (
    <section className="relative py-24 bg-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.03),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            <span className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Trusted Excellence
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300">
            Regulated, licensed, and trusted by the world's most discerning investors. 
            Our credentials represent decades of institutional excellence.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential, index) => (
            <motion.div
              key={credential.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500/20">
                  <credential.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-white">{credential.title}</h3>
                <p className="mb-4 text-sm text-slate-400 leading-relaxed">{credential.description}</p>
                
                {/* Value Badge */}
                <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                  {credential.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-slate-800/30 to-slate-900/30 p-8 backdrop-blur-sm"
        >
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-semibold text-white">
              Institutional Partnerships
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {partnerships.map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4 text-sm text-slate-300"
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-slate-400">Regulatory Compliance</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-emerald-400">AAA</div>
            <div className="text-sm text-slate-400">Credit Rating</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-emerald-400">24/7</div>
            <div className="text-sm text-slate-400">Concierge Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
