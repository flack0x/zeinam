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
      className="relative inline-block py-2 px-1.5 transition-all duration-300 ease-out flex-shrink-0"
      style={{
        color: isActive ? 'var(--color-cream-50)' : isHovered ? 'var(--color-cream-100)' : 'var(--color-cream-200)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        textShadow: isHovered ? '0 2px 4px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
        fontWeight: isActive ? '700' : '600',
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span
        className="absolute left-0 bottom-0 transition-all duration-300 ease-out pointer-events-none"
        style={{
          height: isHovered ? '3px' : '2px',
          backgroundColor: 'var(--color-cream-100)',
          width: isActive ? '100%' : isHovered ? '100%' : '0',
          boxShadow: isHovered ? '0 2px 4px rgba(255, 255, 255, 0.5)' : 'none'
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
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-300" style={{
        backgroundColor: 'var(--color-vintage-teal-500)',
        borderBottom: '4px solid var(--color-vintage-teal-700)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group transition-all duration-300 flex-shrink-0"
          >
            {/* Sign-like container */}
            <div className="inline-block px-5 py-2.5 rounded-lg relative" style={{
              backgroundColor: 'var(--color-cream-100)',
              border: '3px solid var(--color-cream-400)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
              transform: 'translateY(0)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="font-serif text-xl lg:text-2xl font-bold tracking-tight whitespace-nowrap" style={{
                color: 'var(--color-vintage-teal-700)',
                textShadow: '1px 1px 0 rgba(255, 255, 255, 0.5)'
              }}>
                Zeina's Corner
              </div>
              <div className="text-[0.7rem] italic font-light tracking-wide mt-1 text-center whitespace-nowrap" style={{
                color: 'var(--color-cream-800)'
              }}>
                Mother, Artist, Professor, Entrepreneur
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-5 font-medium text-xs tracking-wide uppercase flex-shrink-0">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/books">Books</NavLink>
            <NavLink href="/papers">Papers</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/hobbies">Hobbies</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-out active:scale-95 ml-2 flex-shrink-0"
              style={{
                backgroundColor: 'var(--color-cream-100)',
                color: 'var(--color-vintage-teal-700)',
                fontSize: '0.813rem',
                fontWeight: '700',
                letterSpacing: '0.025em',
                border: '2px solid var(--color-cream-300)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cream-50)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cream-100)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
                <UserCircle size={16} strokeWidth={2.5} />
                <span className="whitespace-nowrap">Sign In</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-all"
            style={{
              color: 'var(--color-cream-100)',
              backgroundColor: 'rgba(245, 230, 211, 0.1)'
            }}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 230, 211, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 230, 211, 0.1)'}
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