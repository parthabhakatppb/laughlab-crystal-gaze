
import { toast } from "@/hooks/use-toast";

// Mock API keys - in a real app these would be secured via environment variables or Supabase secrets
const OPENAI_API_KEY = "your-openai-api-key";

/**
 * Generate a joke using OpenAI's API
 */
export const generateJoke = async (interests: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a stand-up comedian." },
          { role: "user", content: `Write a stand-up comedy joke about ${interests}.` }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating joke:", error);
    toast({
      title: "Joke Generation Failed",
      description: "Could not connect to the comedy service. Please try again.",
      variant: "destructive"
    });
    return "Sorry, I couldn't think of a joke right now. My comedy brain needs a coffee break!";
  }
};

/**
 * Mock function for analyzing voice emotion
 * In a real implementation, this would connect to Deepgram
 */
export const analyzeVoiceEmotion = async (audioBlob: Blob): Promise<string> => {
  // This is a placeholder - in a real implementation we'd send the audio to Deepgram
  console.log("Analyzing voice emotion for audio blob:", audioBlob);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock result
  const emotions = ["happy", "excited", "nervous", "confident", "flat"];
  return emotions[Math.floor(Math.random() * emotions.length)];
};

/**
 * Mock function for laughter detection
 * In a real implementation, this would use librosa and MFCC
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
