import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, BrainCircuit, ShoppingCart, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Database,
    number: '01',
    title: 'Data Engineering & Cloud Platforms',
    description: 'Build a dependable foundation for analytics and AI. We connect fragmented systems, automate data movement, and turn raw data into trusted, well-modeled information.',
    capabilities: ['ETL/ELT pipelines and API integrations', 'BigQuery, Snowflake and cloud data warehouses', 'dbt modeling, orchestration and data quality'],
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'AI & Intelligent Automation',
    description: 'Move beyond AI experiments with focused solutions that reduce manual work, surface knowledge, and support better operational decisions.',
    capabilities: ['AI agents and LLM-powered workflows', 'RAG and intelligent document processing', 'Human-in-the-loop automations and AI reporting'],
  },
  {
    icon: ShoppingCart,
    number: '03',
    title: 'E-commerce Data Solutions',
    description: 'Bring your commerce channels together to understand sales, inventory, marketing performance, and profitability in one consistent view.',
    capabilities: ['Shopify, Amazon and marketplace integrations', 'Multi-channel sales and inventory analytics', 'Automated dashboards and performance reporting'],
  },
];

export const ServicesSection = () => (
  <section className="gf-section bg-background">
    <div className="gf-container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-3xl text-center">
        <span className="mb-4 inline-block rounded-full bg-gf-teal/10 px-4 py-1 text-sm font-medium text-gf-teal">What we do</span>
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Technology that solves real business problems</h2>
        <p className="text-lg text-muted-foreground">From reliable data foundations to practical AI and commerce intelligence, get the right solution for your next stage of growth.</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {services.map(({ icon: Icon, number, title, description, capabilities }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.1 }} className="gf-card gf-card-hover flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div className="rounded-2xl bg-gf-teal/10 p-4 text-gf-teal"><Icon className="h-7 w-7" /></div>
              <span className="text-sm font-semibold tracking-widest text-muted-foreground/60">{number}</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">{description}</p>
            <ul className="mb-7 space-y-3">
              {capabilities.map((item) => <li key={item} className="flex gap-2 text-sm text-foreground/80"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gf-teal" />{item}</li>)}
            </ul>
            <div className="mt-auto"><Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-gf-teal hover:gap-3 transition-all">Explore service details <ArrowRight className="h-4 w-4" /></Link></div>
          </motion.article>
        ))}
      </div>
      <div className="mt-12 text-center"><Button variant="accent" size="lg" asChild><Link to="/services">View all services <ArrowRight className="h-5 w-5" /></Link></Button></div>
    </div>
  </section>
);
