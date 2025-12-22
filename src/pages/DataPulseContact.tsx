import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataPulseLayout } from '@/components/datapulse/DataPulseLayout';
import { ArrowRight, CheckCircle, BarChart3, Zap, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const platforms = [
  'Shopify',
  'WooCommerce',
  'Magento',
  'BigCommerce',
  'Salesforce Commerce',
  'Other',
];

const revenueRanges = [
  '$500K - $1M',
  '$1M - $5M',
  '$5M - $10M',
  '$10M - $50M',
  '$50M+',
];

const benefits = [
  { icon: BarChart3, text: '14-day free trial, no credit card required' },
  { icon: Zap, text: 'Setup in under 7 days with white-glove onboarding' },
  { icon: Shield, text: 'SOC 2 compliant data security' },
];

const DataPulseContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    storeUrl: '',
    platform: '',
    revenue: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Request received!",
      description: "Our team will reach out within 24 hours to schedule your demo.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <DataPulseLayout>
        <section className="min-h-[80vh] flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg"
          >
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'var(--dp-gradient)' }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-8">
              Your trial request has been received. Our team will contact you within 24 hours 
              to schedule your personalized onboarding session.
            </p>
            <Button 
              className="text-white"
              style={{ background: 'var(--dp-gradient)' }}
              onClick={() => window.location.href = '/datapulse'}
            >
              Back to DataPulse
            </Button>
          </motion.div>
        </section>
      </DataPulseLayout>
    );
  }

  return (
    <DataPulseLayout>
      <section className="py-20 md:py-32">
        <div className="gf-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your{' '}
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'var(--dp-gradient)' }}
                >
                  Free Trial
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join 500+ e-commerce brands who've transformed their data into actionable insights 
                and revenue growth.
              </p>

              <div className="space-y-4 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--dp-gradient)' }}
                    >
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-muted/50 border border-border">
                <div className="text-center">
                  <p 
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: 'var(--dp-gradient)' }}
                  >
                    23%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Revenue Lift</p>
                </div>
                <div className="text-center">
                  <p 
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: 'var(--dp-gradient)' }}
                  >
                    4.9★
                  </p>
                  <p className="text-sm text-muted-foreground">Customer Rating</p>
                </div>
                <div className="text-center">
                  <p 
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: 'var(--dp-gradient)' }}
                  >
                    500+
                  </p>
                  <p className="text-sm text-muted-foreground">Active Stores</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form 
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-card border border-border shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Request Your Free Trial</h2>
                
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        placeholder="ACME Inc."
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeUrl">Store URL</Label>
                      <Input
                        id="storeUrl"
                        placeholder="https://store.com"
                        value={formData.storeUrl}
                        onChange={(e) => handleChange('storeUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>E-commerce Platform *</Label>
                      <Select 
                        value={formData.platform} 
                        onValueChange={(value) => handleChange('platform', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Annual Revenue *</Label>
                      <Select 
                        value={formData.revenue} 
                        onValueChange={(value) => handleChange('revenue', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          {revenueRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">What are your main analytics challenges?</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your current pain points..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-white"
                    style={{ background: 'var(--dp-gradient)' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Start Free Trial'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </DataPulseLayout>
  );
};

export default DataPulseContact;
