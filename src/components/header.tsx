'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, UserCircle } from 'lucide-react';
import AuthModal from './auth-modal';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="group relative py-1 transition-colors"
      style={{
        color: isActive ? 'var(--color-vintage-teal-600)' : 'var(--color-vintage-teal-500)'
      }}
    >
      {children}
      <span
        className="absolute left-0 bottom-0 h-0.5 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: 'var(--color-vintage-teal-600)',
          width: isActive ? '100%' : '0'
        }}
      />
      <style jsx>{`
        .group:hover span {
          width: 100%;
        }
      `}</style>
    </Link>
  );
};

export default function Header() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300" style={{
        backgroundColor: 'rgba(245, 230, 211, 0.95)',
        borderBottom: '3px solid var(--color-vintage-teal-400)',
        boxShadow: '0 2px 8px rgba(95, 158, 160, 0.1)'
      }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <div className="font-serif text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-vintage-teal-600)' }}>
              Zeina's Corner
            </div>
            <div className="text-xs md:text-sm italic font-light tracking-wide mt-1" style={{ color: 'var(--color-cream-800)' }}>
              Professor, Artist, Mother, Entrepreneur
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 font-medium text-xs tracking-wide uppercase">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/books">Books</NavLink>
            <NavLink href="/papers">Papers</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/hobbies">Hobbies</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full transition-transform active:scale-95 ml-2"
              style={{
                backgroundColor: 'var(--color-vintage-teal-600)',
                color: 'var(--color-cream-50)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-vintage-teal-700)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-vintage-teal-600)'}
            >
                <UserCircle size={16} />
                <span>Sign In</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            style={{ color: 'var(--color-vintage-teal-600)' }}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full shadow-lg py-4 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200" style={{
              backgroundColor: 'var(--color-cream-100)',
              borderBottom: '1px solid var(--color-cream-300)'
            }}>
                <Link href="/" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/books" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>Books</Link>
                <Link href="/papers" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>Conferences/Papers</Link>
                <Link href="/courses" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>Courses I Teach</Link>
                <Link href="/hobbies" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>Home Economics & Hobbies</Link>
                <Link href="/about" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" className="font-medium py-2" style={{ color: 'var(--color-vintage-teal-700)', borderBottom: '1px solid var(--color-cream-200)' }} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <button
                    onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}
                    className="text-left font-bold flex items-center space-x-2 py-2"
                    style={{ color: 'var(--color-vintage-teal-800)' }}
                >
                    <UserCircle size={18} />
                    <span>Sign In / Register</span>
                </button>
            </div>
        )}
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}