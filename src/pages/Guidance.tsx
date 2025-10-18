import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Shield, Target, PiggyBank, BookOpen } from "lucide-react";

const Guidance = () => {
  const guidanceTopics = [
    {
      icon: TrendingUp,
      title: "Getting Started with Stocks",
      description: "Understand the basics of stock market investing",
      content: [
        "Research companies before investing",
        "Diversify your portfolio across sectors",
        "Start with blue-chip stocks for stability",
        "Set long-term investment goals",
        "Monitor market trends regularly",
      ],
    },
    {
      icon: PiggyBank,
      title: "SIP Investment Strategy",
      description: "Systematic Investment Plans for consistent growth",
      content: [
        "Start with small monthly amounts",
        "Choose funds based on risk appetite",
        "Continue SIPs during market downturns",
        "Review and rebalance annually",
        "Benefit from rupee cost averaging",
      ],
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Protect your investments effectively",
      content: [
        "Never invest money you can't afford to lose",
        "Maintain an emergency fund",
        "Diversify across asset classes",
        "Set stop-loss limits",
        "Avoid emotional decision-making",
      ],
    },
    {
      icon: Target,
      title: "Setting Financial Goals",
      description: "Plan your investment journey",
      content: [
        "Define short-term and long-term goals",
        "Calculate required monthly investments",
        "Review goals periodically",
        "Adjust strategy based on life changes",
        "Track progress regularly",
      ],
    },
    {
      icon: BookOpen,
      title: "Mutual Funds Basics",
      description: "Understanding mutual fund investments",
      content: [
        "Learn about different fund types",
        "Compare expense ratios",
        "Check historical performance",
        "Understand exit loads and lock-in periods",
        "Review fund manager track record",
      ],
    },
    {
      icon: Lightbulb,
      title: "Investment Tips for Youth",
      description: "Smart investing advice for young investors",
      content: [
        "Start investing early to benefit from compounding",
        "Focus on growth-oriented investments",
        "Maintain a higher equity allocation",
        "Learn from mistakes without major losses",
        "Stay informed about market trends",
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Investment Guidance</h1>
          <p className="text-muted-foreground text-lg">
            Expert tips and best practices for smart investing
          </p>
        </div>

        <Card className="bg-gradient-primary text-primary-foreground shadow-glow border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Lightbulb className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl">Important Disclaimer</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  This guidance is for educational purposes only
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary-foreground/90">
              The investment guidance provided here is based on general best practices and is intended
              for educational purposes only. Always consult with a qualified financial advisor before
              making investment decisions. Past performance does not guarantee future results.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guidanceTopics.map((topic, index) => (
            <Card key={index} className="shadow-card hover:shadow-glow transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <topic.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.content.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>General Investment Principles</CardTitle>
            <CardDescription>Core concepts every investor should know</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Power of Compounding</h3>
              <p className="text-sm text-muted-foreground">
                Start early and let your money grow exponentially over time. Even small regular investments
                can lead to significant wealth through compound interest.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Diversification</h3>
              <p className="text-sm text-muted-foreground">
                Don't put all your eggs in one basket. Spread investments across different asset classes,
                sectors, and securities to minimize risk.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Long-term Perspective</h3>
              <p className="text-sm text-muted-foreground">
                Markets fluctuate in the short term. Focus on long-term goals and avoid making emotional
                decisions based on temporary market movements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Guidance;
