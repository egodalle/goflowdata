import { Link } from 'react-router-dom';
import { BarChart3, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '/datapulse#features' },
    { label: 'Pricing', href: '/datapulse#pricing' },
    { label: 'Live Demo', href: '/datapulse/demo' },
    { label: 'Platforms', href: '/datapulse#platforms' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Support', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export const DataPulseFooter = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="gf-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/datapulse" className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-muted-foreground mb-4">
              Enterprise-grade e-commerce analytics at a fraction of the cost.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-dp-purple/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-dp-purple/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:hello@datapulse.io" className="p-2 rounded-lg bg-muted hover:bg-dp-purple/10 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-dp-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-dp-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-dp-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-dp-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DataPulse. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for e-commerce entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
};
