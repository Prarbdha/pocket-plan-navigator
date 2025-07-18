
import { MinimalCard } from "./MinimalCard";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

interface StatsData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoalProgress: number;
}

export function DashboardStats({ stats }: { stats: StatsData }) {
  const { totalBalance, monthlyIncome, monthlyExpenses, savingsGoalProgress } = stats;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MinimalCard 
        title="Total Balance" 
        variant="primary"
        className="col-span-1 md:col-span-2 lg:col-span-1"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totalBalance)}
            </p>
            <p className="text-white/80 text-sm">Available now</p>
          </div>
          <Wallet className="h-8 w-8 text-white/80" />
        </div>
      </MinimalCard>

      <MinimalCard title="Monthly Income">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-success">
              {formatCurrency(monthlyIncome)}
            </p>
            <p className="text-muted-foreground text-sm">This month</p>
          </div>
          <TrendingUp className="h-6 w-6 text-success" />
        </div>
      </MinimalCard>

      <MinimalCard title="Monthly Expenses">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(monthlyExpenses)}
            </p>
            <p className="text-muted-foreground text-sm">This month</p>
          </div>
          <TrendingDown className="h-6 w-6 text-destructive" />
        </div>
      </MinimalCard>

      <MinimalCard 
        title="Savings Goal" 
        variant={savingsGoalProgress >= 100 ? "success" : "default"}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-accent">
              {savingsGoalProgress}%
            </p>
            <p className="text-muted-foreground text-sm">Progress</p>
          </div>
          <Target className="h-6 w-6 text-accent" />
        </div>
      </MinimalCard>
    </div>
  );
}
