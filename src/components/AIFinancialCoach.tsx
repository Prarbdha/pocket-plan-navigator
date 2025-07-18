import { useState } from "react";
import { FinancialCard } from "./FinancialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, Lightbulb, TrendingUp, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: "saving" | "spending" | "budget";
  priority: "high" | "medium" | "low";
}

export function AIFinancialCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Financial Coach. I can help you optimize your spending, plan your savings, and answer any financial questions. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: "Reduce Transportation Costs",
      description: "You're 24% over budget on transportation. Consider using public transport or carpooling to save ₹1,200 monthly.",
      type: "spending",
      priority: "high"
    },
    {
      id: '2',
      title: "Increase Emergency Fund",
      description: "Your emergency fund covers only 3 months of expenses. Aim for 6 months by saving ₹2,000 more monthly.",
      type: "saving",
      priority: "medium"
    },
    {
      id: '3',
      title: "Optimize Food Budget",
      description: "You've saved ₹800 on dining out this month! Consider allocating this to your vacation fund.",
      type: "budget",
      priority: "low"
    }
  ];

  const quickQuestions = [
    "Can I afford a ₹30K laptop in 3 months?",
    "How can I save more money?",
    "Should I increase my emergency fund?",
    "What's my spending pattern this month?"
  ];

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      laptop: "Based on your current savings rate of ₹8,000/month and existing balance, you can afford a ₹30K laptop in 3-4 months if you maintain your current savings discipline. Consider setting up a separate goal for this purchase!",
      save: "Here are 3 ways to save more: 1) Reduce transportation costs by 20% (₹1,200/month), 2) Cook at home 2 more times per week (₹800/month), 3) Review and cancel unused subscriptions (₹500/month). This could save you ₹2,500 monthly!",
      emergency: "Your emergency fund is at 45% of your goal. I recommend increasing it by ₹2,000/month to reach 6 months of expenses. This will provide better financial security for unexpected situations.",
      spending: "This month you've spent 68% of your total budget. Your highest categories are: Food (65% of budget), Transportation (124% - over budget!), and Entertainment (60%). Focus on reducing transportation costs first.",
      default: "I understand you're looking for financial advice. Could you be more specific? I can help with budgeting, savings goals, expense analysis, or investment planning. What's your main concern right now?"
    };

    const message = userMessage.toLowerCase();
    if (message.includes('laptop') || message.includes('afford')) return responses.laptop;
    if (message.includes('save') || message.includes('saving')) return responses.save;
    if (message.includes('emergency')) return responses.emergency;
    if (message.includes('spending') || message.includes('pattern')) return responses.spending;
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: simulateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <Lightbulb className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <FinancialCard title="AI Recommendations" description="Personalized insights based on your spending">
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{suggestion.title}</h4>
                <Badge variant={getPriorityColor(suggestion.priority)} className="flex items-center gap-1">
                  {getPriorityIcon(suggestion.priority)}
                  {suggestion.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
            </div>
          ))}
        </div>
      </FinancialCard>

      <FinancialCard title="AI Financial Coach" description="Ask me anything about your finances">
        <div className="space-y-4">
          <ScrollArea className="h-64 p-4 rounded-lg bg-muted/30">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                      {message.type === 'user' ? 
                        <User className="h-4 w-4 text-white" /> : 
                        <Bot className="h-4 w-4 text-white" />
                      }
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="p-2 rounded-full bg-accent">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-white border shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your finances..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </FinancialCard>
    </div>
  );
}