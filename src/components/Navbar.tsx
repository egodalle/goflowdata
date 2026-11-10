import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Work' },
  { href: '/tech-stack', label: 'Stack' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-6">
      <nav className="pointer-events-auto gf-glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.25)] md:px-3 md:py-2">
        <Link to="/" className="flex items-center gap-2 pl-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full gf-gradient-bg">
            <span className="text-sm font-bold text-accent-foreground">G</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">GoFlow</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Button variant="accent" size="sm" className="rounded-full px-4" asChild>
            <Link to="/contact">Book a call</Link>
          </Button>
        </div>

        <button
          className="rounded-full p-2 text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto gf-glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/10 lg:hidden"
          >
            <div className="space-y-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-medium ${
                    location.pathname === link.href ? 'bg-white/10 text-white' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="accent" className="mt-2 w-full rounded-full" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Book a call
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
