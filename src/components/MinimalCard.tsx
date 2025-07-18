
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MinimalCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "success";
}

export function MinimalCard({ 
  title, 
  description, 
  children, 
  className,
  variant = "default"
}: MinimalCardProps) {
  const cardStyles = {
    default: "bg-card border shadow-sm",
    primary: "bg-gradient-primary text-white shadow-md border-0",
    success: "bg-success text-white shadow-md border-0"
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      cardStyles[variant],
      className
    )}>
      <CardHeader className="pb-4">
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
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}
