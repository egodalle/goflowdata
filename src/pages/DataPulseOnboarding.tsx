import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataPulseLayout } from '@/components/datapulse/DataPulseLayout';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Store, 
  Key, 
  CheckCircle2, 
  Loader2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useDataPulseAuth } from '@/contexts/DataPulseAuthContext';

const steps = [
  { id: 1, title: 'Store Details', description: 'Enter your Shopify store URL' },
  { id: 2, title: 'API Credentials', description: 'Connect with API keys' },
  { id: 3, title: 'Confirm & Connect', description: 'Review and complete setup' },
];

const DataPulseOnboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useDataPulseAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    storeUrl: '',
    apiKey: '',
    apiSecret: '',
    accessToken: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText('https://api.datapulse.io/webhooks/shopify');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.storeName || !formData.storeUrl) {
        toast({
          title: "Missing information",
          description: "Please fill in your store name and URL.",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.accessToken) {
        toast({
          title: "Missing credentials",
          description: "Please enter your Admin API access token.",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConnect = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to connect your store.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      const { error } = await supabase.from('datapulse_stores').insert({
        user_id: user.id,
        store_name: formData.storeName,
        store_url: formData.storeUrl,
        api_key: formData.apiKey || null,
        api_secret: formData.apiSecret || null,
        access_token: formData.accessToken,
        platform: 'shopify',
        is_connected: true,
        last_synced_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Store connected!",
        description: "Your Shopify store has been successfully connected to DataPulse.",
      });
      
      navigate('/datapulse/dashboard');
    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect store. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <DataPulseLayout>
      <section className="min-h-[80vh] py-20">
        <div className="gf-container max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep > step.id
                          ? 'bg-datapulse-green text-white'
                          : currentStep === step.id
                          ? 'text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                      style={currentStep === step.id ? { background: 'var(--dp-gradient)' } : {}}
                    >
                      {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                    </div>
                    <span className="mt-2 text-sm font-medium hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded ${
                        currentStep > step.id ? 'bg-datapulse-green' : 'bg-muted'
                      }`}
                      style={{ minWidth: '60px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-dp-purple/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: 'var(--dp-gradient)' }}>
                        <Store className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Connect Your Shopify Store</CardTitle>
                    </div>
                    <CardDescription>
                      Enter your Shopify store details to get started with analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input
                        id="storeName"
                        placeholder="My Awesome Store"
                        value={formData.storeName}
                        onChange={(e) => handleChange('storeName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeUrl">Store URL</Label>
                      <Input
                        id="storeUrl"
                        placeholder="mystore.myshopify.com"
                        value={formData.storeUrl}
                        onChange={(e) => handleChange('storeUrl', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter your myshopify.com domain (e.g., mystore.myshopify.com)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-dp-purple/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: 'var(--dp-gradient)' }}>
                        <Key className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>API Credentials</CardTitle>
                    </div>
                    <CardDescription>
                      Connect DataPulse to your Shopify store using Admin API credentials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-dp-purple/10 border border-dp-purple/20">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        How to get your API credentials
                      </h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Go to your Shopify Admin → Settings → Apps and sales channels</li>
                        <li>Click "Develop apps" and create a new app</li>
                        <li>Configure Admin API scopes (read_orders, read_products, read_customers)</li>
                        <li>Install the app and copy the Admin API access token</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accessToken">Admin API Access Token *</Label>
                      <Input
                        id="accessToken"
                        type="password"
                        placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={formData.accessToken}
                        onChange={(e) => handleChange('accessToken', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key (optional)</Label>
                        <Input
                          id="apiKey"
                          placeholder="API Key"
                          value={formData.apiKey}
                          onChange={(e) => handleChange('apiKey', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apiSecret">API Secret (optional)</Label>
                        <Input
                          id="apiSecret"
                          type="password"
                          placeholder="API Secret"
                          value={formData.apiSecret}
                          onChange={(e) => handleChange('apiSecret', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Webhook URL (for real-time sync)</Label>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value="https://api.datapulse.io/webhooks/shopify"
                          className="bg-muted"
                        />
                        <Button variant="outline" size="icon" onClick={handleCopyWebhook}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add this webhook URL in Shopify for real-time order updates
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-dp-purple/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: 'var(--dp-gradient)' }}>
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Review & Connect</CardTitle>
                    </div>
                    <CardDescription>
                      Confirm your store details before connecting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg bg-card border border-border space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Platform</span>
                        <span className="font-medium flex items-center gap-2">
                          <img 
                            src="https://cdn.shopify.com/s/files/1/0633/0959/4911/files/shopify-logo.png" 
                            alt="Shopify" 
                            className="w-5 h-5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          Shopify
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Store Name</span>
                        <span className="font-medium">{formData.storeName}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Store URL</span>
                        <span className="font-medium">{formData.storeUrl}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Access Token</span>
                        <span className="font-medium text-datapulse-green">✓ Configured</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-datapulse-green/10 border border-datapulse-green/20">
                      <h4 className="font-medium text-datapulse-green mb-2">What happens next?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• We'll sync your historical orders and products</li>
                        <li>• Your dashboard will be ready in under 5 minutes</li>
                        <li>• Real-time updates will start flowing automatically</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                className="gap-2 text-white"
                style={{ background: 'var(--dp-gradient)' }}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="gap-2 text-white"
                style={{ background: 'var(--dp-gradient)' }}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect Store
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </section>
    </DataPulseLayout>
  );
};

export default DataPulseOnboarding;
