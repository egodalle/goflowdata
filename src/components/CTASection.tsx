import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroAnalytics from '@/assets/images/hero-analytics.jpg';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  primaryLink?: string;
  secondaryLink?: string;
}

export const CTASection = ({
  title = "Let's solve the right problem.",
  description = "Tell us what you're trying to improve. We'll help shape a practical first step—data platform, AI workflow, or commerce analytics.",
  primaryCTA = "Book a free discovery call",
  secondaryCTA = "View our work",
  primaryLink = "/contact",
  secondaryLink = "/projects",
}: CTASectionProps) => (
  <section className="bg-background px-4 pb-20 md:px-6 md:pb-28">
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="gf-container relative overflow-hidden rounded-[2rem] border border-white/10 bg-gf-navy px-8 py-16 md:px-16 md:py-20"
    >
      <img src={heroAnalytics} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gf-navy/70" />
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="pointer-events-none absolute -left-32 -top-24 h-64 w-64 rounded-full bg-gf-teal/20 blur-[90px]" />
        <h2 className="relative mb-4 text-3xl font-semibold tracking-tight text-white text-balance md:text-5xl">
          {title}
        </h2>
        <p className="relative mb-8 text-lg text-white/65">{description}</p>
        <div className="relative flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="hero" size="lg" asChild>
            <Link to={primaryLink}>{primaryCTA}</Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to={secondaryLink}>
              {secondaryCTA} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  </section>
);
