import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FinancialCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "success";
}

export function FinancialCard({ 
  title, 
  description, 
  children, 
  className,
  variant = "default"
}: FinancialCardProps) {
  const cardStyles = {
    default: "bg-gradient-card shadow-soft",
    gradient: "bg-gradient-primary text-white shadow-medium",
    success: "bg-gradient-success text-white shadow-soft"
  };

  return (
    <Card className={cn(
      "border-0 transition-all duration-300 hover:shadow-medium hover:scale-[1.02]",
      cardStyles[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-lg font-semibold",
          variant !== "default" ? "text-white" : "text-card-foreground"
        )}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className={cn(
            "text-sm",
            variant !== "default" ? "text-white/80" : "text-muted-foreground"
          )}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}