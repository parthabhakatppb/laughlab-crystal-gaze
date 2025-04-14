
import { toast } from "@/hooks/use-toast";

// Mock function to simulate the T5 model joke generation
// In a production app, this would connect to a backend service running the model
export const generateJokeWithModel = async (setup: string): Promise<string> => {
  console.log(`Generating punchline for setup: ${setup}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock punchlines for different setups
  const punchlineMap: Record<string, string> = {
    "Why did the chicken cross the road?": "To get to the other side!",
    "What do you call a sleeping dinosaur?": "A dino-snore!",
    "Why don't scientists trust atoms?": "Because they make up everything!",
    "How does a penguin build its house?": "Igloos it together!",
  };
  
  // Try to find a matching setup, or generate a random punchline
  const punchline = punchlineMap[setup] || "That's a real knee-slapper!";
  return punchline;
};

// Enhanced version of the existing generateJoke function that uses the model output
export const generateJoke = async (interests: string): Promise<string> => {
  try {
    // Create a joke setup based on interests
    const setup = `Why do ${interests} enthusiasts always have fun?`;
    
    // Use the model to generate a punchline
    const punchline = await generateJokeWithModel(setup);
    
    // Return the complete joke
    return `${setup} ${punchline}`;
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
