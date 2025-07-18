
import { useState } from "react";
import { MinimalCard } from "./MinimalCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Minus, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: Date;
}

const categories = [
  "Food & Dining", "Transportation", "Shopping", "Entertainment", 
  "Utilities", "Healthcare", "Rent", "Salary", "Freelance", "Other"
];

export function SimpleExpenseEntry({ 
  onTransactionAdded 
}: { 
  onTransactionAdded: (transaction: Transaction) => void;
}) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!amount || !category || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const transaction: Transaction = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date
    };

    try {
      onTransactionAdded(transaction);
      
      // Reset form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(new Date());
      
      toast({
        title: "Transaction Added",
        description: `${type === 'income' ? 'Income' : 'Expense'} of ₹${parseFloat(amount).toLocaleString()} recorded successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <MinimalCard title="Add Transaction" description="Record your income or expense">
        <div className="space-y-6">
          {/* Transaction Type Toggle */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={type === "expense" ? "destructive" : "outline"}
                onClick={() => setType("expense")}
                className="h-12"
              >
                <Minus className="h-4 w-4 mr-2" />
                Expense
              </Button>
              <Button
                type="button"
                variant={type === "income" ? "default" : "outline"}
                onClick={() => setType("income")}
                className={cn(
                  "h-12",
                  type === "income" && "bg-success hover:bg-success/90"
                )}
              >
                <Plus className="h-4 w-4 mr-2" />
                Income
              </Button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a category" />
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Input
              id="description"
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !amount || !category || !description}
            className="w-full h-12"
          >
            {isSubmitting ? (
              "Adding..."
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Add Transaction
              </>
            )}
          </Button>
        </div>
      </MinimalCard>
    </div>
  );
}
