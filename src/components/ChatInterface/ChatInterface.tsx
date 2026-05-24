import { cn } from "@lib/utils";

type ChatInterfaceProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ChatInterface({ className, children }: ChatInterfaceProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
