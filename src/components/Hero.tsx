import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, GitBranch, BarChart3, BrainCircuit, ShoppingCart } from 'lucide-react';

const capabilities = [
  { icon: Database, label: 'Connect data' },
  { icon: GitBranch, label: 'Build reliable pipelines' },
  { icon: BrainCircuit, label: 'Put data to work with AI' },
];

export const Hero = () => (
  <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-gf-navy pt-16">
    <div className="absolute inset-0 opacity-20" aria-hidden="true">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-gf-teal blur-[110px]" />
      <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-gf-cyan blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>

    <div className="gf-container relative z-10 py-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gf-teal/30 bg-gf-teal/10 px-4 py-2 text-sm font-medium text-gf-teal">
            <span className="h-2 w-2 rounded-full bg-gf-teal" />
            AI & Data Engineering for growing businesses
          </div>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.08] text-primary-foreground md:text-5xl lg:text-6xl">
            Turn your business data into a <span className="gf-gradient-text">competitive advantage.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            GoFlow builds dependable data platforms, practical AI automation, and connected e-commerce analytics—so your team can make better decisions and scale with confidence.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Book a free discovery call <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/services">Explore our services</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/50">Flexible project engagements and ongoing engineering support.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.15 }} className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-md md:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-gf-teal">The GoFlow approach</p>
                <p className="mt-1 text-lg font-semibold text-white">From disconnected tools to useful intelligence</p>
              </div>
              <div className="rounded-xl bg-gf-teal/15 p-3 text-gf-teal"><BarChart3 className="h-6 w-6" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['CRM & business apps', 'Stores & marketplaces', 'Databases & APIs', 'Documents & workflows'].map((label, i) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="mb-2 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gf-teal" /><span className="text-xs text-white/50">SOURCE 0{i + 1}</span></div>
                  <p className="text-sm font-medium text-white/85">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center py-4"><div className="h-8 w-px bg-gradient-to-b from-gf-teal/80 to-gf-cyan/80" /></div>
            <div className="rounded-2xl border border-gf-teal/30 bg-gf-teal/10 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {capabilities.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 sm:flex-col sm:text-center">
                    <div className="rounded-lg bg-gf-teal/15 p-2 text-gf-teal"><Icon className="h-5 w-5" /></div>
                    <span className="text-xs font-medium text-white/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center py-4"><div className="h-8 w-px bg-gradient-to-b from-gf-cyan/80 to-gf-teal/80" /></div>
            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-gf-teal to-gf-cyan px-5 py-4 text-slate-950">
              <div><p className="text-xs font-semibold uppercase tracking-wider opacity-70">Business outcome</p><p className="font-bold">Trusted data. Smarter operations.</p></div>
              <ShoppingCart className="h-6 w-6" />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-full border border-gf-teal/20" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full border border-gf-cyan/20" />
        </motion.div>
      </div>
    </div>
  </section>
);
