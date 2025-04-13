import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";

interface Sparkle {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
}

export function CrystalBall() {
  const { currentChat, isLoading } = useChat();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
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
  
  if (currentChat?.model !== "model3") {
    return null;
  }
  
  return (
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
  );
}
