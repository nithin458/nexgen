import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(199, 89%, 48%)", "hsl(142, 71%, 45%)", "hsl(27, 96%, 61%)", "hsl(0, 84%, 60%)"];

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("investment_portfolios")
      .select("*")
      .eq("user_id", user.id);

    if (data) {
      setPortfolios(data);
      const total = data.reduce((sum, p) => sum + Number(p.current_value), 0);
      const invested = data.reduce((sum, p) => sum + Number(p.amount), 0);
      setTotalValue(total);
      setTotalReturn(invested > 0 ? ((total - invested) / invested) * 100 : 0);
    }
  };

  // Sample chart data
  const performanceData = [
    { month: "Jan", value: 10000 },
    { month: "Feb", value: 12000 },
    { month: "Mar", value: 11500 },
    { month: "Apr", value: 14000 },
    { month: "May", value: 15500 },
    { month: "Jun", value: totalValue || 16000 },
  ];

  const pieData = portfolios.map((p) => ({
    name: p.name,
    value: Number(p.current_value),
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Investment Portfolio</h1>
            <p className="text-muted-foreground text-lg">
              Track your virtual investments and performance
            </p>
          </div>
          <Button className="shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Investment
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader>
              <CardDescription>Total Portfolio Value</CardDescription>
              <CardTitle className="text-3xl">₹{totalValue.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                {totalReturn >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-secondary mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                )}
                <span className={totalReturn >= 0 ? "text-secondary" : "text-destructive"}>
                  {totalReturn.toFixed(2)}% overall
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardDescription>Active Investments</CardDescription>
              <CardTitle className="text-3xl">{portfolios.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Across different asset types</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardDescription>Best Performer</CardDescription>
              <CardTitle className="text-3xl">
                {portfolios.length > 0 ? 
                  `${Math.max(...portfolios.map(p => Number(p.return_percentage || 0))).toFixed(1)}%` : 
                  "0%"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Top returning investment</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Value over time (last 6 months)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(199, 89%, 48%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Distribution by investment type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData.length > 0 ? pieData : [{ name: "No data", value: 1 }]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Investment List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolios.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{investment.name}</h3>
                      <Badge variant="outline">{investment.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Purchased: {new Date(investment.purchase_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{Number(investment.current_value).toFixed(2)}</div>
                    <div className={`text-sm flex items-center justify-end ${
                      Number(investment.return_percentage) >= 0 ? "text-secondary" : "text-destructive"
                    }`}>
                      {Number(investment.return_percentage) >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Number(investment.return_percentage || 0).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}

              {portfolios.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No investments yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your portfolio with virtual investments
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Investment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
