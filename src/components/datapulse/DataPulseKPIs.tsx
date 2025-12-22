import { motion } from 'framer-motion';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const kpiCategories = [
  {
    name: 'Sales & Revenue',
    color: 'dp-purple',
    kpis: [
      { metric: 'Gross Revenue', formula: 'SUM(order_total)', target: 'Track trend' },
      { metric: 'Net Revenue', formula: 'Gross - Refunds - Discounts', target: 'Track trend' },
      { metric: 'Average Order Value', formula: 'Revenue / Orders', target: '$50-200' },
      { metric: 'Revenue per Visitor', formula: 'Revenue / Sessions', target: 'Optimize' },
      { metric: 'Gross Margin', formula: '(Revenue - COGS) / Revenue', target: '>50%' },
      { metric: 'Revenue Growth Rate', formula: '(Current - Previous) / Previous', target: '>10% MoM' },
    ]
  },
  {
    name: 'Customer',
    color: 'dp-pink',
    kpis: [
      { metric: 'Customer Lifetime Value', formula: 'AOV × Frequency × Lifespan', target: 'Maximize' },
      { metric: 'Customer Acquisition Cost', formula: 'Marketing Spend / New Customers', target: 'CLV:CAC > 3:1' },
      { metric: 'Repeat Purchase Rate', formula: 'Returning / Total Customers', target: '>25%' },
      { metric: 'Churn Rate', formula: 'Lost / Total Customers', target: '<5% monthly' },
    ]
  },
  {
    name: 'Product',
    color: 'dp-orange',
    kpis: [
      { metric: 'Inventory Turnover', formula: 'COGS / Average Inventory', target: '4-6x/year' },
      { metric: 'Sell-Through Rate', formula: 'Units Sold / Units Received', target: '>80%' },
      { metric: 'Stock-Out Rate', formula: 'Out-of-stock / Total SKUs', target: '<5%' },
      { metric: 'Dead Stock Rate', formula: 'No-sale SKUs / Total SKUs', target: '<10%' },
    ]
  },
  {
    name: 'Operational',
    color: 'dp-blue',
    kpis: [
      { metric: 'Fulfillment Time', formula: 'Ship Date - Order Date', target: '<24 hours' },
      { metric: 'Return Rate', formula: 'Returns / Orders', target: '<10%' },
      { metric: 'Perfect Order Rate', formula: 'Orders without issues / Total', target: '>95%' },
    ]
  },
];

export const DataPulseKPIs = () => {
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
            Complete{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
              KPI Reference
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every metric you need to run a data-driven e-commerce business
          </p>
        </motion.div>

        <div className="space-y-8">
          {kpiCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="gf-card overflow-hidden"
            >
              <div className={`px-6 py-4 bg-${category.color}/10 border-b border-border`}>
                <h3 className={`text-lg font-semibold text-${category.color}`}>
                  {category.name} KPIs
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Metric</TableHead>
                    <TableHead>Formula</TableHead>
                    <TableHead className="w-[150px]">Target</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.kpis.map((kpi) => (
                    <TableRow key={kpi.metric}>
                      <TableCell className="font-medium">{kpi.metric}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        {kpi.formula}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${category.color}/10 text-${category.color}`}>
                          {kpi.target}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
