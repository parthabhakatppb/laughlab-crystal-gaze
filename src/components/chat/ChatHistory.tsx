
import { useChat, Message } from "../../context/ChatContext";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export function ChatHistory() {
  const { currentChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  if (!currentChat || currentChat.messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-muted/20">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">No messages yet</h3>
          <p className="text-sm text-muted-foreground">
            Start a conversation by typing a message below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="flex flex-col divide-y">
        {currentChat.messages.map((message: Message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
