
import { MinimalCard } from "./MinimalCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wallet, Plus, Target, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoal: {
    name: string;
    current: number;
    target: number;
    deadline: string;
  };
}

export function SimpleDashboard({ 
  data, 
  onAddTransaction, 
  onViewGoal 
}: { 
  data: DashboardData;
  onAddTransaction: () => void;
  onViewGoal: () => void;
}) {
  const netBalance = data.totalBalance;
  const goalProgress = (data.savingsGoal.current / data.savingsGoal.target) * 100;
  const remainingAmount = data.savingsGoal.target - data.savingsGoal.current;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Net Balance - Prominent Display */}
      <MinimalCard 
        title="Net Balance" 
        variant="primary"
        className="text-center"
      >
        <div className="py-6">
          <div className="flex items-center justify-center mb-2">
            <Wallet className="h-8 w-8 text-white/80 mr-3" />
            <span className="text-5xl font-bold text-white">
              {formatCurrency(netBalance)}
            </span>
          </div>
          <p className="text-white/80 text-lg">Your current balance</p>
        </div>
      </MinimalCard>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MinimalCard title="This Month">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Income</span>
              </div>
              <span className="font-semibold text-success">
                {formatCurrency(data.monthlyIncome)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                <span className="text-muted-foreground">Expenses</span>
              </div>
              <span className="font-semibold text-destructive">
                {formatCurrency(data.monthlyExpenses)}
              </span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="font-medium">Net</span>
                <span className={cn(
                  "font-bold",
                  (data.monthlyIncome - data.monthlyExpenses) >= 0 ? "text-success" : "text-destructive"
                )}>
                  {formatCurrency(data.monthlyIncome - data.monthlyExpenses)}
                </span>
              </div>
            </div>
          </div>
        </MinimalCard>

        {/* Savings Goal Progress */}
        <MinimalCard 
          title={data.savingsGoal.name}
          description={`Target: ${formatCurrency(data.savingsGoal.target)}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-accent">
                {Math.round(goalProgress)}%
              </span>
              <Target className="h-6 w-6 text-accent" />
            </div>
            
            <Progress value={goalProgress} className="h-3" />
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current</span>
              <span className="font-medium">
                {formatCurrency(data.savingsGoal.current)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium text-accent">
                {formatCurrency(remainingAmount)}
              </span>
            </div>
          </div>
        </MinimalCard>
      </div>

      {/* Quick Actions */}
      <MinimalCard title="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={onAddTransaction}
            size="lg"
            className="h-16 flex-col gap-2"
          >
            <Plus className="h-6 w-6" />
            Add Transaction
          </Button>
          <Button 
            onClick={onViewGoal}
            variant="outline"
            size="lg"
            className="h-16 flex-col gap-2"
          >
            <Target className="h-6 w-6" />
            View Savings Goal
          </Button>
        </div>
      </MinimalCard>
    </div>
  );
}
