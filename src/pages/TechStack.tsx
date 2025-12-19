import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const techStack = [
  {
    id: 'airbyte',
    name: 'Airbyte',
    tagline: 'Data Integration Platform',
    description: 'Open-source data integration platform that syncs data from applications, APIs, and databases to warehouses.',
    role: 'Extract & Load',
    details: [
      '300+ pre-built connectors',
      'Custom connector development',
      'Schema change detection',
      'Incremental syncs',
      'Self-hosted or cloud options',
    ],
    useCases: [
      'SaaS application data extraction',
      'Database replication',
      'API data ingestion',
      'Custom connector development',
    ],
    link: 'https://airbyte.com',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'dbt',
    name: 'dbt',
    tagline: 'Analytics Engineering',
    description: 'The standard for transforming data in your warehouse. Write modular SQL, test your data, and document everything.',
    role: 'Transform',
    details: [
      'Modular SQL transformations',
      'Automated testing',
      'Auto-generated documentation',
      'Version control with Git',
      'Incremental models',
    ],
    useCases: [
      'Data modeling and transformation',
      'Business logic centralization',
      'Data quality testing',
      'Metric definitions',
    ],
    link: 'https://getdbt.com',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 'airflow',
    name: 'Apache Airflow',
    tagline: 'Workflow Orchestration',
    description: 'Platform to programmatically author, schedule, and monitor workflows. The industry standard for data pipeline orchestration.',
    role: 'Orchestrate',
    details: [
      'DAG-based workflows',
      'Rich scheduling options',
      'Extensive operator library',
      'Built-in monitoring & alerting',
      'Scalable architecture',
    ],
    useCases: [
      'Pipeline scheduling',
      'Dependency management',
      'ETL/ELT orchestration',
      'Cross-system workflows',
    ],
    link: 'https://airflow.apache.org',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-500/10',
  },
  {
    id: 'bigquery',
    name: 'Google BigQuery',
    tagline: 'Cloud Data Warehouse',
    description: 'Serverless, highly scalable, and cost-effective multi-cloud data warehouse designed for business agility.',
    role: 'Store & Query',
    details: [
      'Serverless architecture',
      'Petabyte-scale storage',
      'Standard SQL interface',
      'Built-in ML capabilities',
      'Real-time streaming inserts',
    ],
    useCases: [
      'Central data warehouse',
      'Analytics workloads',
      'ML feature stores',
      'Cross-cloud data sharing',
    ],
    link: 'https://cloud.google.com/bigquery',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    id: 'looker',
    name: 'Looker',
    tagline: 'Business Intelligence',
    description: 'Modern BI platform with semantic modeling that enables self-serve analytics and consistent metrics across the organization.',
    role: 'Analyze & Visualize',
    details: [
      'LookML semantic layer',
      'Interactive dashboards',
      'Embedded analytics',
      'Scheduled reports',
      'API-first architecture',
    ],
    useCases: [
      'Self-serve analytics',
      'Executive dashboards',
      'Embedded analytics',
      'Metric definitions',
    ],
    link: 'https://looker.com',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
];

const TechStack = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="gf-section bg-gf-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gf-teal rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-gf-cyan rounded-full blur-[80px]" />
        </div>
        <div className="gf-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
              Our Technology
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Modern Data Stack
            </h1>
            <p className="text-xl text-primary-foreground/70">
              We use best-in-class, open-source and cloud-native tools to build reliable, scalable, and maintainable data platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Overview */}
      <section className="py-12 bg-secondary/50 border-y border-border">
        <div className="gf-container">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {techStack.map((tech, index) => (
              <div key={tech.name} className="flex items-center gap-4">
                <a
                  href={`#${tech.id}`}
                  className={`px-4 py-2 rounded-lg ${tech.bgColor} hover:scale-105 transition-transform`}
                >
                  <span className={`font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                    {tech.name}
                  </span>
                </a>
                {index < techStack.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Details */}
      <section className="gf-section bg-background">
        <div className="gf-container">
          <div className="space-y-24">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.id}
                id={tech.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{tech.name[0]}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">{tech.role}</span>
                        <h2 className="text-3xl font-bold text-foreground">{tech.name}</h2>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      {tech.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {tech.details.map((detail) => (
                            <li key={detail} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.color}`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Use Cases</h3>
                        <ul className="space-y-2">
                          {tech.useCases.map((useCase) => (
                            <li key={useCase} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.color}`} />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gf-teal hover:text-gf-teal-light transition-colors"
                    >
                      Learn more about {tech.name}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className={`rounded-2xl ${tech.bgColor} p-8 aspect-video flex items-center justify-center`}>
                      <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-2xl`}>
                        <span className="text-5xl font-bold text-white">{tech.name[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Build Your Modern Data Stack?"
        description="Let us help you implement a best-in-class data platform using these proven technologies."
        secondaryCTA="View Services"
        secondaryLink="/services"
      />
    </Layout>
  );
};

export default TechStack;
