'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, UserCircle } from 'lucide-react';
import AuthModal from './auth-modal';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative py-2 px-1 transition-all duration-300 ease-out"
      style={{
        color: isActive ? 'var(--color-vintage-teal-600)' : isHovered ? 'var(--color-vintage-teal-700)' : 'var(--color-vintage-teal-500)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        textShadow: isHovered ? '0 1px 2px rgba(95, 158, 160, 0.2)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span
        className="absolute left-0 bottom-0 transition-all duration-300 ease-out"
        style={{
          height: isHovered ? '3px' : '2px',
          backgroundColor: 'var(--color-vintage-teal-600)',
          width: isActive ? '100%' : isHovered ? '100%' : '0',
          boxShadow: isHovered ? '0 2px 4px rgba(95, 158, 160, 0.3)' : 'none'
        }}
      />
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
          <nav className="hidden lg:flex items-center space-x-7 font-medium text-xs tracking-wide uppercase">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/books">Books</NavLink>
            <NavLink href="/papers">Papers</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/hobbies">Hobbies</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 ease-out active:scale-95 ml-4 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--color-vintage-teal-600)',
                color: 'var(--color-cream-50)',
                fontSize: '0.813rem',
                fontWeight: '600',
                letterSpacing: '0.025em',
                boxShadow: '0 2px 8px rgba(95, 158, 160, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-vintage-teal-700)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(95, 158, 160, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-vintage-teal-600)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(95, 158, 160, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
                <UserCircle size={18} strokeWidth={2.5} />
                <span className="whitespace-nowrap">Sign In</span>
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