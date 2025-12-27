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
              {/* Wooden Box/Plaque Logo */}
              <div className="relative inline-block px-6 py-3 rounded-sm mb-4" style={{
                background: 'linear-gradient(180deg, #704214 0%, #8B5A2B 20%, #A0653A 50%, #8B5A2B 80%, #704214 100%)',
                border: '3px solid #4A2C0F',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 2px 1px rgba(255, 255, 255, 0.15), inset 0 -3px 5px rgba(0, 0, 0, 0.4)'
              }}>
                {/* Prominent wood grain texture */}
                <div className="absolute inset-0 rounded-sm opacity-30 pointer-events-none" style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px),
                    repeating-linear-gradient(90deg, rgba(139, 90, 43, 0.3) 0px, transparent 1px, transparent 3px, rgba(139, 90, 43, 0.3) 4px)
                  `,
                  mixBlendMode: 'multiply'
                }}></div>

                {/* Wood knot */}
                <div className="absolute top-2 right-8 w-3 h-2 rounded-full opacity-20" style={{
                  background: 'radial-gradient(ellipse, #3D1F0A 0%, transparent 70%)'
                }}></div>

                {/* Deep carved text */}
                <h3 className="relative font-serif text-xl font-bold" style={{
                  color: '#F4E4C1',
                  textShadow: '0 3px 5px rgba(0, 0, 0, 0.7), 0 -1px 1px rgba(255, 255, 255, 0.25), 1px 0 2px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.03em'
                }}>
                  Zeina's Corner
                </h3>

                {/* Large brass nails */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full" style={{
                  background: 'radial-gradient(circle at 30% 30%, #FFD700 0%, #DAA520 50%, #8B6914 100%)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}></div>
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{
                  background: 'radial-gradient(circle at 30% 30%, #FFD700 0%, #DAA520 50%, #8B6914 100%)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}></div>
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full" style={{
                  background: 'radial-gradient(circle at 30% 30%, #FFD700 0%, #DAA520 50%, #8B6914 100%)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}></div>
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full" style={{
                  background: 'radial-gradient(circle at 30% 30%, #FFD700 0%, #DAA520 50%, #8B6914 100%)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}></div>
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