import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import airbyteLogo from '@/assets/logos/airbyte-logo.png';
import dbtLogo from '@/assets/logos/dbt-logo.png';
import airflowLogo from '@/assets/logos/airflow-logo.png';
import bigqueryLogo from '@/assets/logos/bigquery-logo.svg';
import lookerLogo from '@/assets/logos/looker-logo.png';

const techStack = [
  {
    name: 'Airbyte',
    description: 'Open-source data integration platform for EL (Extract, Load) pipelines.',
    role: 'Data Extraction',
    logo: airbyteLogo,
  },
  {
    name: 'dbt',
    description: 'Analytics engineering tool for transforming data in your warehouse.',
    role: 'Data Transformation',
    logo: dbtLogo,
  },
  {
    name: 'Apache Airflow',
    description: 'Workflow orchestration platform for scheduling and monitoring pipelines.',
    role: 'Orchestration',
    logo: airflowLogo,
  },
  {
    name: 'Google BigQuery',
    description: 'Serverless, highly scalable cloud data warehouse.',
    role: 'Data Warehouse',
    logo: bigqueryLogo,
  },
  {
    name: 'Looker',
    description: 'Business intelligence and analytics platform with semantic modeling.',
    role: 'Analytics & BI',
    logo: lookerLogo,
  },
];

export const TechStackSection = () => {
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
            Our Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Modern Data Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We use best-in-class tools to build reliable, scalable data platforms.
          </p>
        </motion.div>

        {/* Pipeline Flow */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gf-teal/20 via-gf-cyan/30 to-gf-teal/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="gf-card gf-card-hover text-center h-full">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 shadow-lg overflow-hidden p-2">
                    <img src={tech.logo} alt={`${tech.name} logo`} className="w-full h-full object-contain" />
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-medium mb-2">
                    {tech.role}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
                
                {/* Arrow between items (desktop only) */}
                {index < techStack.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-gf-teal" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
