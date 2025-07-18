import { FinancialCard } from "./FinancialCard";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

interface StatsData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoalProgress: number;
}

export function DashboardStats({ stats }: { stats: StatsData }) {
  const { totalBalance, monthlyIncome, monthlyExpenses, savingsGoalProgress } = stats;
  const netIncome = monthlyIncome - monthlyExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FinancialCard 
        title="Total Balance" 
        variant="gradient"
        className="col-span-1 md:col-span-2 lg:col-span-1"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalBalance)}
            </p>
            <p className="text-white/80 text-sm">Current balance</p>
          </div>
          <Wallet className="h-8 w-8 text-white/80" />
        </div>
      </FinancialCard>

      <FinancialCard title="Monthly Income">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-success">
              {formatCurrency(monthlyIncome)}
            </p>
            <p className="text-muted-foreground text-sm">This month</p>
          </div>
          <TrendingUp className="h-8 w-8 text-success" />
        </div>
      </FinancialCard>

      <FinancialCard title="Monthly Expenses">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(monthlyExpenses)}
            </p>
            <p className="text-muted-foreground text-sm">This month</p>
          </div>
          <TrendingDown className="h-8 w-8 text-destructive" />
        </div>
      </FinancialCard>

      <FinancialCard 
        title="Savings Goal" 
        variant={savingsGoalProgress >= 100 ? "success" : "default"}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={cn(
              "text-2xl font-bold",
              savingsGoalProgress >= 100 ? "text-white" : "text-accent"
            )}>
              {savingsGoalProgress}%
            </p>
            <p className={cn(
              "text-sm",
              savingsGoalProgress >= 100 ? "text-white/80" : "text-muted-foreground"
            )}>
              Progress
            </p>
          </div>
          <Target className={cn(
            "h-8 w-8",
            savingsGoalProgress >= 100 ? "text-white/80" : "text-accent"
          )} />
        </div>
      </FinancialCard>
    </div>
  );
}

// Add missing import
import { cn } from "@/lib/utils";