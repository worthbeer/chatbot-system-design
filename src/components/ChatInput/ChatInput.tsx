import { cn } from "@lib/utils";

type ChatInputProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ChatInput({ className, children }: ChatInputProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
