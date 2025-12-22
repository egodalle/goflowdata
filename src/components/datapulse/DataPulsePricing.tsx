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
