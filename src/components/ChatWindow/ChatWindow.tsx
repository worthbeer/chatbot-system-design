import { cn } from "@lib/utils";

type ChatWindowProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ChatWindow({ className, children }: ChatWindowProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
