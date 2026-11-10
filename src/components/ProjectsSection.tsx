import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import projectInsurance from '@/assets/images/project-insurance.jpg';
import projectCallcenter from '@/assets/images/project-callcenter.jpg';
import projectAdtech from '@/assets/images/project-adtech.jpg';
import projectHealthcare from '@/assets/images/project-healthcare.jpg';

const projects = [
  {
    industry: 'Insurance',
    title: 'Data Integration & Compliance Pipeline',
    problem: 'Fragmented API data sources with no unified pipeline for policy and compliance reporting.',
    outcome: 'Agents could identify clients with violations for targeted service offerings.',
    tools: ['Airbyte', 'BigQuery', 'dbt', 'Looker'],
    image: projectInsurance,
    imageAlt: 'Insurance operations room with compliance analytics on screen',
  },
  {
    industry: 'Call Center',
    title: 'Real-Time Analytics Pipeline',
    problem: 'No real-time visibility into call data for operations and reporting.',
    outcome: 'Live BI reporting with automated pipeline monitoring and failure alerts.',
    tools: ['Webhooks', 'BigQuery', 'Cloud Run'],
    image: projectCallcenter,
    imageAlt: 'Call center operations floor with live monitoring screens',
  },
  {
    industry: 'AdTech',
    title: 'Cross-Platform Campaign Analytics',
    problem: 'Scattered ad platform data with no unified view across publishers.',
    outcome: 'One view to compare publishers and identify top campaigns.',
    tools: ['Airbyte', 'Redshift', 'dbt', 'Metabase'],
    image: projectAdtech,
    imageAlt: 'Media studio screens showing campaign performance charts',
  },
  {
    industry: 'Healthcare',
    title: 'Enterprise Data Modernization',
    problem: 'Legacy SSRS and complex backend structures limiting analytics.',
    outcome: 'Modern reporting on Microsoft Fabric with faster, trusted semantic models.',
    tools: ['Fabric', 'PySpark', 'Power BI'],
    image: projectHealthcare,
    imageAlt: 'Hospital analytics room with modern reporting displays',
  },
];

export const ProjectsSection = () => (
  <section className="gf-section bg-secondary/40">
    <div className="gf-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div className="max-w-xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gf-teal">Selected work</p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl text-balance">
            Project experience
          </h2>
          <p className="text-muted-foreground">
            Representative examples. Details are generalized to protect client confidentiality.
          </p>
        </div>
        <Button variant="outline" className="rounded-full" asChild>
          <Link to="/projects">
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <p className="absolute bottom-3 left-5 text-[11px] font-medium uppercase tracking-[0.18em] text-gf-teal">
                {project.industry}
              </p>
            </div>
            <div className="flex flex-1 flex-col p-7 pt-5">
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
              <p className="mb-5 mt-auto text-sm font-medium text-foreground">{project.outcome}</p>
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
