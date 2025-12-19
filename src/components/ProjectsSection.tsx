import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    industry: 'AdTech',
    title: 'Marketing Analytics Platform',
    problem: 'Siloed campaign data across 10+ advertising platforms with no unified reporting.',
    solution: 'Built a centralized data pipeline aggregating all ad platforms with real-time performance metrics.',
    tools: ['Airbyte', 'dbt', 'BigQuery', 'Looker'],
    outcome: '60% faster campaign optimization and $2M in identified savings',
  },
  {
    industry: 'Call Center',
    title: 'Operational Intelligence System',
    problem: 'Manual reporting from phone systems causing 24-hour delays in performance insights.',
    solution: 'Automated call data ingestion with real-time agent dashboards and predictive staffing models.',
    tools: ['Airflow', 'dbt', 'BigQuery', 'Looker'],
    outcome: '85% reduction in reporting time and 20% improvement in agent utilization',
  },
  {
    industry: 'Insurance',
    title: 'Claims & Compliance Pipeline',
    problem: 'Fragmented policy and claims data making compliance reporting manual and error-prone.',
    solution: 'Unified data platform with automated compliance reports and claims analytics.',
    tools: ['Airbyte', 'dbt', 'BigQuery', 'Looker'],
    outcome: 'Audit preparation reduced from 2 weeks to 2 days',
  },
  {
    industry: 'Healthcare',
    title: 'Patient Analytics Dashboard',
    problem: 'Disconnected EHR and operational data preventing visibility into patient outcomes.',
    solution: 'HIPAA-compliant data warehouse with patient journey analytics and operational KPIs.',
    tools: ['Airbyte', 'Airflow', 'BigQuery', 'Looker'],
    outcome: '40% improvement in patient throughput tracking',
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
