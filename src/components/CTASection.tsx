import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  primaryLink?: string;
  secondaryLink?: string;
}

export const CTASection = ({
  title = "Ready to Transform Your Data?",
  description = "Let's discuss how GoFlow can help you build reliable, scalable data pipelines that power your analytics and AI initiatives.",
  primaryCTA = "Book a Consultation",
  secondaryCTA = "View Our Work",
  primaryLink = "/contact",
  secondaryLink = "/projects",
}: CTASectionProps) => {
  return (
    <section className="gf-section gf-section-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gf-teal rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gf-cyan rounded-full blur-[100px]" />
      </div>

      <div className="gf-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to={primaryLink}>
                <Calendar className="h-5 w-5" />
                {primaryCTA}
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to={secondaryLink}>
                {secondaryCTA}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
