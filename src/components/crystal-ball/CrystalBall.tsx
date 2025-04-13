
import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Image, Sparkles, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Sparkle {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
}

export function CrystalBall() {
  const { currentChat, isLoading, addMessage } = useChat();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prediction, setPrediction] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [mysteryLevel, setMysteryLevel] = useState(5);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Generate random sparkles
  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${0.5 + Math.random() * 1.5}px`,
      delay: `${Math.random() * 2}s`
    }));
    
    setSparkles(newSparkles);
  }, []);
  
  // Check if we should animate based on the current chat
  useEffect(() => {
    if (currentChat?.model === "model3" && isLoading) {
      setIsAnimating(true);
    } else if (!isLoading) {
      // Keep animating for a moment after response is received
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }
  }, [currentChat, isLoading]);

  // Extract latest prediction from chat
  useEffect(() => {
    if (currentChat?.model === "model3" && currentChat.messages.length > 0) {
      const lastAssistantMessage = [...currentChat.messages]
        .reverse()
        .find(message => message.role === "assistant");
      
      if (lastAssistantMessage) {
        setPrediction(lastAssistantMessage.content);
      }
    }
  }, [currentChat]);
  
  const generateImage = () => {
    setGeneratingImage(true);
    
    // Simulate image generation (in real app would call an API)
    setTimeout(() => {
      // Generate a random placeholder image based on the mystery level
      const imageId = Math.floor(Math.random() * 1000);
      const size = 400 + (mysteryLevel * 20);
      const imageUrl = `https://picsum.photos/seed/${imageId}/${size}/${size}`;
      
      setImageSrc(imageUrl);
      setGeneratingImage(false);
      
      toast({
        title: "Mystical Image Generated",
        description: "The crystal ball has revealed an image from the cosmos",
      });
    }, 2000);
  };
  
  if (currentChat?.model !== "model3") {
    return null;
  }
  
  return (
    <div className="flex flex-col items-center py-4 space-y-6">
      {/* Crystal Ball */}
      <div className="relative w-full flex justify-center items-center py-6">
        <div 
          className={`relative w-40 h-40 rounded-full bg-gradient-to-br from-purple-300/30 to-blue-300/30 backdrop-blur-md overflow-hidden
                      ${isAnimating ? 'animate-pulse-glow' : ''}
                      before:content-[''] before:absolute before:inset-4 before:rounded-full before:bg-gradient-to-tr
                      before:from-purple-500/30 before:to-blue-300/10 before:backdrop-blur-lg`}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/5 to-blue-300/5 animate-rotate"></div>
          
          {/* Inner glow */}
          <div 
            className={`absolute inset-8 rounded-full bg-white/10 backdrop-blur-sm
                      ${isAnimating ? 'animate-pulse' : ''}`}
          ></div>
          
          {/* Sparkles */}
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                top: sparkle.top,
                left: sparkle.left,
                width: sparkle.size,
                height: sparkle.size,
                animationDelay: sparkle.delay,
                opacity: isAnimating ? 1 : 0.2
              }}
            ></div>
          ))}
        </div>
        
        {/* Stars around the crystal ball */}
        <div className={`absolute top-0 left-1/4 text-xl ${isAnimating ? 'animate-float' : ''}`}>✨</div>
        <div className={`absolute bottom-0 right-1/4 text-xl ${isAnimating ? 'animate-float' : ''}`} style={{ animationDelay: '0.5s' }}>✨</div>
        <div className={`absolute top-1/3 right-1/4 text-lg ${isAnimating ? 'animate-float' : ''}`} style={{ animationDelay: '1s' }}>⭐</div>
        <div className={`absolute bottom-1/3 left-1/3 text-lg ${isAnimating ? 'animate-float' : ''}`} style={{ animationDelay: '1.5s' }}>⭐</div>
        
        {/* Mystical text */}
        <div className="absolute -bottom-8 text-center text-sm font-medium text-purple-500">
          {isAnimating ? "Reading the cosmic energy..." : "Crystal Ball"}
        </div>
      </div>
      
      {/* Prediction display */}
      <Card className="w-full p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-300/30">
        <h3 className="text-center text-lg font-medium mb-2 text-purple-300">Your Mystical Fortune</h3>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-purple-300/10" />
            <Skeleton className="h-4 w-3/4 bg-purple-300/10" />
            <Skeleton className="h-4 w-5/6 bg-purple-300/10" />
          </div>
        ) : (
          <p className="text-center italic text-sm">{prediction || "Ask a question to reveal your fortune..."}</p>
        )}
      </Card>
      
      {/* Image generation section */}
      <Card className="w-full p-4 bg-gradient-to-r from-indigo-900/20 to-pink-900/20 border-indigo-300/30">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-center text-lg font-medium text-indigo-300">Mystical Image Generator</h3>
          
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Less mystical</span>
              <span>More mystical</span>
            </div>
            <Slider
              value={[mysteryLevel]}
              min={1}
              max={10}
              step={1}
              className="w-full"
              onValueChange={(value) => setMysteryLevel(value[0])}
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30"
            onClick={generateImage}
            disabled={generatingImage}
          >
            {generatingImage ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Channeling cosmic energies...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Mystical Image
              </>
            )}
          </Button>
          
          {imageSrc && (
            <div className="w-full mt-4 flex justify-center">
              <div className="relative max-w-xs overflow-hidden rounded-lg border border-indigo-400/30 shadow-lg">
                <img src={imageSrc} alt="Mystical vision" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none"></div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
