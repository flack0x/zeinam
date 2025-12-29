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

        <footer className="w-full py-12 mt-auto" style={{
          backgroundColor: '#4d888a',
          borderTop: '4px solid #325b5d',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              {/* Elegant Text Logo */}
              <Link href="/" className="inline-block mb-6 group">
                <h3 className="font-serif text-3xl font-bold tracking-wide" style={{
                  color: '#F5E6D3',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  Zeina's Corner
                </h3>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #F5E6D3)' }}></div>
                  <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#F5E6D3' }}></div>
                  <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #F5E6D3, transparent)' }}></div>
                </div>
              </Link>

              {/* Navigation Grid - Professional Layout */}
              <div className="grid grid-cols-3 gap-8 mb-8 max-w-3xl mx-auto">
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