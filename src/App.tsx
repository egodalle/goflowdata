import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataPulseAuthProvider } from "@/contexts/DataPulseAuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DataPulse from "./pages/DataPulse";
import DataPulseDemo from "./pages/DataPulseDemo";
import DataPulseContact from "./pages/DataPulseContact";
import DataPulseLogin from "./pages/DataPulseLogin";
import DataPulseOnboarding from "./pages/DataPulseOnboarding";
import DataPulseDashboard from "./pages/DataPulseDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataPulseAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/datapulse" element={<DataPulse />} />
            <Route path="/datapulse/demo" element={<DataPulseDemo />} />
            <Route path="/datapulse/contact" element={<DataPulseContact />} />
            <Route path="/datapulse/login" element={<DataPulseLogin />} />
            <Route path="/datapulse/onboarding" element={<DataPulseOnboarding />} />
            <Route path="/datapulse/dashboard" element={<DataPulseDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataPulseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
