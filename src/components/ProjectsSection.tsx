import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    industry: 'Insurance',
    title: 'Data Integration & Compliance Pipeline',
    problem: 'Fragmented API data sources with no unified pipeline for policy and compliance reporting.',
    solution: 'Built custom Airbyte connectors for API extraction, GBQ staging, DBT transformations, and Looker dashboards with Airflow automation.',
    tools: ['Airbyte', 'FastAPI', 'Python', 'BigQuery', 'dbt', 'Airflow', 'Looker'],
    outcome: 'Enabled agents to identify clients with violations for targeted service offerings',
  },
  {
    industry: 'Call Center',
    title: 'Real-Time Analytics Pipeline',
    problem: 'No real-time visibility into call data for business intelligence and operational reporting.',
    solution: 'Designed webhook-based data capture, staging tables, and automated data mart layer with Airflow alerting.',
    tools: ['REST API', 'Webhook', 'Python', 'BigQuery', 'Cloud Run Functions'],
    outcome: 'Real-time BI reporting with automated pipeline monitoring and failure alerts',
  },
  {
    industry: 'AdTech',
    title: 'Cross-Platform Campaign Analytics',
    problem: 'Scattered ad platform data with no unified view to compare performance across publishers.',
    solution: 'Custom Airbyte CDK connectors extracting to AWS S3/Redshift, DBT transformations, and Metabase dashboards.',
    tools: ['Airbyte', 'Python', 'AWS S3', 'Redshift', 'dbt', 'Airflow', 'Metabase'],
    outcome: 'Enabled cross-platform performance comparison and top campaign identification by publisher',
  },
  {
    industry: 'Healthcare',
    title: 'Enterprise Data Modernization',
    problem: 'Legacy SQL Server Reporting Services with complex backend structures limiting analytics capabilities.',
    solution: 'Migrated to Microsoft Fabric with PySpark transformations, automated pipelines, and optimized Power BI semantic models.',
    tools: ['Microsoft Fabric', 'PySpark', 'SparkSQL', 'MS SQL Server', 'Power BI'],
    outcome: 'Modernized reporting with scalable, high-performance analytics and reduced manual processes',
  },
];

export const ProjectsSection = () => {
  return (
    <section className="gf-section bg-secondary/30">
      <div className="gf-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Results Across Industries
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we've helped companies transform their data infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="gf-card gf-card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full gf-gradient-bg text-accent-foreground text-xs font-semibold">
                  {project.industry}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {project.title}
              </h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm font-medium text-foreground">Challenge:</span>
                  <p className="text-sm text-muted-foreground">{project.problem}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Solution:</span>
                  <p className="text-sm text-muted-foreground">{project.solution}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gf-teal">Outcome:</span>
                  <p className="text-sm text-foreground font-medium">{project.outcome}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs"
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
            <Link to="/projects">
              View All Projects
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
