import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { CheckCircle2 } from 'lucide-react';

import airbyteLogo from '@/assets/logos/airbyte-logo.png';
import dbtLogo from '@/assets/logos/dbt-logo.png';
import airflowLogo from '@/assets/logos/airflow-logo.png';
import bigqueryLogo from '@/assets/logos/bigquery-logo.svg';
import lookerLogo from '@/assets/logos/looker-logo.webp';

const services = [
  {
    id: 'extraction',
    logo: airbyteLogo,
    title: 'Data Extraction & Ingestion',
    description: 'Connect to any data source with reliable, scalable extraction pipelines.',
    longDescription: 'We build robust data extraction pipelines that connect to your entire data ecosystem. From SaaS applications and databases to APIs and flat files, we ensure every data source is captured and centralized.',
    features: [
      'Airbyte for 300+ pre-built connectors',
      'Custom API integrations',
      'Real-time and batch ingestion',
      'Schema change detection',
      'Data validation at source',
    ],
    tools: ['Airbyte', 'REST APIs', 'Custom Connectors', 'Fivetran'],
  },
  {
    id: 'transformation',
    logo: dbtLogo,
    title: 'Data Transformation & Modeling',
    description: 'Transform raw data into analytics-ready models with best practices.',
    longDescription: 'We apply analytics engineering principles to transform your raw data into clean, tested, and documented data models. Using dbt, we create a single source of truth that your entire organization can rely on.',
    features: [
      'Modular SQL transformations',
      'Automated testing and documentation',
      'Version control with Git',
      'Incremental processing',
      'Data quality checks',
    ],
    tools: ['dbt', 'SQL', 'Git', 'Great Expectations'],
  },
  {
    id: 'orchestration',
    logo: airflowLogo,
    title: 'Workflow Orchestration',
    description: 'Automate and schedule your data workflows with confidence.',
    longDescription: 'We design and implement workflow orchestration that keeps your data pipelines running reliably. With Apache Airflow, we build DAGs that are easy to monitor, maintain, and scale.',
    features: [
      'Apache Airflow DAGs',
      'Dependency management',
      'Automated retries and alerts',
      'Parallel processing',
      'Comprehensive logging',
    ],
    tools: ['Apache Airflow', 'Dagster', 'Prefect', 'Cloud Composer'],
  },
  {
    id: 'warehousing',
    logo: bigqueryLogo,
    title: 'Cloud Data Warehousing',
    description: 'Centralize your data in a scalable, secure cloud warehouse.',
    longDescription: 'We architect and optimize cloud data warehouses that scale with your business. Google BigQuery provides the foundation for analytics workloads with minimal operational overhead.',
    features: [
      'Schema design and optimization',
      'Partitioning and clustering',
      'Cost optimization',
      'Access control and security',
      'Cross-cloud connectivity',
    ],
    tools: ['Google BigQuery', 'Snowflake', 'Redshift', 'Databricks'],
  },
  {
    id: 'analytics',
    logo: lookerLogo,
    logoScale: 'scale-125',
    title: 'Analytics & BI',
    description: 'Build dashboards and enable self-serve analytics across your organization.',
    longDescription: 'We implement business intelligence solutions that empower your teams to make data-driven decisions. With Looker, we create semantic models and dashboards that provide consistent, trustworthy metrics.',
    features: [
      'Semantic modeling (LookML)',
      'Interactive dashboards',
      'Scheduled reports',
      'Embedded analytics',
      'Self-serve exploration',
    ],
    tools: ['Looker', 'Tableau', 'Power BI', 'Metabase'],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="gf-section bg-gf-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gf-teal rounded-full blur-[100px]" />
        </div>
        <div className="gf-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              End-to-End Data Engineering Solutions
            </h1>
            <p className="text-xl text-primary-foreground/70">
              From data extraction to analytics, we design, build, and optimize every component of your modern data stack.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="gf-section bg-background">
        <div className="gf-container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg overflow-hidden p-3">
                    <img 
                      src={service.logo} 
                      alt={`${service.title} logo`} 
                      className={`w-full h-full object-contain ${service.logoScale || ''}`}
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.longDescription}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-gf-teal flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted p-8 flex items-center justify-center">
                      <div className="w-full h-full rounded-xl border border-border bg-white shadow-xl flex items-center justify-center p-12">
                        <img 
                          src={service.logo} 
                          alt={`${service.title} logo`} 
                          className={`w-full h-full object-contain ${service.logoScale || ''}`}
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 p-4 rounded-xl bg-card shadow-lg border border-border">
                      <span className="text-sm font-medium text-foreground">{service.tools[0]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Custom Solution?"
        description="Every business has unique data challenges. Let's discuss how we can tailor our services to meet your specific needs."
      />
    </Layout>
  );
};

export default Services;
