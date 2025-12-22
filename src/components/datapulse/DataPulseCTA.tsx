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
            Join forward-thinking e-commerce brands who've stopped guessing and started growing. 
            14-day free trial. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="xl" 
              className="bg-white text-dp-purple hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/contact">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <Link to="/datapulse/demo">
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
