import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  Truck,
  DollarSign,
  ShoppingCart,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  LogOut,
  Store,
  RefreshCw
} from "lucide-react";
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { DataPulseLayout } from "@/components/datapulse/DataPulseLayout";
import { useDataPulseAuth } from "@/contexts/DataPulseAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Sample data - in production this would come from the connected store
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 890 },
  { month: "Feb", revenue: 52000, orders: 1020 },
  { month: "Mar", revenue: 48000, orders: 940 },
  { month: "Apr", revenue: 61000, orders: 1180 },
  { month: "May", revenue: 55000, orders: 1050 },
  { month: "Jun", revenue: 67000, orders: 1290 },
  { month: "Jul", revenue: 72000, orders: 1380 },
];

const channelData = [
  { name: "Online Store", value: 65, color: "#9b87f5" },
  { name: "POS", value: 20, color: "#D946EF" },
  { name: "Buy Button", value: 10, color: "#F97316" },
  { name: "Draft Orders", value: 5, color: "#22C55E" },
];

const productData = [
  { name: "Premium Headphones", sales: 2340, revenue: 93600 },
  { name: "Wireless Earbuds", sales: 1890, revenue: 56700 },
  { name: "Smart Watch", sales: 1560, revenue: 124800 },
  { name: "Laptop Stand", sales: 1230, revenue: 36900 },
  { name: "USB-C Hub", sales: 980, revenue: 29400 },
];

interface Store {
  id: string;
  store_name: string;
  store_url: string;
  platform: string;
  is_connected: boolean;
  last_synced_at: string | null;
}

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: "positive" | "negative"; 
  icon: React.ElementType;
}) => (
  <Card className="bg-card border-dp-purple/20">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-dp-purple" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`flex items-center text-xs ${changeType === "positive" ? "text-datapulse-green" : "text-red-500"}`}>
        {changeType === "positive" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change} from last month
      </div>
    </CardContent>
  </Card>
);

const DataPulseDashboard = () => {
  const { user, signOut, isLoading: authLoading } = useDataPulseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("executive");
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoadingStores, setIsLoadingStores] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/datapulse/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchStores = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('datapulse_stores')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        setStores(data || []);
      } catch (error: any) {
        console.error('Error fetching stores:', error);
      } finally {
        setIsLoadingStores(false);
      }
    };

    if (user) {
      fetchStores();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/datapulse/login');
  };

  const handleAddStore = () => {
    navigate('/datapulse/onboarding');
  };

  if (authLoading) {
    return (
      <DataPulseLayout>
        <div className="min-h-screen flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-dp-purple" />
        </div>
      </DataPulseLayout>
    );
  }

  if (!user) {
    return null;
  }

  // If no stores connected, show onboarding prompt
  if (!isLoadingStores && stores.length === 0) {
    return (
      <DataPulseLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Card className="max-w-md text-center border-dp-purple/20">
            <CardHeader>
              <div className="mx-auto p-4 rounded-full mb-4" style={{ background: 'var(--dp-gradient)' }}>
                <Store className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Connect Your First Store</CardTitle>
              <CardDescription>
                Get started by connecting your Shopify store to see your analytics dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleAddStore}
                className="w-full gap-2 text-white"
                style={{ background: 'var(--dp-gradient)' }}
              >
                <Plus className="w-4 h-4" />
                Connect Shopify Store
              </Button>
            </CardContent>
          </Card>
        </div>
      </DataPulseLayout>
    );
  }

  return (
    <DataPulseLayout>
      <div className="min-h-screen bg-background">
        {/* Dashboard Header */}
        <div className="border-b border-dp-purple/20 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
                  Analytics Dashboard
                </h1>
                {stores.length > 0 && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-datapulse-green" />
                    Connected to {stores[0].store_name}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleAddStore} className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Store</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted/50">
              <TabsTrigger value="executive" className="gap-2 data-[state=active]:bg-dp-purple data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Executive</span>
              </TabsTrigger>
              <TabsTrigger value="sales" className="gap-2 data-[state=active]:bg-dp-purple data-[state=active]:text-white">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Sales</span>
              </TabsTrigger>
              <TabsTrigger value="customers" className="gap-2 data-[state=active]:bg-dp-purple data-[state=active]:text-white">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Customers</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-2 data-[state=active]:bg-dp-purple data-[state=active]:text-white">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="operations" className="gap-2 data-[state=active]:bg-dp-purple data-[state=active]:text-white">
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Operations</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="executive">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard title="Total Revenue" value="$72,000" change="+7.4%" changeType="positive" icon={DollarSign} />
                  <KPICard title="Orders Today" value="47" change="+12%" changeType="positive" icon={ShoppingCart} />
                  <KPICard title="Avg Order Value" value="$52.17" change="+3.2%" changeType="positive" icon={TrendingUp} />
                  <KPICard title="Conversion Rate" value="3.24%" change="-0.3%" changeType="negative" icon={Percent} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 bg-card border-dp-purple/20">
                    <CardHeader>
                      <CardTitle>Revenue Trend</CardTitle>
                      <CardDescription>Monthly revenue over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient id="colorRevenueDash" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="month" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #9b87f5" }}
                            labelStyle={{ color: "#fff" }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#9b87f5" fill="url(#colorRevenueDash)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-dp-purple/20">
                    <CardHeader>
                      <CardTitle>Sales Channels</CardTitle>
                      <CardDescription>Revenue distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={channelData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {channelData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #9b87f5" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {channelData.map((channel) => (
                          <div key={channel.name} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                            <span className="text-xs text-muted-foreground">{channel.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sales">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard title="Gross Revenue" value="$72,000" change="+7.4%" changeType="positive" icon={DollarSign} />
                  <KPICard title="Net Revenue" value="$68,400" change="+6.8%" changeType="positive" icon={DollarSign} />
                  <KPICard title="Refund Rate" value="2.1%" change="-0.4%" changeType="positive" icon={Percent} />
                  <KPICard title="Units Sold" value="1,380" change="+5.2%" changeType="positive" icon={Package} />
                </div>
                
                <Card className="bg-card border-dp-purple/20">
                  <CardHeader>
                    <CardTitle>Top Products by Revenue</CardTitle>
                    <CardDescription>Best performing products this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={productData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis type="number" stroke="#888" />
                        <YAxis dataKey="name" type="category" stroke="#888" width={120} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #9b87f5" }}
                        />
                        <Bar dataKey="revenue" fill="#9b87f5" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="customers">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard title="Total Customers" value="8,432" change="+12.3%" changeType="positive" icon={Users} />
                  <KPICard title="New Customers" value="847" change="+8.1%" changeType="positive" icon={Users} />
                  <KPICard title="Customer LTV" value="$284" change="+4.2%" changeType="positive" icon={DollarSign} />
                  <KPICard title="Repeat Rate" value="34.2%" change="+2.1%" changeType="positive" icon={TrendingUp} />
                </div>
                
                <Card className="bg-card border-dp-purple/20">
                  <CardHeader>
                    <CardTitle>Customer Overview</CardTitle>
                    <CardDescription>Customer acquisition and retention metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Customer cohort analysis will appear here once your store data syncs</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="products">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard title="Active Products" value="342" change="+15" changeType="positive" icon={Package} />
                  <KPICard title="Inventory Value" value="$284,500" change="+8.2%" changeType="positive" icon={DollarSign} />
                  <KPICard title="Stock Turnover" value="4.2x" change="+0.3" changeType="positive" icon={TrendingUp} />
                  <KPICard title="Low Stock Items" value="12" change="+3" changeType="negative" icon={Package} />
                </div>
                
                <Card className="bg-card border-dp-purple/20">
                  <CardHeader>
                    <CardTitle>Inventory Health</CardTitle>
                    <CardDescription>Stock levels and product performance</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Product inventory data will appear here once your store data syncs</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="operations">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard title="Orders Pending" value="23" change="-5" changeType="positive" icon={ShoppingCart} />
                  <KPICard title="Fulfillment Rate" value="97.8%" change="+1.2%" changeType="positive" icon={Truck} />
                  <KPICard title="Avg Fulfillment Time" value="1.4 days" change="-0.2" changeType="positive" icon={TrendingUp} />
                  <KPICard title="Return Rate" value="4.2%" change="-0.5%" changeType="positive" icon={Package} />
                </div>
                
                <Card className="bg-card border-dp-purple/20">
                  <CardHeader>
                    <CardTitle>Operations Overview</CardTitle>
                    <CardDescription>Order fulfillment and logistics metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12 text-muted-foreground">
                    <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Operations data will appear here once your store data syncs</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DataPulseLayout>
  );
};

export default DataPulseDashboard;
