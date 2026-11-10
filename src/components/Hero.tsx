import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, GitBranch, BrainCircuit } from 'lucide-react';
import heroAnalytics from '@/assets/images/hero-analytics.jpg';

const capabilities = [
  { icon: Database, label: 'Connect' },
  { icon: GitBranch, label: 'Orchestrate' },
  { icon: BrainCircuit, label: 'Activate with AI' },
];

const sources = ['CRM & business apps', 'Stores & marketplaces', 'Databases & APIs', 'Documents & workflows'];

export const Hero = () => (
  <section className="relative overflow-hidden bg-gf-navy">
    <div className="absolute inset-0" aria-hidden="true">
      <img src={heroAnalytics} alt="" className="h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gf-navy/70" />
      <div className="absolute -left-24 top-24 h-[28rem] w-[28rem] rounded-full bg-gf-teal/25 blur-[140px]" />
      <div className="absolute -bottom-32 right-0 h-[32rem] w-[32rem] rounded-full bg-gf-cyan/20 blur-[160px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
    </div>

    <div className="gf-container relative z-10 flex min-h-[100svh] items-center pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="grid w-full items-center gap-12 md:grid-cols-2 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="gf-eyebrow mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-gf-teal" />
            AI & data engineering
          </div>
          <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
            Turn your business data into a <span className="gf-gradient-text">competitive advantage.</span>
          </h1>
          <p className="mb-9 max-w-lg text-lg leading-relaxed text-white/75 md:text-xl">
            Dependable data platforms, practical AI automation, and connected e-commerce analytics—so your team can decide faster and scale with confidence.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Book a free discovery call <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/services">Explore services</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-white/40">Project-based work · Ongoing engineering support</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            <div className="relative h-44 overflow-hidden md:h-52">
              <img
                src={heroAnalytics}
                alt="Analytics dashboard used to turn operational data into decisions"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gf-navy/80 to-transparent" />
            </div>
            <div className="p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gf-teal">The GoFlow approach</p>
                  <p className="mt-1 text-base font-semibold text-white">Disconnected tools → useful intelligence</p>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-gf-teal" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {sources.map((label, i) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-white/35">Source 0{i + 1}</p>
                    <p className="text-sm font-medium text-white/85">{label}</p>
                  </div>
                ))}
              </div>
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="grid grid-cols-3 gap-2">
                {capabilities.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.04] px-2 py-4 text-center">
                    <div className="rounded-xl bg-gf-teal/15 p-2 text-gf-teal">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium text-white/70">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl gf-gradient-bg px-5 py-3.5 text-slate-950">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">Outcome</p>
                  <p className="font-semibold">Trusted data. Smarter operations.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
