import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Star, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Achievements = () => {
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [allBadges, setAllBadges] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load user profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    setProfile(profileData);

    // Load all badges
    const { data: badgesData } = await supabase
      .from("badges")
      .select("*");
    setAllBadges(badgesData || []);

    // Load user earned badges
    const { data: userBadgesData } = await supabase
      .from("user_badges")
      .select("*, badge:badges(*)")
      .eq("user_id", user.id);
    setUserBadges(userBadgesData || []);
  };

  const isBadgeEarned = (badgeId: string) => {
    return userBadges.some((ub) => ub.badge_id === badgeId);
  };

  const getNextLevelPoints = (currentLevel: number) => {
    return currentLevel * 1000;
  };

  const currentLevel = profile?.level || 1;
  const currentPoints = profile?.total_points || 0;
  const nextLevelPoints = getNextLevelPoints(currentLevel);
  const levelProgress = (currentPoints / nextLevelPoints) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Achievements & Badges</h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and celebrate milestones
          </p>
        </div>

        {/* Level Progress */}
        <Card className="shadow-glow bg-gradient-primary text-primary-foreground border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl mb-1">Level {currentLevel}</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  {currentPoints} / {nextLevelPoints} XP
                </CardDescription>
              </div>
              <Trophy className="h-16 w-16 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={levelProgress} className="h-3 bg-primary-foreground/20" />
            <p className="text-sm mt-2 text-primary-foreground/90">
              {nextLevelPoints - currentPoints} XP to next level
            </p>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentPoints}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userBadges.length} / {allBadges.length}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentLevel}</div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allBadges.map((badge) => {
              const earned = isBadgeEarned(badge.id);
              const earnedBadge = userBadges.find((ub) => ub.badge_id === badge.id);

              return (
                <Card
                  key={badge.id}
                  className={`shadow-card transition-all ${
                    earned
                      ? "border-secondary shadow-glow hover:-translate-y-1"
                      : "opacity-60 grayscale"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-accent/10 rounded-full">
                        <Award className={`h-10 w-10 ${earned ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      {earned && (
                        <Badge className="bg-secondary">Earned</Badge>
                      )}
                    </div>
                    <CardTitle className="mt-4">{badge.name}</CardTitle>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {earned && earnedBadge ? (
                      <p className="text-sm text-muted-foreground">
                        Earned on {new Date(earnedBadge.earned_at).toLocaleDateString()}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Requirement: {badge.requirement_value} {badge.requirement_type}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {allBadges.length === 0 && (
            <Card className="p-12 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No badges available yet</h3>
              <p className="text-muted-foreground">
                Complete lessons and activities to start earning badges!
              </p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Achievements;
