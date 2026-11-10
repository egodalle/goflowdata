import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  solutions: [
    { label: 'Data platforms', href: '/services#data-platforms' },
    { label: 'AI automation', href: '/services#ai-automation' },
    { label: 'E-commerce analytics', href: '/services#ecommerce' },
  ],
};

export const Footer = () => (
  <footer className="bg-gf-navy text-primary-foreground">
    <div className="gf-container py-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gf-gradient-bg text-lg font-bold text-accent-foreground">G</span>
            <span className="text-xl font-bold">GoFlow Data</span>
          </Link>
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-primary-foreground/65">Modern data platforms, practical AI automation, and connected e-commerce analytics for growing businesses.</p>
          <a href="mailto:edgodalle@goflowdata.com" className="inline-flex items-center gap-2 text-sm font-medium text-gf-teal transition-colors hover:text-primary-foreground"><Mail className="h-4 w-4" />edgodalle@goflowdata.com</a>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h2>
          <ul className="space-y-3">{footerLinks.company.map(link => <li key={link.href}><Link to={link.href} className="text-sm text-primary-foreground/65 transition-colors hover:text-gf-teal">{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Solutions</h2>
          <ul className="space-y-3">{footerLinks.solutions.map(link => <li key={link.href}><Link to={link.href} className="text-sm text-primary-foreground/65 transition-colors hover:text-gf-teal">{link.label}</Link></li>)}</ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-7 text-center md:flex-row md:text-left">
        <p className="text-xs text-primary-foreground/45">© {new Date().getFullYear()} GoFlow Data. All rights reserved.</p>
        <div className="flex gap-5"><Link to="/privacy" className="text-xs text-primary-foreground/50 hover:text-primary-foreground">Privacy Policy</Link><Link to="/terms" className="text-xs text-primary-foreground/50 hover:text-primary-foreground">Terms of Service</Link><Link to="/contact" className="inline-flex items-center gap-1 text-xs text-primary-foreground/50 hover:text-gf-teal">Start a project <ArrowUpRight className="h-3 w-3" /></Link></div>
      </div>
    </div>
  </footer>
);
