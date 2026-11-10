import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { CTASection } from '@/components/CTASection';
import { Target, Users, Zap, Shield } from 'lucide-react';

const values = [
  { icon: Target, title: 'Business-first', description: 'We start with the business problem and define what a useful outcome looks like before choosing technology.' },
  { icon: Users, title: 'Collaborative', description: 'We work alongside your people, communicate clearly, and share knowledge throughout the engagement.' },
  { icon: Zap, title: 'Pragmatic', description: 'We select tools and architectures to fit your needs, budget, and existing environment—not technology for its own sake.' },
  { icon: Shield, title: 'Built for ownership', description: 'We value maintainable systems, clear documentation, sensible controls, and solutions your team can operate.' },
];

const About = () => (
  <Layout>
    <section className="relative overflow-hidden bg-gf-navy py-20 md:py-28">
      <div className="absolute inset-0 opacity-20"><div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-gf-teal blur-[110px]" /></div>
      <div className="gf-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-gf-teal/30 bg-gf-teal/10 px-4 py-1 text-sm font-medium text-gf-teal">About GoFlow Data</span>
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl">Engineering that makes business data useful.</h1>
          <p className="text-xl leading-relaxed text-primary-foreground/70">We help growing businesses connect their systems, trust their information, and put data and AI to work on real operational challenges.</p>
        </motion.div>
      </div>
    </section>
    <section className="gf-section bg-background">
      <div className="gf-container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Our mission</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p><strong className="text-foreground">Make good data and useful automation accessible to growing businesses.</strong></p>
            <p>Many teams are held back by disconnected applications, manual reporting, inconsistent metrics, and processes that do not scale. Adding another tool rarely solves the underlying problem.</p>
            <p>GoFlow takes an end-to-end view: understand the workflow, connect the right systems, establish reliable data, and introduce automation or AI where it creates practical value.</p>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gf-teal">Our focus</p>
          <h3 className="mb-6 text-2xl font-bold text-foreground">A clear path from complexity to clarity.</h3>
          <ol className="space-y-5">
            {['Understand your goals and current systems', 'Design a solution that fits your business', 'Build, test, document, and integrate', 'Support adoption and continuous improvement'].map((step, i) => <li key={step} className="flex items-start gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gf-teal/15 text-sm font-bold text-gf-teal">{i + 1}</span><span className="pt-1 text-foreground/80">{step}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
    <section className="gf-section bg-secondary/30">
      <div className="gf-container">
        <div className="mx-auto mb-12 max-w-2xl text-center"><h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">How we work</h2><p className="text-lg text-muted-foreground">A thoughtful engineering partner, focused on outcomes and long-term usefulness.</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, i) => <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: i * .08 }} className="gf-card"><div className="mb-4 inline-flex rounded-xl bg-gf-teal/10 p-3 text-gf-teal"><Icon className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></motion.div>)}
        </div>
      </div>
    </section>
    <CTASection title="Let's solve the right problem." description="Share what your team is trying to achieve. We’ll help you explore a practical way forward." primaryCTA="Start a conversation" />
  </Layout>
);

export default About;
