import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ArrowDownRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { DataPulseLayout } from "@/components/datapulse/DataPulseLayout";

// Sample data
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
  { name: "Shopify", value: 45, color: "#95BF47" },
  { name: "Amazon", value: 30, color: "#FF9900" },
  { name: "WooCommerce", value: 15, color: "#96588A" },
  { name: "BigCommerce", value: 10, color: "#34313F" },
];

const productData = [
  { name: "Premium Headphones", sales: 2340, revenue: 93600 },
  { name: "Wireless Earbuds", sales: 1890, revenue: 56700 },
  { name: "Smart Watch", sales: 1560, revenue: 124800 },
  { name: "Laptop Stand", sales: 1230, revenue: 36900 },
  { name: "USB-C Hub", sales: 980, revenue: 29400 },
];

const customerCohortData = [
  { cohort: "Jan 2024", month1: 100, month2: 45, month3: 32, month4: 28 },
  { cohort: "Feb 2024", month1: 100, month2: 48, month3: 35, month4: 30 },
  { cohort: "Mar 2024", month1: 100, month2: 52, month3: 38, month4: 33 },
  { cohort: "Apr 2024", month1: 100, month2: 50, month3: 36, month4: 31 },
];

const inventoryData = [
  { product: "Premium Headphones", stock: 245, velocity: 12, daysLeft: 20 },
  { product: "Wireless Earbuds", stock: 89, velocity: 15, daysLeft: 6 },
  { product: "Smart Watch", stock: 156, velocity: 8, daysLeft: 19 },
  { product: "Laptop Stand", stock: 34, velocity: 10, daysLeft: 3 },
  { product: "USB-C Hub", stock: 412, velocity: 7, daysLeft: 59 },
];

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
  <Card className="bg-card border-datapulse-purple/20">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-datapulse-purple" />
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

const ExecutiveDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Total Revenue" value="$72,000" change="+7.4%" changeType="positive" icon={DollarSign} />
      <KPICard title="Orders Today" value="47" change="+12%" changeType="positive" icon={ShoppingCart} />
      <KPICard title="Avg Order Value" value="$52.17" change="+3.2%" changeType="positive" icon={TrendingUp} />
      <KPICard title="Conversion Rate" value="3.24%" change="-0.3%" changeType="negative" icon={Percent} />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-card border-datapulse-purple/20">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="revenue" stroke="#9b87f5" fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-datapulse-purple/20">
        <CardHeader>
          <CardTitle>Revenue by Channel</CardTitle>
          <CardDescription>Sales distribution</CardDescription>
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
);

const SalesDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Gross Revenue" value="$72,000" change="+7.4%" changeType="positive" icon={DollarSign} />
      <KPICard title="Net Revenue" value="$68,400" change="+6.8%" changeType="positive" icon={DollarSign} />
      <KPICard title="Refund Rate" value="2.1%" change="-0.4%" changeType="positive" icon={Percent} />
      <KPICard title="Units Sold" value="1,380" change="+5.2%" changeType="positive" icon={Package} />
    </div>
    
    <Card className="bg-card border-datapulse-purple/20">
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
);

const CustomerDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Total Customers" value="8,432" change="+12.3%" changeType="positive" icon={Users} />
      <KPICard title="New Customers" value="847" change="+8.1%" changeType="positive" icon={Users} />
      <KPICard title="Customer LTV" value="$284" change="+4.2%" changeType="positive" icon={DollarSign} />
      <KPICard title="Repeat Rate" value="34.2%" change="+2.1%" changeType="positive" icon={TrendingUp} />
    </div>
    
    <Card className="bg-card border-datapulse-purple/20">
      <CardHeader>
        <CardTitle>Customer Cohort Retention</CardTitle>
        <CardDescription>Retention percentage by signup month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Cohort</th>
                <th className="text-center py-2 px-4">Month 1</th>
                <th className="text-center py-2 px-4">Month 2</th>
                <th className="text-center py-2 px-4">Month 3</th>
                <th className="text-center py-2 px-4">Month 4</th>
              </tr>
            </thead>
            <tbody>
              {customerCohortData.map((row) => (
                <tr key={row.cohort} className="border-b border-border/50">
                  <td className="py-2 px-4 font-medium">{row.cohort}</td>
                  <td className="text-center py-2 px-4">
                    <span className="px-2 py-1 rounded bg-datapulse-purple/30">{row.month1}%</span>
                  </td>
                  <td className="text-center py-2 px-4">
                    <span className="px-2 py-1 rounded bg-datapulse-purple/20">{row.month2}%</span>
                  </td>
                  <td className="text-center py-2 px-4">
                    <span className="px-2 py-1 rounded bg-datapulse-purple/15">{row.month3}%</span>
                  </td>
                  <td className="text-center py-2 px-4">
                    <span className="px-2 py-1 rounded bg-datapulse-purple/10">{row.month4}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProductDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Active Products" value="342" change="+15" changeType="positive" icon={Package} />
      <KPICard title="Inventory Value" value="$284,500" change="+8.2%" changeType="positive" icon={DollarSign} />
      <KPICard title="Stock Turnover" value="4.2x" change="+0.3" changeType="positive" icon={TrendingUp} />
      <KPICard title="Low Stock Items" value="12" change="+3" changeType="negative" icon={Package} />
    </div>
    
    <Card className="bg-card border-datapulse-purple/20">
      <CardHeader>
        <CardTitle>Inventory Health</CardTitle>
        <CardDescription>Stock levels and velocity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Product</th>
                <th className="text-center py-2 px-4">Stock</th>
                <th className="text-center py-2 px-4">Daily Velocity</th>
                <th className="text-center py-2 px-4">Days Left</th>
                <th className="text-center py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((row) => (
                <tr key={row.product} className="border-b border-border/50">
                  <td className="py-2 px-4 font-medium">{row.product}</td>
                  <td className="text-center py-2 px-4">{row.stock}</td>
                  <td className="text-center py-2 px-4">{row.velocity}/day</td>
                  <td className="text-center py-2 px-4">{row.daysLeft}</td>
                  <td className="text-center py-2 px-4">
                    <Badge 
                      variant={row.daysLeft < 7 ? "destructive" : row.daysLeft < 14 ? "secondary" : "default"}
                      className={row.daysLeft >= 14 ? "bg-datapulse-green/20 text-datapulse-green" : ""}
                    >
                      {row.daysLeft < 7 ? "Critical" : row.daysLeft < 14 ? "Low" : "Healthy"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const OperationalDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Orders Pending" value="23" change="-5" changeType="positive" icon={ShoppingCart} />
      <KPICard title="Fulfillment Rate" value="97.8%" change="+1.2%" changeType="positive" icon={Truck} />
      <KPICard title="Avg Fulfillment Time" value="1.4 days" change="-0.2" changeType="positive" icon={TrendingUp} />
      <KPICard title="Return Rate" value="4.2%" change="-0.5%" changeType="positive" icon={Package} />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-datapulse-purple/20">
        <CardHeader>
          <CardTitle>Orders by Status</CardTitle>
          <CardDescription>Current order pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: "Processing", count: 23, color: "bg-datapulse-orange" },
              { status: "Shipped", count: 47, color: "bg-datapulse-blue" },
              { status: "Delivered", count: 1284, color: "bg-datapulse-green" },
              { status: "Returned", count: 26, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.status} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm">{item.status}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-datapulse-purple/20">
        <CardHeader>
          <CardTitle>Return Reasons</CardTitle>
          <CardDescription>Top reasons for returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { reason: "Wrong Size", percentage: 35 },
              { reason: "Defective", percentage: 25 },
              { reason: "Not as Described", percentage: 20 },
              { reason: "Changed Mind", percentage: 15 },
              { reason: "Other", percentage: 5 },
            ].map((item) => (
              <div key={item.reason} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.reason}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-datapulse-purple rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const DataPulseDemo = () => {
  const [activeTab, setActiveTab] = useState("executive");
  
  return (
    <DataPulseLayout>
      <div className="min-h-screen bg-background">
        <div className="border-b border-dp-purple/20 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Interactive demo with sample e-commerce data</p>
              </div>
              <Badge variant="outline" className="border-dp-purple text-dp-purple">
                Sample Data
              </Badge>
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
              <ExecutiveDashboard />
            </TabsContent>
            <TabsContent value="sales">
              <SalesDashboard />
            </TabsContent>
            <TabsContent value="customers">
              <CustomerDashboard />
            </TabsContent>
            <TabsContent value="products">
              <ProductDashboard />
            </TabsContent>
            <TabsContent value="operations">
              <OperationalDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DataPulseLayout>
  );
};

export default DataPulseDemo;
