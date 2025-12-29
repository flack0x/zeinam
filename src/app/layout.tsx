import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";
import Header from "@/components/header";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('auth')?.value === 'true'

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
        <Header isAuthenticated={isAuthenticated} />

        <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full animate-in fade-in duration-700">
          {children}
        </main>

        <footer className="w-full py-10 mt-auto" style={{
          backgroundColor: '#4d888a',
          borderTop: '4px solid #325b5d',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
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

              {/* Navigation Grid - Professional Layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
                <div>
                  <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: '#F5E6D3' }}>Explore</h4>
                  <div className="space-y-2">
                    <Link href="/" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Home</Link>
                    <Link href="/books" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Books</Link>
                    <Link href="/papers" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Papers</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: '#F5E6D3' }}>Learn</h4>
                  <div className="space-y-2">
                    <Link href="/courses" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Courses</Link>
                    <Link href="/hobbies" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Hobbies</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: '#F5E6D3' }}>Connect</h4>
                  <div className="space-y-2">
                    <Link href="/about" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>About</Link>
                    <Link href="/contact" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Contact</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: '#F5E6D3' }}>Follow</h4>
                  <div className="space-y-2">
                    <a href="https://t.me/observer_5" target="_blank" rel="noopener noreferrer" className="block text-sm hover:translate-x-1 transition-transform" style={{ color: '#e4d5c0' }}>Telegram</a>
                  </div>
                </div>
              </div>

              {/* Copyright & Divider */}
              <div className="pt-6 border-t" style={{ borderColor: '#325b5d' }}>
                <p className="text-xs text-center" style={{ color: '#c7e6e8' }}>
                  © {new Date().getFullYear()} Zeina's Corner. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}