
import { useState } from "react";
import { SimpleDashboard } from "@/components/SimpleDashboard";
import { SimpleExpenseEntry } from "@/components/SimpleExpenseEntry";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { SavingsGoal } from "@/components/SavingsGoal";
import { AIFinancialCoach } from "@/components/AIFinancialCoach";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wallet, BarChart3, Target, Bot, Plus, Menu } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Simplified data structure
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 85000,
    monthlyIncome: 50000,
    monthlyExpenses: 34000,
    savingsGoal: {
      name: "Emergency Fund",
      current: 45000,
      target: 100000,
      deadline: "2024-12-31"
    }
  });

  const handleTransactionAdded = (transaction: any) => {
    console.log("Transaction added:", transaction);
    // Update dashboard data based on transaction
    if (transaction.type === 'income') {
      setDashboardData(prev => ({
        ...prev,
        totalBalance: prev.totalBalance + transaction.amount,
        monthlyIncome: prev.monthlyIncome + transaction.amount
      }));
    } else {
      setDashboardData(prev => ({
        ...prev,
        totalBalance: prev.totalBalance - transaction.amount,
        monthlyExpenses: prev.monthlyExpenses + transaction.amount
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-xs">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                Money Mentor
              </h1>
            </div>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Simplified Hero Section */}
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Smart Financial Management
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Track expenses, manage budgets, and achieve your savings goals with intelligent insights
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Simplified Tab Navigation */}
          <TabsList className="grid w-full grid-cols-5 max-w-lg mx-auto h-12">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="coach" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Coach</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8 animate-fade-in">
            <SimpleDashboard 
              data={dashboardData}
              onAddTransaction={() => setActiveTab("add")}
              onViewGoal={() => setActiveTab("goals")}
            />
          </TabsContent>

          {/* Add Transaction Tab */}
          <TabsContent value="add" className="animate-fade-in">
            <SimpleExpenseEntry onTransactionAdded={handleTransactionAdded} />
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="animate-fade-in">
            <BudgetPlanner />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="animate-fade-in">
            <SavingsGoal />
          </TabsContent>

          {/* AI Coach Tab */}
          <TabsContent value="coach" className="animate-fade-in">
            <AIFinancialCoach />
          </TabsContent>
        </Tabs>
      </main>

      {/* Clean Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Money Mentor. Simple, smart financial management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
