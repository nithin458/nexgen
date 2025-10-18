import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BookOpen, Award, Target, BarChart3, PiggyBank } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Learn about stocks, mutual funds, SIPs, and personal finance through engaging content",
    },
    {
      icon: BarChart3,
      title: "Investment Tracking",
      description: "Simulate and track virtual portfolios with real-world investment scenarios",
    },
    {
      icon: Award,
      title: "Gamified Learning",
      description: "Earn badges and points as you complete lessons and quizzes",
    },
    {
      icon: Target,
      title: "Expert Guidance",
      description: "Access curated investment guidance and best practices",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FinLearn
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Master Finance,
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {" "}Build Your Future
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Interactive financial education platform designed for youth. Learn about investments,
                track virtual portfolios, and earn rewards while building real-world financial skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto shadow-glow">
                    Start Learning Free
                    <TrendingUp className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/lessons">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Lessons
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl"></div>
              <img
                src={heroImage}
                alt="Financial Education Platform"
                className="relative rounded-2xl shadow-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Learn Finance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform to build financial literacy through hands-on learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all hover:shadow-card hover:-translate-y-1 duration-300"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-primary-foreground border-0 shadow-glow">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of young learners building a stronger financial future
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Create Free Account
                  <Award className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 FinLearn. Empowering youth through financial education.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
