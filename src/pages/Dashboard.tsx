import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, TrendingUp, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    totalLessons: 0,
    portfolioValue: 0,
    badges: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    setProfile(profileData);

    // Load user progress
    const { data: progressData } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);

    // Load total lessons
    const { data: lessonsData } = await supabase
      .from("lessons")
      .select("id");

    // Load portfolio
    const { data: portfolioData } = await supabase
      .from("investment_portfolios")
      .select("current_value")
      .eq("user_id", user.id);

    // Load badges
    const { data: badgesData } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", user.id);

    setStats({
      lessonsCompleted: progressData?.filter(p => p.completed).length || 0,
      totalLessons: lessonsData?.length || 0,
      portfolioValue: portfolioData?.reduce((sum, p) => sum + Number(p.current_value), 0) || 0,
      badges: badgesData?.length || 0,
    });
  };

  const completionPercentage = stats.totalLessons > 0
    ? (stats.lessonsCompleted / stats.totalLessons) * 100
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {profile?.full_name || "Learner"}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Continue your financial education journey
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-sm text-muted-foreground">Your Level</div>
            <div className="text-3xl font-bold text-primary">{profile?.level || 1}</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.lessonsCompleted}/{stats.totalLessons}
              </div>
              <Progress value={completionPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.portfolioValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Virtual simulation</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.badges}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep learning!</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.total_points || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">XP gained</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <a href="/lessons" className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Continue Learning</h3>
              <p className="text-sm text-muted-foreground">Pick up where you left off</p>
            </a>
            <a href="/portfolio" className="p-4 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors border">
              <TrendingUp className="h-8 w-8 text-secondary mb-2" />
              <h3 className="font-semibold mb-1">View Portfolio</h3>
              <p className="text-sm text-muted-foreground">Track your investments</p>
            </a>
            <a href="/guidance" className="p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors border">
              <Target className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold mb-1">Get Guidance</h3>
              <p className="text-sm text-muted-foreground">Expert investment tips</p>
            </a>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
