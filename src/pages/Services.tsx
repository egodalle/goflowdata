import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { Database, BrainCircuit, ShoppingCart, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: 'data-platforms',
    icon: Database,
    number: '01',
    title: 'Data Engineering & Cloud Platforms',
    intro: 'A dependable data foundation for reporting, operations, and AI.',
    description: 'Connect your business systems, automate data movement, and turn fragmented information into trusted, well-modeled datasets your team can use.',
    deliverables: ['ETL/ELT pipelines and API integrations', 'BigQuery, Snowflake and cloud warehouse architecture', 'dbt transformations, testing and documentation', 'Airflow orchestration, monitoring and alerting', 'Data quality, governance and cost optimization'],
    tools: ['Python', 'SQL', 'Airbyte', 'dbt', 'Airflow', 'BigQuery', 'Snowflake'],
  },
  {
    id: 'ai-automation',
    icon: BrainCircuit,
    number: '02',
    title: 'AI & Intelligent Automation',
    intro: 'Practical AI that helps your team move faster.',
    description: 'Turn repetitive workflows and scattered business knowledge into useful AI-powered processes, with clear controls and human review where it matters.',
    deliverables: ['LLM-powered assistants and task-focused AI agents', 'Retrieval-augmented generation (RAG)', 'Intelligent document extraction and classification', 'Workflow automation and system integrations', 'Human approval, audit trails and operational monitoring'],
    tools: ['Python', 'LLMs', 'RAG', 'Vector search', 'FastAPI', 'Workflow automation'],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    number: '03',
    title: 'E-commerce Data Solutions',
    intro: 'A clearer picture of performance across every channel.',
    description: 'Bring commerce, marketplace, advertising, and inventory data together so you can understand sales performance and make decisions with consistent numbers.',
    deliverables: ['Shopify, Amazon and marketplace data integrations', 'Multi-channel sales and product analytics', 'Inventory and order performance reporting', 'Marketing and campaign performance analysis', 'Automated dashboards and executive reporting'],
    tools: ['Shopify', 'Amazon', 'REST APIs', 'BigQuery', 'dbt', 'Looker Studio'],
  },
];

const Services = () => (
  <Layout>
    <section className="relative overflow-hidden bg-gf-navy py-20 md:py-28">
      <div className="absolute inset-0 opacity-20"><div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-gf-teal blur-[110px]" /></div>
      <div className="gf-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-gf-teal/30 bg-gf-teal/10 px-4 py-1 text-sm font-medium text-gf-teal">Services</span>
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl">Build a smarter, more connected business.</h1>
          <p className="text-xl leading-relaxed text-primary-foreground/70">From your data foundation to AI-enabled workflows and e-commerce intelligence, we deliver practical solutions shaped around your goals.</p>
        </motion.div>
      </div>
    </section>
    <section className="gf-section bg-background">
      <div className="gf-container space-y-8">
        {services.map(({ id, icon: Icon, number, title, intro, description, deliverables, tools }, index) => (
          <motion.article id={id} key={id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="gf-card grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-gf-teal/10 p-4 text-gf-teal"><Icon className="h-8 w-8" /></div>
                <span className="text-sm font-semibold tracking-widest text-muted-foreground/60">{number}</span>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
              <p className="mb-3 text-lg font-medium text-gf-teal">{intro}</p>
              <p className="leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">What we can deliver</h3>
              <ul className="mb-7 grid gap-3 sm:grid-cols-2">
                {deliverables.map(item => <li key={item} className="flex gap-2 text-sm text-foreground/80"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gf-teal" />{item}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2">{tools.map(tool => <span key={tool} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">{tool}</span>)}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
    <CTASection title="Not sure where to start?" description="Tell us what you are trying to improve. We can help shape a practical first step, whether that is a focused integration, a data platform project, or an AI workflow." primaryCTA="Discuss your project" />
  </Layout>
);

export default Services;
