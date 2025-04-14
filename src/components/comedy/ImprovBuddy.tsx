
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Theater, Send, RefreshCw, PanelRight } from "lucide-react";
import { generateImprovResponse, resetImprovContext, ImprovResponse } from "../../utils/improvService";
import { useChat } from "../../context/ChatContext";
import { generateJoke } from "../../utils/jokeGenerator";

export function ImprovBuddy() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [animation, setAnimation] = useState<string>("idle");
  const { toast } = useToast();
  const { addMessage } = useChat();
  const sessionId = "improv-session"; // Using a fixed session ID for simplicity
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      let response: ImprovResponse;
      
      if (userMessage.toLowerCase().includes("tell me a joke") || userMessage.toLowerCase().includes("joke about")) {
        // Extract interests from the message
        const interestsMatch = userMessage.match(/joke about\s+(.+)/i);
        const interests = interestsMatch ? interestsMatch[1] : "random things";
        
        // Generate a joke using the comedy coach functionality
        const joke = await generateJoke(interests);
        
        // Create a response that mimics the improv response structure
        response = {
          text: joke,
          animation: "laughing"
        };
        
        // Add the joke to the chat context
        addMessage(`Generated joke about ${interests}:\n\n${joke}`, "assistant", "model2");
      } else {
        // Generate a standard improv response
        response = await generateImprovResponse(sessionId, userMessage);
        
        // Add the response to the chat context
        addMessage(response.text, "assistant", "model2");
      }
      
      // Update the UI with the response
      setMessages(prev => [...prev, { type: 'ai', content: response.text }]);
      setAnimation(response.animation || "talking");
      
    } catch (error) {
      console.error("Error in improv interaction:", error);
      toast({
        title: "Interaction Failed",
        description: "Could not process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    resetImprovContext(sessionId);
    setMessages([]);
    setAnimation("idle");
    toast({
      title: "Session Reset",
      description: "Starting a fresh improv session!",
    });
  };
  
  // Animation class based on the current animation state
  const getAnimationClass = () => {
    switch (animation) {
      case "laughing":
        return "animate-bounce";
      case "talking":
        return "animate-pulse";
      case "questioning":
        return "animate-pulse";
      case "happy":
        return "animate-bounce";
      case "serious":
        return "animate-none";
      default:
        return "animate-none";
    }
  };
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Improv Buddy</h2>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Scene
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar/Character */}
        <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
          <div className={`w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground ${getAnimationClass()}`}>
            <Theater className="h-10 w-10" />
          </div>
          <p className="mt-2 text-sm text-center">{animation}</p>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 border rounded-lg overflow-hidden bg-card">
          <ScrollArea className="h-64 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground p-4">
                  Start your improv scene by typing a prompt below!
                </div>
              ) : (
                messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-muted/50 ml-8' 
                        : 'bg-primary/10 mr-8'
                    }`}
                  >
                    <p className="font-medium mb-1">
                      {message.type === 'user' ? 'You' : 'Improv Buddy'}
                    </p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="text-center p-2">
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                  <p className="text-xs text-muted-foreground mt-1">Thinking...</p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="border-t p-2">
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a line to the scene..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="text-sm bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Tips:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Try saying "Yes, and..." to build on the scene</li>
          <li>Ask for a joke about a specific topic</li>
          <li>Suggest a location or scenario</li>
          <li>Create a character with specific traits</li>
        </ul>
      </div>
    </div>
  );
}
