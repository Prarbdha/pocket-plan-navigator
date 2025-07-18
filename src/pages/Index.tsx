import { useState } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { SavingsGoal } from "@/components/SavingsGoal";
import { AIFinancialCoach } from "@/components/AIFinancialCoach";
import { FinancialCard } from "@/components/FinancialCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Target, Bot, BarChart3, Menu } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data - in a real app, this would come from a database/API
  const statsData = {
    totalBalance: 85000,
    monthlyIncome: 50000,
    monthlyExpenses: 34000,
    savingsGoalProgress: 45
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-soft border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Money Mentor
              </h1>
            </div>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Take Control of Your Finances
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Track expenses, plan budgets, achieve savings goals, and get AI-powered financial advice
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Tracking
              </Button>
              <Button size="lg" variant="outline">
                <Bot className="h-5 w-5 mr-2" />
                Get AI Advice
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="coach" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Coach</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <DashboardStats stats={statsData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FinancialCard title="Monthly Overview" description="Your financial snapshot">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Net Income</span>
                    <span className="font-bold text-success">
                      ₹{(statsData.monthlyIncome - statsData.monthlyExpenses).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Savings Rate</span>
                    <span className="font-bold text-primary">
                      {((statsData.monthlyIncome - statsData.monthlyExpenses) / statsData.monthlyIncome * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Goal Progress</span>
                    <span className="font-bold text-accent">
                      {statsData.savingsGoalProgress}%
                    </span>
                  </div>
                </div>
              </FinancialCard>

              <FinancialCard title="Quick Actions" description="Common tasks">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2"
                    onClick={() => setActiveTab("tracker")}
                  >
                    <Wallet className="h-5 w-5" />
                    Add Expense
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2"
                    onClick={() => setActiveTab("budget")}
                  >
                    <TrendingUp className="h-5 w-5" />
                    Check Budget
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2"
                    onClick={() => setActiveTab("goals")}
                  >
                    <Target className="h-5 w-5" />
                    Update Goal
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2"
                    onClick={() => setActiveTab("coach")}
                  >
                    <Bot className="h-5 w-5" />
                    Ask AI
                  </Button>
                </div>
              </FinancialCard>
            </div>
          </TabsContent>

          <TabsContent value="tracker">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetPlanner />
          </TabsContent>

          <TabsContent value="goals">
            <SavingsGoal />
          </TabsContent>

          <TabsContent value="coach">
            <AIFinancialCoach />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Money Mentor. Take control of your financial future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
