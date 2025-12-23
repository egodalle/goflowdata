# DataPulse Complete Export

This file contains all the code needed to recreate DataPulse in a new Lovable project.

---

## 1. SETUP INSTRUCTIONS

1. Create a new Lovable project named "datapulse"
2. Enable Cloud (for database/auth)
3. Copy the code sections below in order
4. Run the database migration

---

## 2. DATABASE MIGRATION

Run this SQL migration first:

```sql
-- Create datapulse_profiles table
CREATE TABLE public.datapulse_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on datapulse_profiles
ALTER TABLE public.datapulse_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for datapulse_profiles
CREATE POLICY "Users can view their own profile" ON public.datapulse_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.datapulse_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.datapulse_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create datapulse_stores table
CREATE TABLE public.datapulse_stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  store_name TEXT NOT NULL,
  store_url TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'shopify',
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  is_connected BOOLEAN NOT NULL DEFAULT false,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on datapulse_stores
ALTER TABLE public.datapulse_stores ENABLE ROW LEVEL SECURITY;

-- Policies for datapulse_stores
CREATE POLICY "Users can view their own stores" ON public.datapulse_stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stores" ON public.datapulse_stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" ON public.datapulse_stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" ON public.datapulse_stores
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_datapulse_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.datapulse_profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created_datapulse
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_datapulse_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_datapulse_profiles_updated_at
  BEFORE UPDATE ON public.datapulse_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_datapulse_stores_updated_at
  BEFORE UPDATE ON public.datapulse_stores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

---

## 3. DESIGN SYSTEM

### 3.1 Add to `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

@layer base {
  :root {
    --background: 210 20% 98%;
    --foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 20% 96%;
    --secondary-foreground: 222 47% 11%;

    --muted: 210 20% 94%;
    --muted-foreground: 215 16% 47%;

    --accent: 330 81% 60%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 262 83% 58%;

    --radius: 0.75rem;

    /* DataPulse tokens */
    --dp-purple: 262 83% 58%;
    --dp-purple-light: 262 83% 68%;
    --dp-violet: 280 73% 53%;
    --dp-pink: 330 81% 60%;
    --dp-orange: 25 95% 53%;
    --dp-blue: 217 91% 60%;
    --dp-green: 142 71% 45%;
    --dp-gradient: linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(330 81% 60%) 100%);
    --dp-gradient-warm: linear-gradient(135deg, hsl(25 95% 53%) 0%, hsl(330 81% 60%) 100%);
    --dp-gradient-cool: linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(262 83% 58%) 100%);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 hsl(222 47% 11% / 0.05);
    --shadow-md: 0 4px 6px -1px hsl(222 47% 11% / 0.1), 0 2px 4px -2px hsl(222 47% 11% / 0.1);
    --shadow-lg: 0 10px 15px -3px hsl(222 47% 11% / 0.1), 0 4px 6px -4px hsl(222 47% 11% / 0.1);
    --shadow-glow-purple: 0 0 40px hsl(262 83% 58% / 0.3);

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;

    --card: 222 47% 8%;
    --card-foreground: 210 40% 98%;

    --popover: 222 47% 8%;
    --popover-foreground: 210 40% 98%;

    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;

    --secondary: 222 30% 15%;
    --secondary-foreground: 210 40% 98%;

    --muted: 222 30% 15%;
    --muted-foreground: 215 20% 65%;

    --accent: 330 81% 60%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border: 222 30% 18%;
    --input: 222 30% 18%;
    --ring: 262 83% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Outfit', system-ui, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', system-ui, sans-serif;
    @apply font-semibold tracking-tight;
  }
}

@layer components {
  .gf-container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .gf-card {
    @apply rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300;
  }

  .gf-card-hover:hover {
    @apply shadow-lg -translate-y-1;
  }

  .gf-section {
    @apply py-16 md:py-24;
  }
}

@layer utilities {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
}
```

### 3.2 Update `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // DataPulse custom colors
        dp: {
          purple: "hsl(var(--dp-purple))",
          "purple-light": "hsl(var(--dp-purple-light))",
          violet: "hsl(var(--dp-violet))",
          pink: "hsl(var(--dp-pink))",
          orange: "hsl(var(--dp-orange))",
          blue: "hsl(var(--dp-blue))",
          green: "hsl(var(--dp-green))",
        },
        datapulse: {
          purple: "hsl(var(--dp-purple))",
          pink: "hsl(var(--dp-pink))",
          orange: "hsl(var(--dp-orange))",
          blue: "hsl(var(--dp-blue))",
          green: "hsl(var(--dp-green))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## 4. AUTH CONTEXT

### `src/contexts/DataPulseAuthContext.tsx`

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface DataPulseAuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const DataPulseAuthContext = createContext<DataPulseAuthContextType | undefined>(undefined);

export const DataPulseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <DataPulseAuthContext.Provider value={{ user, session, isLoading, signUp, signIn, signOut }}>
      {children}
    </DataPulseAuthContext.Provider>
  );
};

export const useDataPulseAuth = () => {
  const context = useContext(DataPulseAuthContext);
  if (context === undefined) {
    throw new Error('useDataPulseAuth must be used within a DataPulseAuthProvider');
  }
  return context;
};
```

---

## 5. LAYOUT COMPONENTS

### `src/components/datapulse/DataPulseLayout.tsx`

```tsx
import { ReactNode } from 'react';
import { DataPulseNavbar } from './DataPulseNavbar';
import { DataPulseFooter } from './DataPulseFooter';

interface DataPulseLayoutProps {
  children: ReactNode;
}

export const DataPulseLayout = ({ children }: DataPulseLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DataPulseNavbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <DataPulseFooter />
    </div>
  );
};
```

### `src/components/datapulse/DataPulseNavbar.tsx`

```tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Live Demo' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#platforms', label: 'Platforms' },
];

export const DataPulseNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="gf-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
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
            <Button 
              size="sm" 
              className="text-white"
              style={{ background: 'var(--dp-gradient)' }}
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button 
              size="sm" 
              className="text-white"
              style={{ background: 'var(--dp-gradient)' }}
              asChild
            >
              <Link to="/contact">Start Free Trial</Link>
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
                  <Button variant="outline" className="w-full border-dp-purple/30 hover:bg-dp-purple/10 hover:text-dp-purple" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    className="w-full text-white"
                    style={{ background: 'var(--dp-gradient)' }}
                    asChild
                  >
                    <Link to="/contact">Start Free Trial</Link>
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
```

### `src/components/datapulse/DataPulseFooter.tsx`

```tsx
import { Link } from 'react-router-dom';
import { BarChart3, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Live Demo', href: '/demo' },
    { label: 'Platforms', href: '/#platforms' },
  ],
  company: [
    { label: 'About', href: '/contact' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Documentation', href: '/contact' },
    { label: 'API Reference', href: '/contact' },
    { label: 'Support', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Service', href: '/contact' },
  ],
};

export const DataPulseFooter = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="gf-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
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
```

---

## 6. LANDING PAGE COMPONENTS

### `src/components/datapulse/DataPulseHero.tsx`

```tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Zap, ArrowRight } from 'lucide-react';

export const DataPulseHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dp-purple/5 via-background to-dp-pink/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-dp-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-dp-pink/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dp-violet/10 rounded-full blur-3xl" />

      <div className="gf-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dp-purple/10 border border-dp-purple/20">
              <Zap className="w-4 h-4 text-dp-purple" />
              <span className="text-sm font-medium text-dp-purple">Enterprise Analytics at Startup Prices</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Turn Your Store Data Into{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
                Sales Growth
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              DataPulse connects all your e-commerce platforms into one powerful analytics dashboard. 
              See what's working, what's not, and what to do next.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-white shadow-lg hover:shadow-xl transition-all"
                style={{ background: 'var(--dp-gradient)' }}
                asChild
              >
                <Link to="/contact">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-dp-purple/30 hover:bg-dp-purple/10"
                asChild
              >
                <Link to="/demo">
                  View Live Demo
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">KPIs Tracked</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Platforms</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">&lt;24h</p>
                <p className="text-sm text-muted-foreground">Data Freshness</p>
              </div>
            </div>
          </motion.div>

          {/* Right content - Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              {/* Dashboard mockup */}
              <div className="bg-card p-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-dp-orange/80" />
                  <div className="w-3 h-3 rounded-full bg-dp-green/80" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">DataPulse Dashboard</div>
              </div>
              <div className="p-6 space-y-4">
                {/* KPI cards row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-dp-purple/10 to-dp-purple/5 rounded-lg p-4 border border-dp-purple/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-dp-purple" />
                      <span className="text-xs text-muted-foreground">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold">$847K</p>
                    <p className="text-xs text-dp-green">+23.5% ↑</p>
                  </div>
                  <div className="bg-gradient-to-br from-dp-pink/10 to-dp-pink/5 rounded-lg p-4 border border-dp-pink/20">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-dp-pink" />
                      <span className="text-xs text-muted-foreground">Orders</span>
                    </div>
                    <p className="text-2xl font-bold">12,847</p>
                    <p className="text-xs text-dp-green">+18.2% ↑</p>
                  </div>
                  <div className="bg-gradient-to-br from-dp-blue/10 to-dp-blue/5 rounded-lg p-4 border border-dp-blue/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-dp-blue" />
                      <span className="text-xs text-muted-foreground">AOV</span>
                    </div>
                    <p className="text-2xl font-bold">$65.90</p>
                    <p className="text-xs text-dp-green">+4.3% ↑</p>
                  </div>
                </div>
                {/* Chart mockup */}
                <div className="bg-muted/50 rounded-lg p-4 h-40 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="flex-1 rounded-t"
                      style={{ 
                        background: i === 11 ? 'var(--dp-gradient)' : `hsl(var(--dp-purple) / ${0.3 + (i * 0.05)})`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-card rounded-lg shadow-lg border border-border p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-dp-green/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-dp-green" />
              </div>
              <div>
                <p className="text-sm font-semibold">Sales Up</p>
                <p className="text-xs text-muted-foreground">+23% this month</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

### `src/components/datapulse/DataPulsePlatforms.tsx`

```tsx
import { motion } from 'framer-motion';
import { Check, ShoppingBag, Store, Package, Building2, Warehouse, Music } from 'lucide-react';

const platforms = [
  {
    name: 'Shopify',
    marketShare: '29%',
    icon: ShoppingBag,
    priority: 'P0',
    color: 'from-[#96BF48] to-[#5E8E3E]',
    streams: ['Orders', 'Products', 'Customers', 'Inventory', 'Transactions', 'Fulfillments', 'Refunds', 'Collections']
  },
  {
    name: 'WooCommerce',
    marketShare: '23%',
    icon: Store,
    priority: 'P0',
    color: 'from-[#9B5C8F] to-[#7F54B3]',
    streams: ['Orders', 'Products', 'Customers', 'Coupons', 'Categories', 'Variations']
  },
  {
    name: 'Amazon Seller',
    marketShare: '22%',
    icon: Package,
    priority: 'P1',
    color: 'from-[#FF9900] to-[#FF6600]',
    streams: ['Orders', 'Order Items', 'Inventory (FBA & FBM)', 'Financial Events', 'Returns']
  },
  {
    name: 'BigCommerce',
    marketShare: '3%',
    icon: Building2,
    priority: 'P1',
    color: 'from-[#34313F] to-[#121118]',
    streams: ['Orders', 'Products', 'Customers', 'Brands', 'Categories']
  },
  {
    name: 'Magento',
    marketShare: '2%',
    icon: Warehouse,
    priority: 'P2',
    color: 'from-[#F46F25] to-[#EC6737]',
    streams: ['Orders', 'Products', 'Customers', 'Categories', 'Inventory']
  },
  {
    name: 'TikTok Shop',
    marketShare: '5%',
    icon: Music,
    priority: 'P1',
    color: 'from-[#00F2EA] to-[#FF0050]',
    streams: ['Orders', 'Products', 'Inventory', 'Returns', 'Settlements', 'Promotions']
  },
];

export const DataPulsePlatforms = () => {
  return (
    <section className="gf-section bg-muted/30">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect Your{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              E-Commerce Empire
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Native connectors for the top 5 e-commerce platforms covering 79% of the market
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="gf-card gf-card-hover relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color}`}
              />
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg`}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.marketShare} market share</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  platform.priority === 'P0' ? 'bg-dp-green/10 text-dp-green' :
                  platform.priority === 'P1' ? 'bg-dp-orange/10 text-dp-orange' :
                  'bg-dp-blue/10 text-dp-blue'
                }`}>
                  {platform.priority}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Data Streams:</p>
                <div className="flex flex-wrap gap-2">
                  {platform.streams.map((stream) => (
                    <span 
                      key={stream}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs"
                    >
                      <Check className="w-3 h-3 text-dp-green" />
                      {stream}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="gf-card border-dashed flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
              <span className="text-2xl">+</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Google Analytics 4, Meta Ads, Google Ads, Stripe, Klaviyo, Mailchimp
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

### `src/components/datapulse/DataPulseFeatures.tsx`

```tsx
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  Truck, 
  LineChart,
  RefreshCw,
  Bell,
  Shield,
  Zap
} from 'lucide-react';

const dashboards = [
  {
    title: 'Executive Dashboard',
    subtitle: 'Command Center',
    description: 'CEO-level metrics at a glance. Total revenue, orders, AOV, conversion rates, and geographic distribution.',
    icon: LineChart,
    color: 'dp-purple',
    metrics: ['Total Revenue', 'Daily Orders', 'Conversion Rate', 'Revenue by Channel']
  },
  {
    title: 'Sales Performance',
    subtitle: 'Sales Engine',
    description: 'Deep dive into sales patterns. Revenue trends, refund rates, peak selling times, and category performance.',
    icon: BarChart3,
    color: 'dp-pink',
    metrics: ['Gross vs Net Revenue', 'Sales Velocity', 'Discount Usage', 'Revenue Growth']
  },
  {
    title: 'Customer Analytics',
    subtitle: 'Customer Intelligence',
    description: 'Understand your customers. CLV, RFM segments, cohort retention, and acquisition costs.',
    icon: Users,
    color: 'dp-blue',
    metrics: ['Customer LTV', 'RFM Segments', 'Cohort Retention', 'Repeat Rate']
  },
  {
    title: 'Product & Inventory',
    subtitle: 'Product Pulse',
    description: 'Optimize your catalog. Best sellers, dead stock, turnover rates, and low stock alerts.',
    icon: Package,
    color: 'dp-orange',
    metrics: ['Stock Turnover', 'Best Sellers', 'Dead Stock', 'Inventory Value']
  },
  {
    title: 'Operations',
    subtitle: 'Fulfillment Tracker',
    description: 'Streamline fulfillment. Order status, shipping times, return rates, and cancellations.',
    icon: Truck,
    color: 'dp-green',
    metrics: ['Fulfillment Rate', 'Avg Ship Time', 'Return Rate', 'Perfect Orders']
  },
];

const features = [
  { icon: RefreshCw, title: 'Daily Data Sync', description: 'Automated incremental syncs keep data fresh' },
  { icon: Bell, title: 'Smart Alerts', description: 'Get notified when metrics need attention' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC2 compliant, encrypted at rest and transit' },
  { icon: Zap, title: 'Fast Setup', description: 'Connect and see insights in under 1 week' },
];

export const DataPulseFeatures = () => {
  return (
    <section className="gf-section">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            5 Dashboards.{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              50+ KPIs.
            </span>{' '}
            One Platform.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand your e-commerce business
          </p>
        </motion.div>

        {/* Dashboards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {dashboards.map((dashboard, index) => (
            <motion.div
              key={dashboard.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`gf-card gf-card-hover group ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-${dashboard.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <dashboard.icon className={`w-8 h-8 text-${dashboard.color}`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {dashboard.subtitle}
                    </span>
                    <h3 className="text-xl font-semibold">{dashboard.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{dashboard.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.metrics.map((metric) => (
                      <span 
                        key={metric}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-${dashboard.color}/10 text-${dashboard.color}`}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-dp-purple" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### `src/components/datapulse/DataPulseArchitecture.tsx`

```tsx
import { motion } from 'framer-motion';
import { 
  Database, 
  ArrowRight, 
  Layers, 
  BarChart3,
  ShoppingBag,
  Store,
  Package,
  Building2,
  Warehouse
} from 'lucide-react';

const sources = [
  { name: 'Shopify', icon: ShoppingBag, color: '#96BF48' },
  { name: 'WooCommerce', icon: Store, color: '#9B5C8F' },
  { name: 'Amazon', icon: Package, color: '#FF9900' },
  { name: 'BigCommerce', icon: Building2, color: '#34313F' },
  { name: 'Magento', icon: Warehouse, color: '#F46F25' },
];

export const DataPulseArchitecture = () => {
  return (
    <section className="gf-section overflow-hidden">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Modern{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              Data Stack
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on battle-tested open source technology
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="relative max-w-5xl mx-auto">
          {/* Data Sources */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-sm font-medium text-muted-foreground text-center mb-4">
              DATA SOURCES
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {sources.map((source) => (
                <div 
                  key={source.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card shadow-sm"
                >
                  <source.icon className="w-5 h-5" style={{ color: source.color }} />
                  <span className="text-sm font-medium">{source.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-dp-purple to-transparent" />
              <ArrowRight className="w-5 h-5 text-dp-purple rotate-90" />
            </motion.div>
          </div>

          {/* Processing Layer */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="gf-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF6B4A]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" viewBox="0 0 32 32">
                  <path fill="#FF6B4A" d="M16 2L2 9l14 7 14-7-14-7zM2 23l14 7 14-7-14-7-14 7z"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Airbyte OSS</h3>
              <p className="text-sm text-muted-foreground">
                Data Extraction & Ingestion
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-1 rounded text-xs bg-muted">Incremental Sync</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Schema Detection</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="gf-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#4285F4]/10 flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-[#4285F4]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Google BigQuery</h3>
              <p className="text-sm text-muted-foreground">
                Cloud Data Warehouse
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-1 rounded text-xs bg-muted">Raw Layer</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Staging</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Marts</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="gf-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF694B]/10 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-10 h-10 text-[#FF694B]" />
              </div>
              <h3 className="font-bold text-lg mb-2">DBT Cloud</h3>
              <p className="text-sm text-muted-foreground">
                Transformations & Modeling
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-1 rounded text-xs bg-muted">50+ Models</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Testing</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Docs</span>
              </div>
            </motion.div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-dp-pink to-transparent" />
              <ArrowRight className="w-5 h-5 text-dp-pink rotate-90" />
            </motion.div>
          </div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="max-w-md mx-auto"
          >
            <div className="gf-card text-center" style={{ background: 'var(--dp-gradient)', color: 'white' }}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-lg mb-2">DataPulse Dashboards</h3>
              <p className="text-sm opacity-90">
                5 Dashboards • 50+ KPIs • Real-time Insights
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

### `src/components/datapulse/DataPulseKPIs.tsx`

```tsx
import { motion } from 'framer-motion';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const kpiCategories = [
  {
    name: 'Sales & Revenue',
    color: 'dp-purple',
    kpis: [
      { metric: 'Gross Revenue', formula: 'SUM(order_total)', target: 'Track trend' },
      { metric: 'Net Revenue', formula: 'Gross - Refunds - Discounts', target: 'Track trend' },
      { metric: 'Average Order Value', formula: 'Revenue / Orders', target: '$50-200' },
      { metric: 'Revenue per Visitor', formula: 'Revenue / Sessions', target: 'Optimize' },
      { metric: 'Gross Margin', formula: '(Revenue - COGS) / Revenue', target: '>50%' },
      { metric: 'Revenue Growth Rate', formula: '(Current - Previous) / Previous', target: '>10% MoM' },
    ]
  },
  {
    name: 'Customer',
    color: 'dp-pink',
    kpis: [
      { metric: 'Customer Lifetime Value', formula: 'AOV × Frequency × Lifespan', target: 'Maximize' },
      { metric: 'Customer Acquisition Cost', formula: 'Marketing Spend / New Customers', target: 'CLV:CAC > 3:1' },
      { metric: 'Repeat Purchase Rate', formula: 'Returning / Total Customers', target: '>25%' },
      { metric: 'Churn Rate', formula: 'Lost / Total Customers', target: '<5% monthly' },
    ]
  },
  {
    name: 'Product',
    color: 'dp-orange',
    kpis: [
      { metric: 'Inventory Turnover', formula: 'COGS / Average Inventory', target: '4-6x/year' },
      { metric: 'Sell-Through Rate', formula: 'Units Sold / Units Received', target: '>80%' },
      { metric: 'Stock-Out Rate', formula: 'Out-of-stock / Total SKUs', target: '<5%' },
      { metric: 'Dead Stock Rate', formula: 'No-sale SKUs / Total SKUs', target: '<10%' },
    ]
  },
  {
    name: 'Operational',
    color: 'dp-blue',
    kpis: [
      { metric: 'Fulfillment Time', formula: 'Ship Date - Order Date', target: '<24 hours' },
      { metric: 'Return Rate', formula: 'Returns / Orders', target: '<10%' },
      { metric: 'Perfect Order Rate', formula: 'Orders without issues / Total', target: '>95%' },
    ]
  },
];

export const DataPulseKPIs = () => {
  return (
    <section className="gf-section bg-muted/30">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              KPI Reference
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every metric you need to run a data-driven e-commerce business
          </p>
        </motion.div>

        <div className="space-y-8">
          {kpiCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="gf-card overflow-hidden"
            >
              <div className={`px-6 py-4 bg-${category.color}/10 border-b border-border`}>
                <h3 className={`text-lg font-semibold text-${category.color}`}>
                  {category.name} KPIs
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Metric</TableHead>
                    <TableHead>Formula</TableHead>
                    <TableHead className="w-[150px]">Target</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.kpis.map((kpi) => (
                    <TableRow key={kpi.metric}>
                      <TableCell className="font-medium">{kpi.metric}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        {kpi.formula}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${category.color}/10 text-${category.color}`}>
                          {kpi.target}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### `src/components/datapulse/DataPulsePricing.tsx`

```tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$497',
    period: '/month',
    orders: 'Up to 500 orders',
    description: 'Perfect for small stores just getting started',
    features: [
      '1 e-commerce platform',
      '3 core dashboards',
      'Daily data sync',
      'Email support',
      'Standard onboarding',
    ],
    cta: 'Start Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$997',
    period: '/month',
    orders: 'Up to 2,500 orders',
    description: 'For growing brands ready to scale',
    features: [
      '2 e-commerce platforms',
      '5 dashboards (all types)',
      'Hourly data sync',
      'Priority support',
      'Premium onboarding + training',
      'Custom KPI alerts',
    ],
    cta: 'Start Trial',
    popular: true,
  },
  {
    name: 'Scale',
    price: '$1,997',
    period: '/month',
    orders: 'Up to 10,000 orders',
    description: 'For established brands with multiple channels',
    features: [
      '3 e-commerce platforms',
      'All dashboards',
      'Real-time sync',
      'Dedicated support',
      'White-glove onboarding',
      'Custom dashboards (2/month)',
      'API access',
    ],
    cta: 'Start Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: '$3,997+',
    period: '/month',
    orders: 'Unlimited orders',
    description: 'For high-volume operations',
    features: [
      'All platforms',
      'Unlimited dashboards',
      'Real-time sync',
      '24/7 dedicated support',
      'Custom DBT models',
      'On-premise option',
      'SLA guarantee',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const addons = [
  { name: 'Additional Platform', price: '$297/mo' },
  { name: 'Google Analytics Integration', price: '$197/mo' },
  { name: 'Ad Platform Integration', price: '$297/mo' },
  { name: 'Custom Dashboard', price: '$497/mo' },
  { name: 'Dedicated Support', price: '$497/mo' },
  { name: 'Custom DBT Models', price: '$997/mo' },
];

export const DataPulsePricing = () => {
  return (
    <section className="gf-section" id="pricing">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise Analytics.{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              Startup Pricing.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No long-term contracts. Cancel anytime. Start with a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`gf-card relative ${tier.popular ? 'ring-2 ring-dp-purple shadow-lg' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-dp-purple text-white text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tier.orders}</p>
              </div>

              <p className="text-sm text-muted-foreground text-center mb-6">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-dp-green mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${tier.popular ? 'bg-dp-purple hover:bg-dp-purple/90' : ''}`}
                variant={tier.popular ? 'default' : 'outline'}
                asChild
              >
                <Link to="/contact">{tier.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* One-time fees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gf-card mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Setup Fees</h3>
              <p className="text-muted-foreground">One-time investment to get you up and running</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">$2,500</p>
                <p className="text-xs text-muted-foreground">Standard Setup</p>
              </div>
              <div className="px-4 py-2 bg-dp-purple/10 rounded-lg text-center border border-dp-purple/20">
                <p className="text-2xl font-bold text-dp-purple">$5,000</p>
                <p className="text-xs text-muted-foreground">Premium + Training</p>
              </div>
              <div className="px-4 py-2 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">$7,500+</p>
                <p className="text-xs text-muted-foreground">Custom Integration</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">Add-Ons</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {addons.map((addon) => (
              <div key={addon.name} className="gf-card text-center py-4">
                <p className="font-medium text-sm mb-1">{addon.name}</p>
                <p className="text-dp-purple font-bold">{addon.price}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### `src/components/datapulse/DataPulseCTA.tsx`

```tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export const DataPulseCTA = () => {
  return (
    <section className="gf-section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--dp-gradient)' }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

      <div className="gf-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Turn Data Into Revenue?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join forward-thinking e-commerce brands who have stopped guessing and started growing. 
            14-day free trial. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-dp-purple hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/contact">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <Link to="/demo">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <p className="text-4xl font-bold">$500K+</p>
              <p className="text-sm opacity-75">Minimum store revenue</p>
            </div>
            <div>
              <p className="text-4xl font-bold">7 days</p>
              <p className="text-sm opacity-75">Average setup time</p>
            </div>
            <div>
              <p className="text-4xl font-bold">23%</p>
              <p className="text-sm opacity-75">Avg revenue increase</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

---

## 7. PAGES

### `src/pages/Index.tsx` (Landing Page)

```tsx
import { DataPulseLayout } from '@/components/datapulse/DataPulseLayout';
import { DataPulseHero } from '@/components/datapulse/DataPulseHero';
import { DataPulsePlatforms } from '@/components/datapulse/DataPulsePlatforms';
import { DataPulseFeatures } from '@/components/datapulse/DataPulseFeatures';
import { DataPulseKPIs } from '@/components/datapulse/DataPulseKPIs';
import { DataPulsePricing } from '@/components/datapulse/DataPulsePricing';
import { DataPulseArchitecture } from '@/components/datapulse/DataPulseArchitecture';
import { DataPulseCTA } from '@/components/datapulse/DataPulseCTA';

const Index = () => {
  return (
    <DataPulseLayout>
      <DataPulseHero />
      <section id="platforms">
        <DataPulsePlatforms />
      </section>
      <section id="features">
        <DataPulseFeatures />
      </section>
      <DataPulseArchitecture />
      <DataPulseKPIs />
      <section id="pricing">
        <DataPulsePricing />
      </section>
      <DataPulseCTA />
    </DataPulseLayout>
  );
};

export default Index;
```

---

## 8. APP.TSX

Update your `src/App.tsx`:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataPulseAuthProvider } from "@/contexts/DataPulseAuthContext";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataPulseAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataPulseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

## 9. REMAINING PAGES

For the remaining pages (Contact, Login, Onboarding, Dashboard, Demo), copy them from the original project with these path updates:
- Change `/datapulse/` to `/` in all Link paths
- Change `/datapulse/dashboard` to `/dashboard`
- Change `/datapulse/login` to `/login`
- Change `/datapulse/contact` to `/contact`
- Change `/datapulse/onboarding` to `/onboarding`
- Change `/datapulse/demo` to `/demo`

---

## 10. DEPENDENCIES

Make sure these packages are installed:
- framer-motion
- recharts
- lucide-react
- zod
- @supabase/supabase-js

---

## DONE!

After copying all the code:
1. Run the database migration
2. Enable auto-confirm for email signups in Cloud settings
3. Test the auth flow
4. Publish to get datapulse.lovable.app
