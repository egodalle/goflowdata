import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { Target, Users, Zap, Shield } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'We measure success by the business outcomes we deliver, not the code we write.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We work as an extension of your team, sharing knowledge and building internal capabilities.',
  },
  {
    icon: Zap,
    title: 'Pragmatic',
    description: 'We choose the right tool for the job, not the trendiest. Simple solutions that work.',
  },
  {
    icon: Shield,
    title: 'Reliable',
    description: 'We build systems designed for production. 99.9% uptime is our baseline, not our goal.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="gf-section bg-gf-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/3 w-72 h-72 bg-gf-teal rounded-full blur-[100px]" />
        </div>
        <div className="gf-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
              About GoFlow
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Building Data Infrastructure That Scales
            </h1>
            <p className="text-xl text-primary-foreground/70">
              We're a team of data engineers who believe that reliable data infrastructure is the foundation of every successful analytics and AI initiative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="gf-section bg-background">
        <div className="gf-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  GoFlow was founded with a simple belief: <span className="text-foreground font-medium">every company deserves data infrastructure that just works.</span>
                </p>
                <p>
                  Too many organizations struggle with fragmented data, manual processes, and unreliable pipelines. They can't trust their numbers, can't move fast, and can't compete with data-native companies.
                </p>
                <p>
                  We change that. We design, build, and optimize end-to-end data pipelines that transform raw data into trusted analytics and AI-ready platforms. Our clients don't just get better data—they get a competitive advantage.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted p-1">
                <div className="h-full w-full rounded-xl bg-card flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold gf-gradient-text mb-4">50+</div>
                    <div className="text-xl text-foreground font-medium mb-2">Pipelines Delivered</div>
                    <div className="text-muted-foreground">Across 4+ industries</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="gf-section bg-secondary/30">
        <div className="gf-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our values guide every project and every decision we make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="gf-card text-center"
              >
                <div className="p-4 w-fit mx-auto rounded-2xl gf-gradient-bg mb-4">
                  <value.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="gf-section bg-background">
        <div className="gf-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Approach
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground text-left">
              <p>
                We don't believe in one-size-fits-all solutions. Every engagement starts with understanding your unique data challenges, business goals, and technical constraints.
              </p>
              <p>
                We then design a pragmatic solution using proven technologies—Airbyte, dbt, Airflow, BigQuery, and Looker—that fits your scale, budget, and timeline.
              </p>
              <p>
                Most importantly, we build systems that your team can own. We document everything, train your staff, and ensure you're never locked into a black box.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Let's Build Something Great Together"
        description="Ready to transform your data infrastructure? We'd love to hear about your challenges."
      />
    </Layout>
  );
};

export default About;
