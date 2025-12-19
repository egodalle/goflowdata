import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TechStackSection } from '@/components/TechStackSection';
import { CTASection } from '@/components/CTASection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <TechStackSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
