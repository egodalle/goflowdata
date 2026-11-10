import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, BrainCircuit, ShoppingCart } from 'lucide-react';
import serviceData from '@/assets/images/service-data.jpg';
import serviceAi from '@/assets/images/service-ai.jpg';
import serviceCommerce from '@/assets/images/service-commerce.jpg';

const services = [
  {
    icon: Database,
    number: '01',
    title: 'Data Engineering & Cloud Platforms',
    description: 'Connect fragmented systems, automate data movement, and turn raw data into trusted, well-modeled information.',
    capabilities: ['ETL/ELT and API integrations', 'BigQuery, Snowflake, cloud warehouses', 'dbt modeling, orchestration, quality'],
    image: serviceData,
    imageAlt: 'Cloud data platform with connected pipelines',
    featured: true,
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'AI & Intelligent Automation',
    description: 'Focused solutions that reduce manual work, surface knowledge, and support better operational decisions.',
    capabilities: ['AI agents and LLM workflows', 'RAG and document processing', 'Human-in-the-loop automations'],
    image: serviceAi,
    imageAlt: 'Documents flowing into an AI automation network',
  },
  {
    icon: ShoppingCart,
    number: '03',
    title: 'E-commerce Data Solutions',
    description: 'One consistent view of sales, inventory, marketing performance, and profitability across channels.',
    capabilities: ['Shopify, Amazon, marketplaces', 'Multi-channel sales analytics', 'Automated performance reporting'],
    image: serviceCommerce,
    imageAlt: 'Fulfillment operations with commerce analytics overlay',
  },
];

export const ServicesSection = () => (
  <section className="gf-section bg-background">
    <div className="gf-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gf-teal">What we do</p>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl text-balance">
          Technology that solves real business problems
        </h2>
        <p className="text-lg text-muted-foreground">
          From reliable data foundations to practical AI and commerce intelligence.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {services.map(({ icon: Icon, number, title, description, capabilities, image, imageAlt, featured }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className={`group relative overflow-hidden rounded-3xl border ${
              featured
                ? 'border-white/10 bg-gf-navy text-white lg:row-span-2 lg:flex lg:flex-col'
                : 'border-border bg-card'
            }`}
          >
            <div className={`relative overflow-hidden ${featured ? 'h-52 lg:h-64' : 'h-40'}`}>
              <img src={image} alt={imageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className={`absolute inset-0 ${featured ? 'bg-gradient-to-t from-gf-navy via-gf-navy/20 to-transparent' : 'bg-gradient-to-t from-card/80 to-transparent'}`} />
            </div>
            <div className="p-7 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className={`rounded-2xl p-3 ${featured ? 'bg-white/10 text-gf-teal' : 'bg-gf-teal/10 text-gf-teal'}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`text-xs font-medium tracking-[0.2em] ${featured ? 'text-white/35' : 'text-muted-foreground/60'}`}>
                  {number}
                </span>
              </div>
              <h3 className={`mb-3 text-2xl font-semibold tracking-tight ${featured ? 'text-white' : 'text-foreground'}`}>
                {title}
              </h3>
              <p className={`mb-6 max-w-md leading-relaxed ${featured ? 'text-white/65' : 'text-muted-foreground'}`}>
                {description}
              </p>
              <ul className="mb-8 space-y-2.5">
                {capabilities.map((item) => (
                  <li key={item} className={`flex items-center gap-2 text-sm ${featured ? 'text-white/80' : 'text-foreground/75'}`}>
                    <span className="h-1 w-1 rounded-full bg-gf-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gf-teal transition-all hover:gap-3"
              >
                Explore details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12">
        <Button variant="navy" size="lg" asChild>
          <Link to="/services">
            View all services <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
