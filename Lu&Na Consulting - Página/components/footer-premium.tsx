"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, Mail, Phone, MapPin, Shield, Award, Globe } from "lucide-react"

const footerLinks = {
  portfolio: [
    { label: "Luxury Assets", href: "/stocks" },
    { label: "Real Estate", href: "/stocks?category=real-estate" },
    { label: "Private Equity", href: "/services" },
    { label: "Alternative Investments", href: "/services" },
  ],
  services: [
    { label: "Wealth Management", href: "/services" },
    { label: "Private Banking", href: "/services" },
    { label: "Investment Advisory", href: "/services" },
    { label: "Concierge Services", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Credentials", href: "#credentials" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Regulatory Disclosures", href: "/disclosures" },
    { label: "Risk Statements", href: "/risk" },
  ]
}

const contactInfo = [
  {
    icon: Phone,
    label: "Private Line",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: Mail,
    label: "Private Client Services",
    value: "private@lunaconsulting.com",
    href: "mailto:private@lunaconsulting.com"
  },
  {
    icon: MapPin,
    label: "Geneva Office",
    value: "Rue du Rhône 123, Geneva, CH",
    href: "#"
  }
]

const certifications = [
  { icon: Shield, label: "SEC Registered" },
  { icon: Award, label: "FINRA Member" },
  { icon: Globe, label: "IOSCO Compliant" },
]

export default function FooterPremium() {
  return (
    <footer className="relative bg-slate-950 border-t border-emerald-500/20">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.02),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              {/* Logo */}
              <div className="mb-6 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 blur-sm" />
                  <div className="relative rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-3">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                    Lu&Na
                  </span>
                  <span className="text-sm text-emerald-400 font-medium tracking-wider">
                    CONSULTING
                  </span>
                </div>
              </div>

              <p className="mb-6 text-slate-300 leading-relaxed">
                Exclusive access to ultra-premium assets and bespoke financial solutions 
                for the world's most discerning investors.
              </p>

              {/* Certifications */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                  Regulatory Excellence
                </h4>
                <div className="flex flex-wrap gap-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={cert.label}
                      className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2"
                    >
                      <cert.icon className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-slate-300">{cert.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-6">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(footerLinks).map(([category, links], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="mb-4 text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                      {category}
                    </h4>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-slate-400 transition-colors duration-200 hover:text-emerald-300"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h4 className="mb-4 text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                Private Access
              </h4>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="group flex items-start gap-3 transition-colors duration-200 hover:text-emerald-300"
                  >
                    <contact.icon className="mt-1 h-4 w-4 text-emerald-400 transition-colors group-hover:text-emerald-300" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">
                        {contact.label}
                      </div>
                      <div className="text-sm text-slate-300 group-hover:text-emerald-300">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-emerald-500/20 py-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 lg:flex-row">
            <div className="flex flex-wrap items-center gap-6">
              <span>© 2025 Lu&Na Consulting. All rights reserved.</span>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>SEC Registered Investment Advisor</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs">Assets Under Management:</span>
              <span className="font-semibold text-emerald-400">$500M+</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-800 bg-slate-950 py-4">
        <div className="container mx-auto max-w-7xl px-6">
          <p className="text-center text-xs text-slate-500 leading-relaxed">
            Investment advisory services offered through Lu&Na Consulting, a SEC registered investment advisor. 
            Past performance does not guarantee future results. All investments involve risk and may lose value.
          </p>
        </div>
      </div>
    </footer>
  )
}
