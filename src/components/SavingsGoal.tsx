import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Target, Calendar as CalendarIcon, TrendingUp, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SavingsGoalData {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  monthlyTarget: number;
}

export function SavingsGoal() {
  const [goal, setGoal] = useState<SavingsGoalData>({
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 100000,
    currentAmount: 45000,
    targetDate: new Date('2024-12-31'),
    monthlyTarget: 8000
  });

  const [contributionAmount, setContributionAmount] = useState("");
  const [showContribution, setShowContribution] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");
  const [newGoalDate, setNewGoalDate] = useState<Date>();

  const { toast } = useToast();

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsRemaining = Math.ceil((goal.targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
  const recommendedMonthly = monthsRemaining > 0 ? Math.ceil(remaining / monthsRemaining) : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleContribution = () => {
    if (!contributionAmount) return;
    
    const contribution = parseFloat(contributionAmount);
    setGoal({
      ...goal,
      currentAmount: goal.currentAmount + contribution
    });
    
    setContributionAmount("");
    setShowContribution(false);
    
    toast({
      title: "Contribution Added!",
      description: `₹${contribution.toLocaleString()} added to your ${goal.name}`,
    });
  };

  const handleNewGoal = () => {
    if (!newGoalName || !newGoalAmount || !newGoalDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const monthsToGoal = Math.ceil((newGoalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthlyTarget = Math.ceil(parseFloat(newGoalAmount) / monthsToGoal);

    setGoal({
      id: Date.now().toString(),
      name: newGoalName,
      targetAmount: parseFloat(newGoalAmount),
      currentAmount: 0,
      targetDate: newGoalDate,
      monthlyTarget
    });

    setNewGoalName("");
    setNewGoalAmount("");
    setNewGoalDate(undefined);
    setShowNewGoal(false);

    toast({
      title: "New Goal Created!",
      description: `Your ${newGoalName} goal has been set up successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <FinancialCard 
        title={goal.name} 
        description={`Target: ${formatCurrency(goal.targetAmount)}`}
        variant={progress >= 100 ? "success" : "default"}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className={cn(
                "h-8 w-8",
                progress >= 100 ? "text-white" : "text-primary"
              )} />
              <div>
                <p className={cn(
                  "text-2xl font-bold",
                  progress >= 100 ? "text-white" : "text-foreground"
                )}>
                  {formatCurrency(goal.currentAmount)}
                </p>
                <p className={cn(
                  "text-sm",
                  progress >= 100 ? "text-white/80" : "text-muted-foreground"
                )}>
                  of {formatCurrency(goal.targetAmount)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-3xl font-bold",
                progress >= 100 ? "text-white" : "text-primary"
              )}>
                {progress.toFixed(0)}%
              </p>
              <p className={cn(
                "text-sm",
                progress >= 100 ? "text-white/80" : "text-muted-foreground"
              )}>
                Complete
              </p>
            </div>
          </div>

          <Progress value={progress} className="h-3" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-lg font-bold text-destructive">
                {formatCurrency(remaining)}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">Months Left</p>
              <p className="text-lg font-bold text-info">
                {monthsRemaining} months
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">Monthly Need</p>
              <p className="text-lg font-bold text-warning">
                {formatCurrency(recommendedMonthly)}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setShowContribution(!showContribution)}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contribution
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowNewGoal(!showNewGoal)}
              className="flex-1"
            >
              <Target className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>

          {showContribution && (
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <Input
                placeholder="Contribution amount (₹)"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                type="number"
              />
              <div className="flex gap-2">
                <Button onClick={handleContribution} className="flex-1">
                  Add Contribution
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowContribution(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {showNewGoal && (
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <Input
                placeholder="Goal name (e.g., Vacation Fund)"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
              />
              <Input
                placeholder="Target amount (₹)"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
                type="number"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newGoalDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newGoalDate ? format(newGoalDate, "PPP") : "Pick target date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newGoalDate}
                    onSelect={setNewGoalDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <div className="flex gap-2">
                <Button onClick={handleNewGoal} className="flex-1">
                  Create Goal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewGoal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </FinancialCard>

      {progress >= 100 && (
        <FinancialCard title="Congratulations!" variant="success">
          <div className="text-center text-white">
            <TrendingUp className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">You've achieved your {goal.name} goal!</p>
            <p className="text-white/80">Time to set a new financial milestone.</p>
          </div>
        </FinancialCard>
      )}
    </div>
  );
}