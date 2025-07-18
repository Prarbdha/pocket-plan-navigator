import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Edit, Save } from "lucide-react";

interface BudgetCategory {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
}

export function BudgetPlanner() {
  const [budgets, setBudgets] = useState<BudgetCategory[]>([
    { id: '1', category: 'Food & Dining', budgeted: 8000, spent: 5200, remaining: 2800 },
    { id: '2', category: 'Transportation', budgeted: 5000, spent: 6200, remaining: -1200 },
    { id: '3', category: 'Entertainment', budgeted: 3000, spent: 1800, remaining: 1200 },
    { id: '4', category: 'Utilities', budgeted: 4000, spent: 3800, remaining: 200 },
    { id: '5', category: 'Shopping', budgeted: 6000, spent: 4500, remaining: 1500 }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 80) return "bg-warning";
    return "bg-success";
  };

  const getBadgeVariant = (remaining: number) => {
    if (remaining < 0) return "destructive";
    if (remaining < 500) return "secondary";
    return "default";
  };

  const handleEdit = (id: string, currentValue: number) => {
    setEditingId(id);
    setEditValue(currentValue.toString());
  };

  const handleSave = (id: string) => {
    const newBudgeted = parseFloat(editValue);
    setBudgets(budgets.map(budget => 
      budget.id === id 
        ? { ...budget, budgeted: newBudgeted, remaining: newBudgeted - budget.spent }
        : budget
    ));
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="space-y-6">
      <FinancialCard title="Budget Overview" variant="gradient">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          <div className="text-center">
            <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
            <p className="text-white/80">Total Budget</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            <p className="text-white/80">Total Spent</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-white' : 'text-red-300'}`}>
              {formatCurrency(totalRemaining)}
            </p>
            <p className="text-white/80">Remaining</p>
          </div>
        </div>
      </FinancialCard>

      <FinancialCard title="Category Budgets" description="Track spending by category">
        <div className="space-y-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="space-y-3 p-4 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{budget.category}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={getBadgeVariant(budget.remaining)}>
                    {budget.remaining >= 0 ? 'On Track' : 'Over Budget'}
                  </Badge>
                  {budget.remaining < 0 && <AlertTriangle className="h-4 w-4 text-destructive" />}
                  {budget.remaining >= 0 && <CheckCircle className="h-4 w-4 text-success" />}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <div className="flex items-center gap-2">
                    {editingId === budget.id ? (
                      <div className="flex gap-1">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-6 text-xs"
                          type="number"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleSave(budget.id)}
                          className="h-6 px-2"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{formatCurrency(budget.budgeted)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(budget.id, budget.budgeted)}
                          className="h-4 w-4 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Spent</p>
                  <p className="font-medium">{formatCurrency(budget.spent)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining</p>
                  <p className={`font-medium ${budget.remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(budget.remaining)}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{((budget.spent / budget.budgeted) * 100).toFixed(0)}% used</span>
                  <span>{formatCurrency(budget.budgeted - budget.spent)} left</span>
                </div>
                <Progress 
                  value={(budget.spent / budget.budgeted) * 100} 
                  className="h-2"
                  style={{
                    background: `linear-gradient(to right, ${getProgressColor(budget.spent, budget.budgeted)} 0%, ${getProgressColor(budget.spent, budget.budgeted)} 100%)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </FinancialCard>
    </div>
  );
}