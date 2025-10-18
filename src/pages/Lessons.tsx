import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    loadLessons();
    loadUserProgress();
  }, []);

  const loadLessons = async () => {
    const { data } = await supabase
      .from("lessons")
      .select("*")
      .order("order_index", { ascending: true });
    setLessons(data || []);
  };

  const loadUserProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);
    setUserProgress(data || []);
  };

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.some((p) => p.lesson_id === lessonId && p.completed);
  };

  const categories = ["all", ...new Set(lessons.map((l) => l.category))];
  const filteredLessons =
    selectedCategory === "all"
      ? lessons
      : lessons.filter((l) => l.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-secondary/20 text-secondary";
      case "intermediate":
        return "bg-accent/20 text-accent";
      case "advanced":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Financial Education Lessons</h1>
          <p className="text-muted-foreground text-lg">
            Learn at your own pace with our comprehensive course library
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full md:w-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson) => {
                const completed = isLessonCompleted(lesson.id);
                return (
                  <Card
                    key={lesson.id}
                    className={`shadow-card hover:shadow-glow transition-all hover:-translate-y-1 ${
                      completed ? "border-secondary" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getDifficultyColor(lesson.difficulty)}>
                          {lesson.difficulty}
                        </Badge>
                        {completed && (
                          <CheckCircle2 className="h-5 w-5 text-secondary" />
                        )}
                      </div>
                      <CardTitle className="text-xl">{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {lesson.duration_minutes} minutes
                      </div>
                      <Button
                        className="w-full"
                        variant={completed ? "outline" : "default"}
                        onClick={() => navigate(`/lesson/${lesson.id}`)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {completed ? "Review Lesson" : "Start Lesson"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredLessons.length === 0 && (
              <Card className="p-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
                <p className="text-muted-foreground">
                  Check back soon for new content in this category!
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Lessons;
