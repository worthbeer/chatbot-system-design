import { cn } from "@lib/utils";

type ChatMessageProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ChatMessage({ className, children }: ChatMessageProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
