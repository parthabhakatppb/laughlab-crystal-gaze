import { toast } from "@/hooks/use-toast";

// Types for the Improv functionality
export interface ImprovResponse {
  text: string;
  animation?: string;
}

export type EmotionType = "silly" | "deadpan" | "mock-serious" | "happy" | "confused" | "neutral";

// Map of emotions to avatar states
const emotionToAnimationMap: Record<EmotionType, string> = {
  "silly": "laughing",
  "deadpan": "talking",
  "mock-serious": "serious",
  "happy": "happy",
  "confused": "questioning",
  "neutral": "idle"
};

// Context history for the improv sessions
let contextHistory: Record<string, Array<{role: string, text: string}>> = {};

// Function to map text to emotion for voice modulation
const mapTextToEmotion = (text: string): EmotionType => {
  const textLower = text.toLowerCase();
  
  if (textLower.includes("joke") || textLower.includes("haha") || textLower.includes("lol") || textLower.includes("funny")) {
    return "silly";
  } else if (textLower.includes("confused") || textLower.includes("?")) {
    return "confused";
  } else if (textLower.includes("serious") || textLower.includes("important") || textLower.includes("listen")) {
    return "mock-serious";
  } else if (textLower.includes("happy") || textLower.includes("good") || textLower.includes("great")) {
    return "happy";
  } else if (textLower.includes("neutral") || textLower.includes("normal")) {
    return "neutral";
  }
  
  return "neutral";
};

// Generate improv response using context history
export const generateImprovResponse = async (
  sessionId: string,
  userInput: string
): Promise<ImprovResponse> => {
  try {
    // Initialize context if it doesn't exist
    if (!contextHistory[sessionId]) {
      contextHistory[sessionId] = [];
    }
    
    // Add user input to context
    contextHistory[sessionId].push({ role: "USER", text: userInput });
    
    // Build prompt from context history
    let prompt = "IMPROV SCENARIO:\n";
    for (const turn of contextHistory[sessionId]) {
      prompt += `${turn.role}: ${turn.text}\n`;
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock responses based on content of user input
    let response = "";
    const textLower = userInput.toLowerCase();
    
    if (textLower.includes("joke")) {
      response = "Yes, and let me tell you a joke! Why did the improvisational comedian bring a ladder to the show? Because they heard the performance was on another level!";
    } else if (textLower.includes("scene") || textLower.includes("start")) {
      response = "Let's set the scene! We're in a spaceship, and the captain just discovered that all the coffee has been replaced with tea. What do we do now?";
    } else if (textLower.includes("character")) {
      response = "I'll play the role of an overly enthusiastic tour guide who's actually scared of all the attractions. 'AND HERE WE HAVE THE AMAZING... oh my goodness, is that thing moving?!'";
    } else {
      // Generic improv responses
      const genericResponses = [
        "Yes, and let's add a surprise twist! What if everything was actually underwater the whole time?",
        "Absolutely! And what if we discover a secret passage behind the bookshelf?",
        "I love that direction! And then maybe we realize that the mysterious package contains nothing but confetti?",
        "Great suggestion! And then perhaps we find out that the character was actually twins all along?",
        "Yes, and what if we then reveal that nobody in the scene can actually see the color blue?"
      ];
      response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
    
    // Add AI response to context
    contextHistory[sessionId].push({ role: "AI", text: response });
    
    // Keep only the last 10 turns
    if (contextHistory[sessionId].length > 10) {
      contextHistory[sessionId] = contextHistory[sessionId].slice(-10);
    }
    
    // Map the response to an emotion/animation
    const emotion = mapTextToEmotion(response);
    const animation = emotionToAnimationMap[emotion];
    
    return {
      text: response,
      animation
    };
  } catch (error) {
    console.error("Error generating improv response:", error);
    toast({
      title: "Improv Generation Failed",
      description: "Could not generate a response. Please try again.",
      variant: "destructive"
    });
    return {
      text: "I seem to be experiencing stage fright. Let's try again in a moment!",
      animation: "confused"
    };
  }
};

// Reset context for a session
export const resetImprovContext = (sessionId: string): void => {
  if (contextHistory[sessionId]) {
    delete contextHistory[sessionId];
  }
};
