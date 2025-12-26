import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import airbyteLogo from '@/assets/logos/airbyte-logo.png';
import dbtLogo from '@/assets/logos/dbt-logo.png';
import airflowLogo from '@/assets/logos/airflow-logo.png';
import bigqueryLogo from '@/assets/logos/bigquery-logo.svg';
import lookerLogo from '@/assets/logos/looker-logo.webp';

const services = [
  {
    logo: airbyteLogo,
    title: 'Data Extraction & Ingestion',
    description: 'Connect to any data source with Airbyte, custom APIs, and purpose-built connectors. Reliable, scalable data extraction.',
    tools: ['Airbyte', 'REST APIs', 'Custom Connectors'],
  },
  {
    logo: dbtLogo,
    title: 'Data Transformation & Modeling',
    description: 'Transform raw data into analytics-ready models with dbt. Version-controlled, tested, and documented.',
    tools: ['dbt', 'SQL', 'Data Modeling'],
  },
  {
    logo: airflowLogo,
    title: 'Workflow Orchestration',
    description: 'Automate and schedule your data workflows with Apache Airflow. Monitor, retry, and scale with confidence.',
    tools: ['Apache Airflow', 'DAGs', 'Scheduling'],
  },
  {
    logo: bigqueryLogo,
    title: 'Cloud Data Warehousing',
    description: 'Centralize your data in Google BigQuery. Scalable, secure, and optimized for analytics workloads.',
    tools: ['Google BigQuery', 'Data Warehouse', 'SQL'],
  },
  {
    logo: lookerLogo,
    title: 'Analytics & BI',
    description: 'Build dashboards and semantic models with Looker. Self-serve analytics for your entire organization.',
    tools: ['Looker', 'Dashboards', 'Metrics'],
    logoScale: 'scale-125',
  },
];

export const ServicesSection = () => {
  return (
    <section className="gf-section bg-background">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            End-to-End Data Engineering
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From data extraction to analytics, we build and optimize every layer of your data stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="gf-card gf-card-hover group"
            >
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-4 shadow-lg overflow-hidden p-2 group-hover:shadow-xl transition-shadow">
                <img 
                  src={service.logo} 
                  alt={`${service.title} logo`} 
                  className={`w-full h-full object-contain ${service.logoScale || ''}`} 
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="accent" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
