import { cn } from "@lib/utils";

type ApiKeyGateProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ApiKeyGate({ className, children }: ApiKeyGateProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
