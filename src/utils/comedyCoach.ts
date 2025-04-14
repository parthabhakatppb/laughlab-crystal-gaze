
import { toast } from "@/hooks/use-toast";

/**
 * Generate a joke using a mock implementation
 * (In a production app, this would use a real API with a proper API key)
 */
export const generateJoke = async (interests: string): Promise<string> => {
  try {
    // Mock API call - in a real app, you would use a proper API key
    console.log(`Generating joke about: ${interests}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock joke based on interests
    const jokes = [
      `Why don't ${interests} enthusiasts ever get lost? Because they always take the "right" path!`,
      `I tried to start a ${interests} club, but there was too much drama. It was like a soap opera, but with more ${interests}.`,
      `My friend is so obsessed with ${interests} that they named their dog "Browser History" - something they desperately want to keep private.`,
      `${interests} is like a refrigerator: when you're not sure what you want, you stand in front of it with the door open and stare.`,
      `I'm not saying ${interests} is boring, but I've seen more excitement in a documentary about paint drying.`
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
  } catch (error) {
    console.error("Error generating joke:", error);
    toast({
      title: "Joke Generation Failed",
      description: "Could not generate a joke. Please try again.",
      variant: "destructive"
    });
    return "Sorry, I couldn't think of a joke right now. My comedy brain needs a coffee break!";
  }
};

/**
 * Mock function for analyzing voice emotion
 */
export const analyzeVoiceEmotion = async (audioBlob: Blob): Promise<string> => {
  // This is a placeholder - in a real implementation we'd send the audio to a voice analysis API
  console.log("Analyzing voice emotion for audio blob:", audioBlob);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock result
  const emotions = ["happy", "excited", "nervous", "confident", "flat"];
  return emotions[Math.floor(Math.random() * emotions.length)];
};

/**
 * Mock function for laughter detection
 */
export const detectLaughter = async (audioBlob: Blob): Promise<boolean> => {
  // This is a placeholder - in a real implementation we'd analyze the audio 
  console.log("Detecting laughter in audio blob:", audioBlob);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock result with 60% chance of laughter detected
  return Math.random() > 0.4;
};

/**
 * Get feedback on comedy delivery
 */
export const getDeliveryFeedback = (emotion: string, laughterDetected: boolean): string => {
  if (laughterDetected) {
    return `Great job! Your ${emotion} delivery got laughs from the audience. Keep it up!`;
  }
  
  switch (emotion) {
    case "happy":
      return "Your energy is good, but try varying your tone more to emphasize the punchline.";
    case "excited":
      return "Nice enthusiasm! Try slowing down slightly at the punchline for better impact.";
    case "nervous":
      return "I sense some nervousness. Try to relax and speak more confidently - the audience will feel your energy.";
    case "confident":
      return "Good confidence! Try adding more dynamic range to your voice for better engagement.";
    case "flat":
      return "Your delivery is a bit flat. Try adding more emotion and emphasizing key words in your joke.";
    default:
      return "Try adjusting your timing and emphasizing the punchline more clearly.";
  }
};
