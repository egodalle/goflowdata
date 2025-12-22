import { motion } from 'framer-motion';
import { 
  Database, 
  ArrowRight, 
  Layers, 
  BarChart3,
  ShoppingBag,
  Store,
  Package,
  Building2,
  Warehouse
} from 'lucide-react';

const sources = [
  { name: 'Shopify', icon: ShoppingBag, color: '#96BF48' },
  { name: 'WooCommerce', icon: Store, color: '#9B5C8F' },
  { name: 'Amazon', icon: Package, color: '#FF9900' },
  { name: 'BigCommerce', icon: Building2, color: '#34313F' },
  { name: 'Magento', icon: Warehouse, color: '#F46F25' },
];

export const DataPulseArchitecture = () => {
  return (
    <section className="gf-section overflow-hidden">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Modern{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              Data Stack
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on battle-tested open source technology
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="relative max-w-5xl mx-auto">
          {/* Data Sources */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-sm font-medium text-muted-foreground text-center mb-4">
              DATA SOURCES
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {sources.map((source) => (
                <div 
                  key={source.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card shadow-sm"
                >
                  <source.icon className="w-5 h-5" style={{ color: source.color }} />
                  <span className="text-sm font-medium">{source.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-dp-purple to-transparent" />
              <ArrowRight className="w-5 h-5 text-dp-purple rotate-90" />
            </motion.div>
          </div>

          {/* Processing Layer */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="gf-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF6B4A]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" viewBox="0 0 32 32">
                  <path fill="#FF6B4A" d="M16 2L2 9l14 7 14-7-14-7zM2 23l14 7 14-7-14-7-14 7z"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Airbyte OSS</h3>
              <p className="text-sm text-muted-foreground">
                Data Extraction & Ingestion
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-1 rounded text-xs bg-muted">Incremental Sync</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Schema Detection</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="gf-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#4285F4]/10 flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-[#4285F4]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Google BigQuery</h3>
              <p className="text-sm text-muted-foreground">
                Cloud Data Warehouse
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-1 rounded text-xs bg-muted">Raw Layer</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Staging</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Marts</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="gf-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF694B]/10 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-10 h-10 text-[#FF694B]" />
              </div>
              <h3 className="font-bold text-lg mb-2">DBT Cloud</h3>
              <p className="text-sm text-muted-foreground">
                Transformations & Modeling
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-1 rounded text-xs bg-muted">50+ Models</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Testing</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">Docs</span>
              </div>
            </motion.div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-dp-pink to-transparent" />
              <ArrowRight className="w-5 h-5 text-dp-pink rotate-90" />
            </motion.div>
          </div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="max-w-md mx-auto"
          >
            <div className="gf-card text-center" style={{ background: 'var(--dp-gradient)', color: 'white' }}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-lg mb-2">DataPulse Dashboards</h3>
              <p className="text-sm opacity-90">
                5 Dashboards • 50+ KPIs • Real-time Insights
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
