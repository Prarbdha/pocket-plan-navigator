import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, Calendar, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

const categories = [
  "Food & Dining", "Transportation", "Entertainment", "Utilities", 
  "Healthcare", "Shopping", "Education", "Rent", "Salary", "Freelance"
];

export function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'expense', amount: 500, category: 'Food & Dining', description: 'Lunch at restaurant', date: '2024-01-15' },
    { id: '2', type: 'income', amount: 50000, category: 'Salary', description: 'Monthly salary', date: '2024-01-01' },
    { id: '3', type: 'expense', amount: 1200, category: 'Transportation', description: 'Uber rides', date: '2024-01-14' }
  ]);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  
  const { toast } = useToast();

  const handleAddTransaction = () => {
    if (!amount || !category || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setCategory("");
    setDescription("");
    
    toast({
      title: "Success",
      description: `${type === 'income' ? 'Income' : 'Expense'} added successfully`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <FinancialCard title="Add Transaction" description="Track your income and expenses">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={type === "expense" ? "destructive" : "outline"}
              onClick={() => setType("expense")}
              className="flex-1"
            >
              <Minus className="h-4 w-4 mr-2" />
              Expense
            </Button>
            <Button
              variant={type === "income" ? "default" : "outline"}
              onClick={() => setType("income")}
              className="flex-1 bg-success hover:bg-success/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Income
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleAddTransaction} className="w-full">
            Add Transaction
          </Button>
        </div>
      </FinancialCard>

      <FinancialCard title="Recent Transactions" description="Your latest financial activity">
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                }`}>
                  {transaction.type === 'income' ? 
                    <Plus className="h-4 w-4 text-success" /> : 
                    <Minus className="h-4 w-4 text-destructive" />
                  }
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    <span>{transaction.category}</span>
                    <Calendar className="h-3 w-3 ml-2" />
                    <span>{transaction.date}</span>
                  </div>
                </div>
              </div>
              <div className={`font-bold ${
                transaction.type === 'income' ? 'text-success' : 'text-destructive'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </FinancialCard>
    </div>
  );
}