import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    industry: 'Insurance',
    title: 'Data Integration & Compliance Pipeline',
    description: 'End-to-end data pipeline with custom API connectors and automated reporting.',
    problem: 'Data from multiple API sources was siloed with no unified pipeline for extraction, transformation, or compliance reporting. Manual processes were error-prone and time-consuming.',
    solution: 'Developed custom Airbyte connectors to extract API data, loaded into BigQuery staging layer, performed DBT transformations for data quality, and deployed Looker dashboards with Airflow automation.',
    tools: ['Airbyte', 'FastAPI', 'Python', 'BigQuery', 'dbt', 'Airflow', 'Looker'],
    outcomes: [
      'Custom Airbyte connectors for seamless API integration',
      'Automated data extraction, transformation, and monitoring',
      'High-quality datasets with DBT cleansing and formatting',
      'Enabled agents to identify clients with violations for targeted services',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    industry: 'Call Center',
    title: 'Real-Time Analytics Pipeline',
    description: 'Webhook-based data pipeline with automated monitoring and BI reporting.',
    problem: 'No real-time data capture mechanism existed. Business intelligence reporting was delayed, and there was no automated monitoring for pipeline health or failure detection.',
    solution: 'Designed and implemented a data pipeline to capture real-time data via webhook into staging tables, performed transformations for the data mart layer, and automated with Airflow including failure alerts.',
    tools: ['REST API', 'Webhook', 'Python', 'BigQuery', 'Cloud Run Functions'],
    outcomes: [
      'Real-time webhook data capture and ingestion',
      'Automated data mart layer for BI reporting',
      'Pipeline automation with Airflow orchestration',
      'Proactive alerting for pipeline failure monitoring',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    industry: 'AdTech',
    title: 'Cross-Platform Campaign Analytics',
    description: 'Unified ad platform analytics with custom connectors and performance dashboards.',
    problem: 'Campaign data was scattered across diverse ad platforms with no unified view. The company could not compare platform performance or identify top-performing campaigns by publisher.',
    solution: 'Developed custom Airbyte connectors using the Airbyte CDK, loaded raw data to AWS S3 and Redshift, performed DBT transformations, and built Metabase dashboards with Airflow orchestration.',
    tools: ['Airbyte', 'Python', 'SQL', 'AWS S3', 'Redshift', 'dbt', 'Airflow', 'Metabase'],
    outcomes: [
      'Custom Airbyte CDK connectors for diverse ad platforms',
      'Unified data warehouse in AWS Redshift',
      'Cross-platform performance comparison capability',
      'Top-performing campaign identification by publisher',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    industry: 'Healthcare',
    title: 'Enterprise Data Modernization',
    description: 'Legacy system migration to modern cloud analytics with automated pipelines.',
    problem: 'Complex backend data structures in legacy SQL Server Reporting Services (SSRS) limited reporting efficiency and scalability. Manual data processes were time-consuming and error-prone.',
    solution: 'Performed PySpark transformations in Microsoft Fabric notebooks, designed automated Dataflows and Data Pipelines, migrated from SSRS to Fabric/Power BI, and developed optimized semantic models.',
    tools: ['Microsoft Fabric', 'PySpark', 'SparkSQL', 'MS SQL Server', 'Python', 'Power BI'],
    outcomes: [
      'Advanced PySpark transformations for data quality',
      'End-to-end automated data pipelines',
      'Modernized reporting from legacy SSRS to Power BI',
      'Scalable, high-performance semantic models',
    ],
    color: 'from-orange-500 to-red-500',
  },
];

const Projects = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="gf-section bg-gf-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gf-cyan rounded-full blur-[120px]" />
        </div>
        <div className="gf-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Real Results Across Industries
            </h1>
            <p className="text-xl text-primary-foreground/70">
              Explore how we've helped companies transform their data infrastructure and achieve measurable business outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="gf-section bg-background">
        <div className="gf-container">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="gf-card overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Overview */}
                  <div className="lg:border-r lg:border-border lg:pr-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-semibold mb-4`}>
                      {project.industry}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Middle Column - Challenge & Solution */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Challenge
                      </h3>
                      <p className="text-foreground">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Solution
                      </h3>
                      <p className="text-foreground">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Outcomes */}
                  <div className="lg:pl-8 lg:border-l lg:border-border">
                    <h3 className="text-sm font-semibold text-gf-teal uppercase tracking-wide mb-4">
                      Business Outcomes
                    </h3>
                    <ul className="space-y-3">
                      {project.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-gf-teal flex-shrink-0" />
                          <span className="text-foreground font-medium">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a Similar Challenge?"
        description="Let's discuss how we can apply our experience to solve your data engineering challenges."
        primaryCTA="Start a Conversation"
      />
    </Layout>
  );
};

export default Projects;
