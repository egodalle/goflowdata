import { Layout } from '@/components/Layout';
import { DataPulseHero } from '@/components/datapulse/DataPulseHero';
import { DataPulsePlatforms } from '@/components/datapulse/DataPulsePlatforms';
import { DataPulseFeatures } from '@/components/datapulse/DataPulseFeatures';
import { DataPulseKPIs } from '@/components/datapulse/DataPulseKPIs';
import { DataPulsePricing } from '@/components/datapulse/DataPulsePricing';
import { DataPulseArchitecture } from '@/components/datapulse/DataPulseArchitecture';
import { DataPulseCTA } from '@/components/datapulse/DataPulseCTA';

const DataPulse = () => {
  return (
    <Layout>
      <DataPulseHero />
      <DataPulsePlatforms />
      <DataPulseFeatures />
      <DataPulseKPIs />
      <DataPulseArchitecture />
      <DataPulsePricing />
      <DataPulseCTA />
    </Layout>
  );
};

export default DataPulse;
