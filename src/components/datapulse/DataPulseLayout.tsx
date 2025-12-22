import { ReactNode } from 'react';
import { DataPulseNavbar } from './DataPulseNavbar';
import { DataPulseFooter } from './DataPulseFooter';

interface DataPulseLayoutProps {
  children: ReactNode;
}

export const DataPulseLayout = ({ children }: DataPulseLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DataPulseNavbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <DataPulseFooter />
    </div>
  );
};
