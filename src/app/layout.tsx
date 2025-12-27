import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";
import Header from "@/components/header";

// Elegant vintage serif for headings - has that classic storefront feel
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"]
});

// Warm, readable serif for body text - perfect for vintage aesthetic
const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Zeina's Corner",
  description: "A cozy place for stories and thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={clsx(
          cormorant.variable,
          crimson.variable,
          "font-sans antialiased flex flex-col min-h-screen"
        )}
        style={{
          color: 'var(--color-vintage-teal-900)'
        }}
      >
        <Header />

        <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full animate-in fade-in duration-700">
          {children}
        </main>

        <footer className="w-full py-8 mt-auto" style={{
          backgroundColor: 'var(--color-vintage-teal-500)',
          borderTop: '4px solid var(--color-vintage-teal-700)',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-cream-300))' }}></div>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-cream-300)' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-cream-200)' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-cream-300)' }}></div>
              </div>
              <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, var(--color-cream-300), transparent)' }}></div>
            </div>

            <div className="text-center mb-6">
              {/* Logo sign in footer */}
              <div className="inline-block px-6 py-2.5 rounded-lg mb-4" style={{
                backgroundColor: 'var(--color-cream-100)',
                border: '2px solid var(--color-cream-400)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
              }}>
                <h3 className="font-serif text-xl font-bold" style={{
                  color: 'var(--color-vintage-teal-700)',
                  textShadow: '1px 1px 0 rgba(255, 255, 255, 0.4)'
                }}>
                  Zeina's Corner
                </h3>
                <p className="text-[0.65rem] italic font-light mt-0.5 opacity-75" style={{
                  color: 'var(--color-cream-700)'
                }}>
                  Mother, Artist, Professor, Entrepreneur
                </p>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-6" style={{ color: 'var(--color-cream-100)' }}>
                <Link href="/" className="hover:opacity-80 transition-opacity font-medium">Home</Link>
                <span style={{ color: 'var(--color-cream-300)' }}>•</span>
                <Link href="/books" className="hover:opacity-80 transition-opacity font-medium">Books</Link>
                <span style={{ color: 'var(--color-cream-300)' }}>•</span>
                <Link href="/papers" className="hover:opacity-80 transition-opacity font-medium">Papers</Link>
                <span style={{ color: 'var(--color-cream-300)' }}>•</span>
                <Link href="/courses" className="hover:opacity-80 transition-opacity font-medium">Courses</Link>
                <span style={{ color: 'var(--color-cream-300)' }}>•</span>
                <Link href="/hobbies" className="hover:opacity-80 transition-opacity font-medium">Hobbies</Link>
                <span style={{ color: 'var(--color-cream-300)' }}>•</span>
                <Link href="/about" className="hover:opacity-80 transition-opacity font-medium">About</Link>
                <span style={{ color: 'var(--color-cream-300)' }}>•</span>
                <Link href="/contact" className="hover:opacity-80 transition-opacity font-medium">Contact</Link>
              </nav>

              {/* Copyright */}
              <p className="text-xs" style={{ color: 'var(--color-cream-200)' }}>
                © {new Date().getFullYear()} Zeina's Corner. Made with love.
              </p>
            </div>

            {/* Decorative bottom line */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-cream-300))' }}></div>
              <div className="w-2 h-2 rotate-45 border" style={{ borderColor: 'var(--color-cream-300)' }}></div>
              <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, var(--color-cream-300), transparent)' }}></div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}