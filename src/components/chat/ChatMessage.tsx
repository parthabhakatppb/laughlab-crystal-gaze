
import { Message } from "../../context/ChatContext";
import { useModel } from "../../context/ModelContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { models } = useModel();
  const { toast } = useToast();
  
  const isUser = message.role === "user";
  const modelInfo = models[message.model];
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleTextToSpeech = () => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech. Try using Chrome.",
        variant: "destructive",
      });
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(message.content);
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: "Speaking message",
      description: "The message is being read aloud.",
    });
  };

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-muted/30' : 'bg-background'}`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
            <AvatarImage src="https://ui-avatars.com/api/?name=User&background=random" />
          </Avatar>
        ) : (
          <Avatar className={`${modelInfo.color} text-white`}>
            <AvatarFallback>{modelInfo.name[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">
            {isUser ? "You" : modelInfo.name}
          </h4>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="prose prose-sm max-w-none">
          {message.content}
        </div>
        {!isUser && (
          <div className="flex justify-end mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs"
              onClick={handleTextToSpeech}
            >
              <Volume2 className="h-3 w-3" />
              <span>Listen</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
