import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import airbytelogo from '@/assets/logos/airbyte-logo.png';
import airflowlogo from '@/assets/logos/airflow-logo.png';
import dbtlogo from '@/assets/logos/dbt-logo.png';

const blogContent = {
  'airbyte-data-integration': {
    title: 'Airbyte: The Open-Source Data Integration Platform Your Business Needs',
    image: airbytelogo,
    date: 'January 15, 2025',
    readTime: '4 min read',
    category: 'Data Integration',
    content: `
      <h2>What is Airbyte?</h2>
      <p>Airbyte is an open-source data integration platform that enables businesses to consolidate data from multiple sources into a single destination. Whether you're pulling data from SaaS applications, databases, APIs, or files, Airbyte provides a unified solution with over 300 pre-built connectors that work out of the box.</p>
      
      <p>Unlike traditional ETL tools that require extensive coding knowledge, Airbyte democratizes data integration by offering a user-friendly interface that both technical and non-technical team members can navigate with ease.</p>

      <h2>How Airbyte Helps Your Business</h2>
      <p>In today's data-driven landscape, businesses generate data across dozens of platforms—from CRMs like Salesforce to marketing tools like Google Ads, e-commerce platforms, and internal databases. Airbyte bridges these data silos by automatically extracting and loading data into your preferred data warehouse.</p>
      
      <p>This consolidation enables powerful analytics, giving you a 360-degree view of your operations. Marketing teams can correlate campaign performance with sales data, while finance can reconcile transactions across multiple systems. The result? Faster, more informed decision-making that drives revenue growth.</p>

      <h2>Easy Installation and Management</h2>
      <p>Getting started with Airbyte is remarkably straightforward. You can deploy it locally using Docker with just a few commands, or leverage Airbyte Cloud for a fully managed experience. The platform handles schema changes automatically, includes built-in monitoring for sync failures, and offers incremental sync capabilities to minimize data transfer costs.</p>
      
      <p>With its intuitive connector builder, even custom integrations become manageable. Your team can create new connectors using low-code templates or Python, ensuring you're never limited by available integrations. This flexibility, combined with enterprise-grade reliability, makes Airbyte the go-to choice for modern data teams.</p>
    `,
  },
  'apache-airflow-orchestration': {
    title: 'Apache Airflow: Mastering Workflow Orchestration for Modern Data Teams',
    image: airflowlogo,
    date: 'January 12, 2025',
    readTime: '4 min read',
    category: 'Orchestration',
    content: `
      <h2>What is Apache Airflow?</h2>
      <p>Apache Airflow is an open-source platform designed to programmatically author, schedule, and monitor workflows. Originally developed by Airbnb, it has become the industry standard for orchestrating complex data pipelines. Airflow uses Directed Acyclic Graphs (DAGs) to define workflows as code, making your data processes version-controlled, testable, and collaborative.</p>
      
      <p>At its core, Airflow separates the logic of what needs to happen from the execution, allowing you to define dependencies between tasks and let the platform handle the scheduling, retries, and monitoring automatically.</p>

      <h2>How Airflow Helps Your Business</h2>
      <p>Modern businesses run countless automated processes—from nightly data warehouse refreshes to real-time event processing and ML model training. Without proper orchestration, these processes become fragile, difficult to debug, and impossible to scale. Airflow brings order to this chaos.</p>
      
      <p>With Airflow, your data team gains complete visibility into pipeline health through rich UI dashboards. Failed tasks trigger automatic alerts, historical runs are logged for auditing, and complex dependencies are visualized clearly. This transparency reduces downtime, accelerates troubleshooting, and builds trust in your data infrastructure.</p>

      <h2>Easy Installation and Management</h2>
      <p>Deploying Airflow has never been easier. For quick starts, you can use Docker Compose to spin up a local environment in minutes. For production workloads, managed services like Google Cloud Composer or Amazon MWAA eliminate operational overhead entirely while providing enterprise-grade reliability.</p>
      
      <p>Airflow's Python-based DAG definitions mean your existing engineering team can start building workflows immediately without learning new languages. The extensive operator library—covering everything from SQL databases to cloud services—ensures most integrations are plug-and-play. Combined with features like dynamic DAG generation and parameterized runs, Airflow scales from simple cron replacements to enterprise-wide orchestration platforms.</p>
    `,
  },
  'dbt-analytics-engineering': {
    title: 'dbt: Transform Your Raw Data Into Trusted Analytics',
    image: dbtlogo,
    date: 'January 10, 2025',
    readTime: '4 min read',
    category: 'Transformation',
    content: `
      <h2>What is dbt?</h2>
      <p>dbt (data build tool) is an open-source transformation framework that enables analytics engineers to transform raw data in their warehouse using simple SQL SELECT statements. Instead of complex ETL scripts, dbt treats your analytical code like software—with version control, testing, and documentation built into the workflow.</p>
      
      <p>Think of dbt as the "T" in ELT (Extract, Load, Transform). While tools like Airbyte handle extraction and loading, dbt takes over to model, clean, and structure your data into analytics-ready tables that power dashboards and business intelligence.</p>

      <h2>How dbt Helps Your Business</h2>
      <p>Raw data is messy. Customer records have duplicates, timestamps span multiple time zones, and business logic is scattered across spreadsheets and tribal knowledge. dbt centralizes this transformation logic into a single, auditable codebase that becomes your company's source of truth.</p>
      
      <p>With dbt, you define metrics once and reference them everywhere—ensuring that "revenue" means the same thing in every report. Built-in data tests catch quality issues before they reach stakeholders, while auto-generated documentation keeps everyone aligned on definitions. The result is analytics that people actually trust, leading to faster adoption and better business decisions.</p>

      <h2>Easy Installation and Management</h2>
      <p>Getting started with dbt requires minimal setup. Install the CLI via pip, connect to your data warehouse, and you're writing transformations within minutes. For teams preferring a managed experience, dbt Cloud provides a web-based IDE, job scheduling, and collaboration features without any infrastructure management.</p>
      
      <p>dbt's learning curve is gentle because it leverages SQL—the language your analysts already know. Modular model design encourages reusability, while Jinja templating adds flexibility when needed. The vibrant dbt community contributes thousands of packages for common patterns, from date spine generation to PII masking. Whether you're a startup or enterprise, dbt adapts to your scale while maintaining simplicity.</p>
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug as keyof typeof blogContent] : null;

  if (!post) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="gf-container text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pt-32 pb-20">
        <div className="gf-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gf-teal transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <button className="flex items-center gap-2 hover:text-gf-teal transition-colors">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            <div className="aspect-video bg-gf-navy/30 rounded-xl flex items-center justify-center p-12 mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="h-24 md:h-32 w-auto object-contain"
              />
            </div>

            <div
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-gf-teal prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-4">Ready to implement these tools?</h3>
              <p className="text-muted-foreground mb-6">
                Our team specializes in building modern data stacks using Airbyte, Airflow, and dbt. Let's discuss how we can accelerate your data journey.
              </p>
              <Button variant="accent" asChild>
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
