import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const techStack = [
  {
    name: 'Airbyte',
    description: 'Open-source data integration platform for EL (Extract, Load) pipelines.',
    role: 'Data Extraction',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'dbt',
    description: 'Analytics engineering tool for transforming data in your warehouse.',
    role: 'Data Transformation',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Apache Airflow',
    description: 'Workflow orchestration platform for scheduling and monitoring pipelines.',
    role: 'Orchestration',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Google BigQuery',
    description: 'Serverless, highly scalable cloud data warehouse.',
    role: 'Data Warehouse',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Looker',
    description: 'Business intelligence and analytics platform with semantic modeling.',
    role: 'Analytics & BI',
    color: 'from-purple-500 to-pink-500',
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
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{tech.name[0]}</span>
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
