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
      className={`group relative py-1 transition-colors ${isActive ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
    >
      {children}
      <span 
        className={`absolute left-0 bottom-0 h-0.5 bg-stone-800 transition-all duration-300 ease-in-out
          ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
        `}
      />
    </Link>
  );
};

export default function Header() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-stone-200/60 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-serif text-2xl md:text-3xl font-bold text-stone-800 tracking-tight hover:opacity-80 transition-opacity"
          >
            Mom's Corner
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm tracking-wide uppercase">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button 
              onClick={() => setAuthOpen(true)}
              className="flex items-center space-x-2 bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-transform active:scale-95 ml-4"
            >
                <UserCircle size={18} />
                <span>Sign In</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-stone-600 p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-lg py-4 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200">
                <Link href="/" className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <button 
                    onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}
                    className="text-left text-stone-900 font-bold flex items-center space-x-2 py-2"
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