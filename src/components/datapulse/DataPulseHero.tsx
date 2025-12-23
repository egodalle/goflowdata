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
                size="xl" 
                className="text-white shadow-lg hover:shadow-xl transition-all"
                style={{ background: 'var(--dp-gradient)' }}
                asChild
              >
                <Link to="/datapulse/contact">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="xl" 
                variant="outline" 
                className="border-dp-purple/30 hover:bg-dp-purple/10"
                asChild
              >
                <Link to="/datapulse/demo">
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
              <div className="bg-gf-navy p-3 flex items-center gap-2">
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

            {/* Floating badges */}
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
