import { motion } from 'framer-motion';
import { Check, ShoppingBag, Store, Package, Building2, Warehouse } from 'lucide-react';

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
