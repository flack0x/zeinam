'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, UserCircle, LayoutDashboard } from 'lucide-react';
import AuthModal from './auth-modal';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative inline-block py-2.5 px-2 transition-all duration-300 ease-out flex-shrink-0"
      style={{
        color: isActive ? 'var(--color-cream-50)' : isHovered ? 'var(--color-cream-50)' : 'var(--color-cream-100)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        textShadow: isActive || isHovered ? '0 2px 8px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.2)',
        fontWeight: isActive ? '700' : '600',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        fontSize: '0.9rem',
        letterSpacing: '0.08em'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span
        className="absolute left-0 bottom-0 transition-all duration-300 ease-out pointer-events-none"
        style={{
          height: isHovered || isActive ? '3px' : '2px',
          backgroundColor: 'var(--color-cream-50)',
          width: isActive ? '100%' : isHovered ? '100%' : '0',
          boxShadow: isHovered || isActive ? '0 2px 6px rgba(255, 255, 255, 0.4)' : 'none'
        }}
      />
    </Link>
  );
};

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-300" style={{
        backgroundColor: 'var(--color-vintage-teal-500)',
        borderBottom: '4px solid var(--color-vintage-teal-700)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="group transition-all duration-300 flex-shrink-0"
          >
            {/* Elegant Text Logo */}
            <div className="relative px-4 py-2">
              <div className="font-serif text-2xl lg:text-3xl font-bold tracking-wide whitespace-nowrap transition-all duration-300 group-hover:scale-105" style={{
                color: 'var(--color-cream-50)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)'
              }}>
                Zeina's Corner
              </div>
              {/* Elegant underline accent */}
              <div className="flex items-center justify-center gap-2 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-cream-200))' }}></div>
                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: 'var(--color-cream-200)' }}></div>
                <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, var(--color-cream-200), transparent)' }}></div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-semibold text-sm tracking-wider uppercase flex-shrink-0">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/books">Books</NavLink>
            <NavLink href="/papers">Papers</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/hobbies">Hobbies</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {isAuthenticated ? (
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg transition-all duration-300 ease-out active:scale-95 ml-4 flex-shrink-0"
                style={{
                  backgroundColor: 'var(--color-vintage-teal-700)',
                  color: 'var(--color-cream-50)',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  border: '2px solid var(--color-vintage-teal-800)',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-vintage-teal-600)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-vintage-teal-700)';
                  e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <LayoutDashboard size={18} strokeWidth={2.5} />
                <span className="whitespace-nowrap">DASHBOARD</span>
              </Link>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg transition-all duration-300 ease-out active:scale-95 ml-4 flex-shrink-0"
                style={{
                  backgroundColor: 'var(--color-cream-50)',
                  color: 'var(--color-vintage-teal-700)',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  border: '2px solid var(--color-cream-200)',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-cream-50)';
                  e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <UserCircle size={18} strokeWidth={2.5} />
                <span className="whitespace-nowrap">SIGN IN</span>
              </button>
            )}
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
                {isAuthenticated ? (
                  <Link
                    href="/admin"
                    className="text-left font-bold flex items-center space-x-2 py-2"
                    style={{ color: 'var(--color-vintage-teal-800)' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}
                    className="text-left font-bold flex items-center space-x-2 py-2"
                    style={{ color: 'var(--color-vintage-teal-800)' }}
                  >
                    <UserCircle size={18} />
                    <span>Sign In / Register</span>
                  </button>
                )}
            </div>
        )}
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}