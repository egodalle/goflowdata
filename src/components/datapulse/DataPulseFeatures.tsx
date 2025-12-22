import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  Truck, 
  LineChart,
  PieChart,
  TrendingUp,
  Target,
  RefreshCw,
  Bell,
  Shield,
  Zap
} from 'lucide-react';

const dashboards = [
  {
    title: 'Executive Dashboard',
    subtitle: 'Command Center',
    description: 'CEO-level metrics at a glance. Total revenue, orders, AOV, conversion rates, and geographic distribution.',
    icon: LineChart,
    color: 'dp-purple',
    metrics: ['Total Revenue', 'Daily Orders', 'Conversion Rate', 'Revenue by Channel']
  },
  {
    title: 'Sales Performance',
    subtitle: 'Sales Engine',
    description: 'Deep dive into sales patterns. Revenue trends, refund rates, peak selling times, and category performance.',
    icon: BarChart3,
    color: 'dp-pink',
    metrics: ['Gross vs Net Revenue', 'Sales Velocity', 'Discount Usage', 'Revenue Growth']
  },
  {
    title: 'Customer Analytics',
    subtitle: 'Customer Intelligence',
    description: 'Understand your customers. CLV, RFM segments, cohort retention, and acquisition costs.',
    icon: Users,
    color: 'dp-blue',
    metrics: ['Customer LTV', 'RFM Segments', 'Cohort Retention', 'Repeat Rate']
  },
  {
    title: 'Product & Inventory',
    subtitle: 'Product Pulse',
    description: 'Optimize your catalog. Best sellers, dead stock, turnover rates, and low stock alerts.',
    icon: Package,
    color: 'dp-orange',
    metrics: ['Stock Turnover', 'Best Sellers', 'Dead Stock', 'Inventory Value']
  },
  {
    title: 'Operations',
    subtitle: 'Fulfillment Tracker',
    description: 'Streamline fulfillment. Order status, shipping times, return rates, and cancellations.',
    icon: Truck,
    color: 'dp-green',
    metrics: ['Fulfillment Rate', 'Avg Ship Time', 'Return Rate', 'Perfect Orders']
  },
];

const features = [
  { icon: RefreshCw, title: 'Daily Data Sync', description: 'Automated incremental syncs keep data fresh' },
  { icon: Bell, title: 'Smart Alerts', description: 'Get notified when metrics need attention' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC2 compliant, encrypted at rest and transit' },
  { icon: Zap, title: 'Fast Setup', description: 'Connect and see insights in under 1 week' },
];

export const DataPulseFeatures = () => {
  return (
    <section className="gf-section">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            5 Dashboards.{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              50+ KPIs.
            </span>{' '}
            One Platform.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand your e-commerce business
          </p>
        </motion.div>

        {/* Dashboards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {dashboards.map((dashboard, index) => (
            <motion.div
              key={dashboard.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`gf-card gf-card-hover group ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-${dashboard.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <dashboard.icon className={`w-8 h-8 text-${dashboard.color}`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {dashboard.subtitle}
                    </span>
                    <h3 className="text-xl font-semibold">{dashboard.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{dashboard.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.metrics.map((metric) => (
                      <span 
                        key={metric}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-${dashboard.color}/10 text-${dashboard.color}`}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-dp-purple" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
