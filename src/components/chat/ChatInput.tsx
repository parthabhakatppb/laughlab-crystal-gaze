
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useModel } from "../../context/ModelContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ChatInput() {
  const { addMessage, currentChat, isLoading } = useChat();
  const { currentModel } = useModel();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim() || isLoading) return;
    
    if (!currentChat) {
      toast({
        title: "No active chat",
        description: "Please start a new chat first.",
        variant: "destructive",
      });
      return;
    }
    
    addMessage(message, "user", currentModel);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Try using Chrome.",
        variant: "destructive",
      });
      return;
    }

    // This is just a mock implementation since actual speech recognition would need more setup
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone.",
      });
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        setMessage(message + (message ? " " : "") + "This is a simulated voice input message.");
        setIsListening(false);
        toast({
          title: "Voice captured",
          description: "Your speech has been converted to text.",
        });
      }, 3000);
    } else {
      toast({
        title: "Voice input stopped",
        description: "You've stopped the voice input.",
      });
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[80px] resize-none input-glow"
          disabled={isLoading}
        />
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            size="icon"
            onClick={toggleVoiceInput}
            variant={isListening ? "default" : "outline"}
            className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
            disabled={isLoading}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {isLoading && (
        <p className="text-sm text-muted-foreground mt-2">
          AI is thinking...
        </p>
      )}
    </div>
  );
}
