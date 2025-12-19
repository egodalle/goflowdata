import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    industry: 'AdTech',
    title: 'Marketing Analytics Platform',
    description: 'Unified marketing data platform for a leading digital advertising agency.',
    problem: 'The client had campaign data scattered across 10+ advertising platforms (Google Ads, Meta, TikTok, LinkedIn, etc.) with no unified view of marketing performance. Manual reporting took 3 days per week.',
    solution: 'We built a centralized data pipeline that automatically extracts data from all ad platforms using Airbyte, transforms it with dbt into a unified marketing schema, and delivers real-time dashboards in Looker.',
    tools: ['Airbyte', 'dbt', 'BigQuery', 'Looker', 'Airflow'],
    outcomes: [
      '60% faster campaign optimization cycles',
      '$2M in identified cost savings',
      '90% reduction in manual reporting time',
      'Real-time cross-platform attribution',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    industry: 'Call Center',
    title: 'Operational Intelligence System',
    description: 'Real-time operational analytics for a 500-seat contact center.',
    problem: 'Manual reporting from phone systems caused 24-hour delays in performance insights. Supervisors couldn\'t identify issues until the next day, leading to poor customer experiences.',
    solution: 'We automated call data ingestion from Genesys and Salesforce, built predictive staffing models, and created real-time agent performance dashboards with alerting.',
    tools: ['Airflow', 'dbt', 'BigQuery', 'Looker'],
    outcomes: [
      '85% reduction in reporting time',
      '20% improvement in agent utilization',
      'Real-time queue monitoring',
      'Predictive staffing recommendations',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    industry: 'Insurance',
    title: 'Claims & Compliance Pipeline',
    description: 'Unified data platform for policy, claims, and regulatory reporting.',
    problem: 'Fragmented policy and claims data across legacy systems made compliance reporting a manual, error-prone process. Audit preparation took 2 weeks of dedicated effort.',
    solution: 'We built a compliant data warehouse consolidating all policy and claims data, with automated regulatory reports and real-time claims analytics.',
    tools: ['Airbyte', 'dbt', 'BigQuery', 'Looker'],
    outcomes: [
      'Audit prep reduced from 2 weeks to 2 days',
      '100% regulatory compliance maintained',
      'Real-time claims fraud detection',
      'Automated monthly regulatory filings',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    industry: 'Healthcare',
    title: 'Patient Analytics Dashboard',
    description: 'HIPAA-compliant analytics platform for a multi-location dental practice.',
    problem: 'Disconnected EHR and practice management data prevented visibility into patient outcomes, appointment utilization, and revenue performance across 12 locations.',
    solution: 'We built a HIPAA-compliant data warehouse integrating Dentrix, patient scheduling, and billing systems with role-based Looker dashboards for each stakeholder group.',
    tools: ['Airbyte', 'Airflow', 'BigQuery', 'Looker'],
    outcomes: [
      '40% improvement in patient throughput tracking',
      'Unified view across 12 locations',
      'HIPAA-compliant data handling',
      'Provider productivity benchmarking',
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
