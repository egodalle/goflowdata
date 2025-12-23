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
  Check,
  ShoppingBag,
  Music
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useDataPulseAuth } from '@/contexts/DataPulseAuthContext';

const platforms = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShoppingBag,
    color: 'from-[#96BF48] to-[#5E8E3E]',
    description: 'Connect your Shopify store',
    urlPlaceholder: 'mystore.myshopify.com',
    urlHint: 'Enter your myshopify.com domain',
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    icon: Music,
    color: 'from-[#00F2EA] to-[#FF0050]',
    description: 'Connect your TikTok Shop',
    urlPlaceholder: 'your-tiktok-shop-id',
    urlHint: 'Enter your TikTok Shop seller ID',
  },
];

const steps = [
  { id: 1, title: 'Platform', description: 'Choose your e-commerce platform' },
  { id: 2, title: 'Store Details', description: 'Enter your store information' },
  { id: 3, title: 'API Credentials', description: 'Connect with API keys' },
  { id: 4, title: 'Confirm & Connect', description: 'Review and complete setup' },
];

const DataPulseOnboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useDataPulseAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSettingUpDemo, setIsSettingUpDemo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    storeUrl: '',
    apiKey: '',
    apiSecret: '',
    accessToken: '',
  });

  const currentPlatform = platforms.find(p => p.id === selectedPlatform);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(`https://api.datapulse.io/webhooks/${selectedPlatform || 'shopify'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedPlatform) {
        toast({
          title: "Select a platform",
          description: "Please choose an e-commerce platform to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.storeName || !formData.storeUrl) {
        toast({
          title: "Missing information",
          description: "Please fill in your store name and URL.",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.accessToken) {
        toast({
          title: "Missing credentials",
          description: "Please enter your API access token.",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
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
        platform: selectedPlatform || 'shopify',
        is_connected: true,
        last_synced_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Store connected!",
        description: `Your ${currentPlatform?.name || 'store'} has been successfully connected to DataPulse.`,
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

  const handleDemoMode = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to use demo mode.",
        variant: "destructive",
      });
      return;
    }

    setIsSettingUpDemo(true);
    
    try {
      const { error } = await supabase.from('datapulse_stores').insert({
        user_id: user.id,
        store_name: 'Demo Store',
        store_url: 'demo-store.myshopify.com',
        platform: 'shopify',
        is_connected: true,
        last_synced_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Demo mode activated!",
        description: "Explore the dashboard with sample e-commerce data.",
      });
      
      navigate('/datapulse/dashboard');
    } catch (error: any) {
      toast({
        title: "Setup failed",
        description: error.message || "Failed to set up demo mode.",
        variant: "destructive",
      });
    } finally {
      setIsSettingUpDemo(false);
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
                      <CardTitle>Choose Your Platform</CardTitle>
                    </div>
                    <CardDescription>
                      Select the e-commerce platform you want to connect
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() => setSelectedPlatform(platform.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            selectedPlatform === platform.id
                              ? 'border-dp-purple bg-dp-purple/5'
                              : 'border-border hover:border-dp-purple/50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg`}>
                            <platform.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{platform.name}</h3>
                            <p className="text-sm text-muted-foreground">{platform.description}</p>
                          </div>
                          {selectedPlatform === platform.id && (
                            <CheckCircle2 className="w-6 h-6 text-dp-purple" />
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && currentPlatform && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-dp-purple/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${currentPlatform.color}`}>
                        <currentPlatform.icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Connect Your {currentPlatform.name}</CardTitle>
                    </div>
                    <CardDescription>
                      Enter your store details to get started with analytics
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
                      <Label htmlFor="storeUrl">Store URL / ID</Label>
                      <Input
                        id="storeUrl"
                        placeholder={currentPlatform.urlPlaceholder}
                        value={formData.storeUrl}
                        onChange={(e) => handleChange('storeUrl', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        {currentPlatform.urlHint}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && currentPlatform && (
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
                        <Key className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>API Credentials</CardTitle>
                    </div>
                    <CardDescription>
                      Connect DataPulse to your {currentPlatform.name} using API credentials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-dp-purple/10 border border-dp-purple/20">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        How to get your API credentials
                      </h4>
                      {selectedPlatform === 'shopify' ? (
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Go to your Shopify Admin → Settings → Apps and sales channels</li>
                          <li>Click "Develop apps" and create a new app</li>
                          <li>Configure Admin API scopes (read_orders, read_products, read_customers)</li>
                          <li>Install the app and copy the Admin API access token</li>
                        </ol>
                      ) : (
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Go to TikTok Shop Seller Center → My Account → API Management</li>
                          <li>Create a new API application</li>
                          <li>Select required permissions (Orders, Products, Inventory)</li>
                          <li>Copy the App Key and App Secret</li>
                        </ol>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accessToken">
                        {selectedPlatform === 'shopify' ? 'Admin API Access Token *' : 'App Secret *'}
                      </Label>
                      <Input
                        id="accessToken"
                        type="password"
                        placeholder={selectedPlatform === 'shopify' ? 'shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : 'Your TikTok Shop App Secret'}
                        value={formData.accessToken}
                        onChange={(e) => handleChange('accessToken', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">
                          {selectedPlatform === 'shopify' ? 'API Key (optional)' : 'App Key *'}
                        </Label>
                        <Input
                          id="apiKey"
                          placeholder={selectedPlatform === 'shopify' ? 'API Key' : 'Your TikTok Shop App Key'}
                          value={formData.apiKey}
                          onChange={(e) => handleChange('apiKey', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apiSecret">
                          {selectedPlatform === 'shopify' ? 'API Secret (optional)' : 'Shop Cipher (optional)'}
                        </Label>
                        <Input
                          id="apiSecret"
                          type="password"
                          placeholder={selectedPlatform === 'shopify' ? 'API Secret' : 'Shop Cipher'}
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
                          value={`https://api.datapulse.io/webhooks/${selectedPlatform}`}
                          className="bg-muted"
                        />
                        <Button variant="outline" size="icon" onClick={handleCopyWebhook}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add this webhook URL in {currentPlatform.name} for real-time updates
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 4 && currentPlatform && (
              <motion.div
                key="step4"
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
                          <div className={`w-5 h-5 rounded bg-gradient-to-br ${currentPlatform.color} flex items-center justify-center`}>
                            <currentPlatform.icon className="w-3 h-3 text-white" />
                          </div>
                          {currentPlatform.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Store Name</span>
                        <span className="font-medium">{formData.storeName}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Store URL / ID</span>
                        <span className="font-medium">{formData.storeUrl}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">API Credentials</span>
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
            
            <div className="flex gap-3">
              {currentStep === 1 && (
                <Button
                  variant="ghost"
                  onClick={handleDemoMode}
                  disabled={isSettingUpDemo}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  {isSettingUpDemo ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    'Skip & Use Demo Data'
                  )}
                </Button>
              )}
              
              {currentStep < 4 ? (
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
        </div>
      </section>
    </DataPulseLayout>
  );
};

export default DataPulseOnboarding;
