import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";
import Header from "@/components/header";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-sans" });

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
          playfair.variable,
          lato.variable,
          "font-sans antialiased flex flex-col min-h-screen"
        )}
        style={{
          backgroundColor: 'var(--color-cream-50)',
          color: 'var(--color-vintage-teal-900)'
        }}
      >
        <Header />

        <main className="flex-grow max-w-3xl mx-auto px-6 py-16 w-full animate-in fade-in duration-700">
          {children}
        </main>

        <footer className="w-full py-12 mt-auto" style={{
          backgroundColor: 'var(--color-cream-200)',
          borderTop: '1px solid var(--color-cream-300)'
        }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="font-serif text-xl font-bold mb-4" style={{ color: 'var(--color-vintage-teal-800)' }}>Zeina's Corner</h3>
            <div className="flex justify-center space-x-6 text-sm mb-8" style={{ color: 'var(--color-vintage-teal-600)' }}>
              <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
              <Link href="/about" className="hover:opacity-80 transition-opacity">About</Link>
              <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-cream-600)' }}>
              © {new Date().getFullYear()} Zeina's Corner. Made with love.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}