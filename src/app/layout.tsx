import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";
import Header from "@/components/header";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mom's Corner",
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
          "font-sans antialiased bg-stone-50 text-stone-900 flex flex-col min-h-screen"
        )}
      >
        <Header />

        <main className="flex-grow max-w-3xl mx-auto px-6 py-16 w-full animate-in fade-in duration-700">
          {children}
        </main>

        <footer className="w-full py-12 bg-white border-t border-stone-200 mt-auto">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-4">Mom's Corner</h3>
            <div className="flex justify-center space-x-6 text-stone-500 text-sm mb-8">
              <Link href="/" className="hover:text-stone-900">Home</Link>
              <Link href="/about" className="hover:text-stone-900">About</Link>
              <Link href="/contact" className="hover:text-stone-900">Contact</Link>
            </div>
            <p className="text-stone-400 text-xs">
              © {new Date().getFullYear()} Mom's Corner. Made with love.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}