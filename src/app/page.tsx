import { ChatInterface } from "@components/ChatInterface";
import { SetupInstructions } from "@components/SetupInstructions";

export default function Home() {
  return process.env.ANTHROPIC_API_KEY
    ? <ChatInterface />
    : <SetupInstructions />;
}
