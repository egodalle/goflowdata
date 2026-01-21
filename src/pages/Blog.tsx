import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import airbytelogo from '@/assets/logos/airbyte-logo.png';
import airflowlogo from '@/assets/logos/airflow-logo.png';
import dbtlogo from '@/assets/logos/dbt-logo.png';

const blogPosts = [
  {
    slug: 'airbyte-data-integration',
    title: 'Airbyte: The Open-Source Data Integration Platform Your Business Needs',
    excerpt: 'Discover how Airbyte simplifies data extraction and loading with 300+ pre-built connectors, making data integration accessible for businesses of all sizes.',
    image: airbytelogo,
    date: 'January 15, 2025',
    readTime: '4 min read',
    category: 'Data Integration',
  },
  {
    slug: 'apache-airflow-orchestration',
    title: 'Apache Airflow: Mastering Workflow Orchestration for Modern Data Teams',
    excerpt: 'Learn how Apache Airflow helps businesses automate, schedule, and monitor complex data workflows with ease and reliability.',
    image: airflowlogo,
    date: 'January 12, 2025',
    readTime: '4 min read',
    category: 'Orchestration',
  },
  {
    slug: 'dbt-analytics-engineering',
    title: 'dbt: Transform Your Raw Data Into Trusted Analytics',
    excerpt: 'Explore how dbt empowers analytics engineers to transform data directly in the warehouse using SQL, with built-in testing and documentation.',
    image: dbtlogo,
    date: 'January 10, 2025',
    readTime: '4 min read',
    category: 'Transformation',
  },
];

const Blog = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="gf-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gf-teal/10 text-gf-teal text-sm font-medium mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & <span className="gf-gradient-text">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest in data engineering, best practices, and tool guides from our expert team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full gf-card group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gf-navy/50 flex items-center justify-center p-8">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-16 w-auto object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-gf-teal/10 text-gf-teal text-xs font-medium mb-3">
                          {post.category}
                        </span>
                        <h2 className="text-xl font-semibold mb-3 group-hover:text-gf-teal transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-gf-teal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read More <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
