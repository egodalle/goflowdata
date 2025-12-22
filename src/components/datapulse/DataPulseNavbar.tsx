import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/datapulse', label: 'Home' },
  { href: '/datapulse/demo', label: 'Live Demo' },
  { href: '/datapulse#features', label: 'Features' },
  { href: '/datapulse#pricing', label: 'Pricing' },
  { href: '/datapulse#platforms', label: 'Platforms' },
];

export const DataPulseNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="gf-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/datapulse" className="flex items-center gap-2 group">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--dp-gradient)' }}
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
                Data
              </span>
              <span className="text-foreground">Pulse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-dp-purple ${
                  location.pathname === link.href ? 'text-dp-purple' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/datapulse/login">Login</Link>
            </Button>
            <Button 
              size="sm" 
              className="text-white"
              style={{ background: 'var(--dp-gradient)' }}
              asChild
            >
              <Link to="/datapulse/contact">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-dp-purple"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/datapulse/login">Login</Link>
                  </Button>
                  <Button 
                    className="w-full text-white"
                    style={{ background: 'var(--dp-gradient)' }}
                    asChild
                  >
                    <Link to="/datapulse/contact">Start Free Trial</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
