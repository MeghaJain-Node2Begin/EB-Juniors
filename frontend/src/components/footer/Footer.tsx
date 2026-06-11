"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

const quickLinks = ["Home", "About", "Courses", "Blog", "Contact"];
const classLinks = [
  { label: "Class 8th – 9th", href: "/classes#8th-9th" },
  { label: "Class 10th", href: "/classes#10th" },
  { label: "Class 11th – 12th", href: "/classes#11th-12th" },
  { label: "All Courses", href: "/courses" },
];
const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/ebjuniors", label: "Instagram" },
  { icon: FaFacebook, href: "https://www.facebook.com/ebjuniors", label: "Facebook" },
  { icon: FaYoutube, href: "https://www.youtube.com/@ebjuniors", label: "YouTube" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/ebjuniors", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 overflow-hidden bg-[#FDFBF7]"
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), rgba(52,211,153,0.6), rgba(16,185,129,0.4), transparent)",
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-emerald-200/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] rounded-full bg-green-200/50 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative h-16 group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/logo-new.png" 
                  alt="Extrabits Junior Logo" 
                  width={200}
                  height={200}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xl text-zinc-900">
                ExtraBits <span className="text-[#09BFB3]">Junior</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-600 leading-relaxed">
              Surat&apos;s trusted computer and coding institute for school students (Class 6–12). We teach Java, Python, Web Development, and Computer Fundamentals at City Light, Surat, Gujarat.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, rotate: 8, scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-zinc-200 bg-white text-zinc-500 hover:text-emerald-600 hover:border-emerald-500/30 hover:bg-emerald-50 transition-colors duration-300 hover:shadow-[0_4px_14px_rgba(16,185,129,0.15)]"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
                    className="group flex items-center gap-1.5 text-sm text-zinc-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-[1px] bg-emerald-400 transition-all duration-300 origin-left" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Classes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-widest">
              Classes
            </h4>
            <ul className="space-y-3">
              {classLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 text-sm text-zinc-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-[1px] bg-emerald-400 transition-all duration-300 origin-left" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-600 group">
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors duration-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <address className="not-italic leading-relaxed">
                  F-21, Agresen Point,<br />
                  Beside Agresen Bhavan,<br />
                  City Light, Surat, Gujarat 395007
                </address>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-600 group">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <a href="tel:+919510990292" className="hover:text-emerald-600 transition-colors">+91 95109 90292</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-600 group">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors duration-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <a href="mailto:extrabitsclasses@gmail.com" className="hover:text-emerald-600 transition-colors">extrabitsclasses@gmail.com</a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] w-full mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), rgba(0,0,0,0.1), rgba(0,0,0,0.06), transparent)",
          }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-zinc-600 font-medium">Extrabits Junior</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <Link
              href="/privacy"
              className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 group"
            >
              Privacy Policy
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/terms"
              className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 group"
            >
              Terms of Service
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Made with love */}
          <p className="text-xs text-zinc-400">
            Built with{" "}
            <span className="text-emerald-500 animate-pulse">♥</span> for young learners
          </p>
        </div>
      </div>
    </footer>
  );
}
