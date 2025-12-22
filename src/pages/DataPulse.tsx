import { DataPulseLayout } from '@/components/datapulse/DataPulseLayout';
import { DataPulseHero } from '@/components/datapulse/DataPulseHero';
import { DataPulsePlatforms } from '@/components/datapulse/DataPulsePlatforms';
import { DataPulseFeatures } from '@/components/datapulse/DataPulseFeatures';
import { DataPulseKPIs } from '@/components/datapulse/DataPulseKPIs';
import { DataPulsePricing } from '@/components/datapulse/DataPulsePricing';
import { DataPulseArchitecture } from '@/components/datapulse/DataPulseArchitecture';
import { DataPulseCTA } from '@/components/datapulse/DataPulseCTA';

const DataPulse = () => {
  return (
    <DataPulseLayout>
      <DataPulseHero />
      <section id="platforms">
        <DataPulsePlatforms />
      </section>
      <section id="features">
        <DataPulseFeatures />
      </section>
      <DataPulseArchitecture />
      <DataPulseKPIs />
      <section id="pricing">
        <DataPulsePricing />
      </section>
      <DataPulseCTA />
    </DataPulseLayout>
  );
};

export default DataPulse;
