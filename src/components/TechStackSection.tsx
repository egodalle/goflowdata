import { motion } from 'framer-motion';

import airbyteLogo from '@/assets/logos/airbyte-logo.png';
import dbtLogo from '@/assets/logos/dbt-logo.png';
import airflowLogo from '@/assets/logos/airflow-logo.png';
import bigqueryLogo from '@/assets/logos/bigquery-logo.svg';
import lookerLogo from '@/assets/logos/looker-logo.webp';

const techStack = [
  { name: 'Airbyte', logo: airbyteLogo },
  { name: 'dbt', logo: dbtLogo },
  { name: 'Apache Airflow', logo: airflowLogo },
  { name: 'Google BigQuery', logo: bigqueryLogo },
  { name: 'Looker', logo: lookerLogo, scale: 'scale-125' },
];

export const TechStackSection = () => (
  <section className="border-y border-border bg-background py-16 md:py-20">
    <div className="gf-container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gf-teal">The stack</p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Tools your team already trusts
        </h2>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 grayscale transition hover:grayscale-0"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
              <img src={tech.logo} alt="" className={`h-full w-full object-contain ${tech.scale ?? ''}`} />
            </div>
            <span className="text-sm font-medium text-foreground/80">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
