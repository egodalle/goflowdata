import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, GitBranch, BarChart3 } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gf-navy min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gf-teal rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gf-cyan rounded-full blur-[120px]" />
      </div>

      {/* Flow Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gf-teal/30 to-transparent animate-flow-pulse"
            style={{
              top: `${20 + i * 15}%`,
              left: '-10%',
              width: '120%',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="gf-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gf-teal/10 border border-gf-teal/20 text-gf-teal text-sm font-medium mb-6">
              <Database className="h-4 w-4" />
              Data Engineering Experts
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Modern Data Pipelines{' '}
              <span className="gf-gradient-text">Built for Scale</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-xl">
              We design, build, and optimize end-to-end data pipelines that transform fragmented data into trusted analytics and AI-ready platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Book a Consultation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/projects">View Case Studies</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/10">
              {[
                { value: '50+', label: 'Pipelines Built' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '10x', label: 'Faster Insights' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-gf-teal">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Pipeline Visualization */}
              <div className="relative bg-gf-navy-light/50 rounded-2xl p-8 border border-gf-teal/20 backdrop-blur-sm">
                <div className="flex flex-col gap-4">
                  {/* Data Sources */}
                  <div className="flex justify-between items-center">
                    {['CRM', 'API', 'DB', 'SaaS'].map((source, i) => (
                      <motion.div
                        key={source}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="px-4 py-2 rounded-lg bg-gf-teal/10 border border-gf-teal/30 text-gf-teal text-sm font-medium"
                      >
                        {source}
                      </motion.div>
                    ))}
                  </div>

                  {/* Flow Arrows */}
                  <div className="flex justify-center py-2">
                    <GitBranch className="h-8 w-8 text-gf-teal/50 rotate-180" />
                  </div>

                  {/* Processing Steps */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Database, label: 'Extract' },
                      { icon: GitBranch, label: 'Transform' },
                      { icon: BarChart3, label: 'Analyze' },
                    ].map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
                      >
                        <div className="p-3 rounded-lg gf-gradient-bg">
                          <step.icon className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <span className="text-sm text-primary-foreground/70">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Flow Arrows */}
                  <div className="flex justify-center py-2">
                    <ArrowRight className="h-6 w-6 text-gf-teal/50 rotate-90" />
                  </div>

                  {/* Output */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="p-4 rounded-xl gf-gradient-bg text-center"
                  >
                    <span className="text-accent-foreground font-semibold">AI-Ready Data Platform</span>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 p-3 rounded-lg bg-card shadow-lg animate-float">
                <Database className="h-6 w-6 text-gf-teal" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-3 rounded-lg bg-card shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <BarChart3 className="h-6 w-6 text-gf-teal" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
