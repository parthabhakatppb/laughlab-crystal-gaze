
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Play, ArrowRight, Laugh } from "lucide-react";
import { AudioRecorder } from "../../utils/audioRecorder";
import { generateJoke, analyzeVoiceEmotion, detectLaughter, getDeliveryFeedback } from "../../utils/comedyCoach";
import { useChat } from "../../context/ChatContext";

const audioRecorder = new AudioRecorder();

export function StandupComedy() {
  const [interests, setInterests] = useState("");
  const [joke, setJoke] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState("");
  const [step, setStep] = useState<"input" | "joke" | "recording" | "feedback">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [useSimulation, setUseSimulation] = useState(false);
  const { toast } = useToast();
  const { addMessage } = useChat();

  const handleGenerateJoke = async () => {
    if (!interests.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter your interests to generate a joke.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const generatedJoke = await generateJoke(interests);
      setJoke(generatedJoke);
      setStep("joke");
      
      // Add the joke to the chat
      addMessage(`Generated joke about ${interests}:\n\n${generatedJoke}`, "assistant", "model2");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate joke. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        if (useSimulation) {
          setIsRecording(true);
          setStep("recording");
          toast({
            title: "Simulation Mode",
            description: "Simulating recording in demo mode.",
          });
        } else {
          await audioRecorder.startRecording();
          setIsRecording(true);
          setStep("recording");
          toast({
            title: "Recording Started",
            description: "Perform your joke now! Click the mic button again to stop.",
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to start recording";
        
        toast({
          title: "Recording Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        // If permission was denied, offer simulation mode
        if (errorMessage.includes("access denied") || errorMessage.includes("Permission denied")) {
          toast({
            title: "Using Simulation Mode",
            description: "We'll use simulation mode since microphone access was denied.",
          });
          setUseSimulation(true);
        }
      }
    } else {
      try {
        let blob: Blob;
        
        if (useSimulation) {
          blob = await audioRecorder.simulateRecording();
        } else {
          blob = await audioRecorder.stopRecording();
        }
        
        setAudioBlob(blob);
        setIsRecording(false);
        toast({
          title: "Recording Saved",
          description: useSimulation ? "Simulation completed!" : "Your performance has been recorded!",
        });
      } catch (error) {
        toast({
          title: "Recording Error",
          description: "Failed to save recording",
          variant: "destructive",
        });
        setIsRecording(false);
      }
    }
  };

  const analyzePerformance = async () => {
    if (!audioBlob) {
      toast({
        title: "No Recording",
        description: "Please record your joke delivery first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const emotion = await analyzeVoiceEmotion(audioBlob);
      const laughterDetected = await detectLaughter(audioBlob);
      const deliveryFeedback = getDeliveryFeedback(emotion, laughterDetected);
      
      setFeedback(deliveryFeedback);
      setStep("feedback");
      
      // Add the feedback to the chat
      addMessage(`Performance feedback: ${deliveryFeedback}`, "assistant", "model2");
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze your performance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    }
  };

  const resetCoach = () => {
    setInterests("");
    setJoke("");
    setAudioBlob(null);
    setFeedback("");
    setStep("input");
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
      <h2 className="text-xl font-bold">Comedy Coach</h2>
      
      {step === "input" && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Tell me what you're interested in, and I'll generate a joke for you to perform!
          </p>
          <div className="flex gap-2">
            <Input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., cats, coding, coffee"
              className="flex-1"
            />
            <Button 
              onClick={handleGenerateJoke} 
              disabled={isLoading || !interests.trim()}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>
      )}
      
      {step === "joke" && (
        <div className="flex flex-col gap-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="italic">{joke}</p>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetCoach}>
              Start Over
            </Button>
            <Button onClick={toggleRecording}>
              <Mic className="mr-2 h-4 w-4" />
              Record Performance
            </Button>
          </div>
        </div>
      )}
      
      {step === "recording" && (
        <div className="flex flex-col gap-3 items-center">
          <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Mic className="h-8 w-8 text-red-500 animate-pulse" />
          </div>
          <p>Recording your performance...</p>
          <Button variant="destructive" onClick={toggleRecording}>
            <MicOff className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        </div>
      )}
      
      {audioBlob && step !== "recording" && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Button variant="outline" onClick={playRecording}>
              <Play className="mr-2 h-4 w-4" />
              Play Recording
            </Button>
            {step !== "feedback" && (
              <Button onClick={analyzePerformance} disabled={isLoading}>
                <Laugh className="mr-2 h-4 w-4" />
                Analyze Performance
              </Button>
            )}
          </div>
        </div>
      )}
      
      {step === "feedback" && (
        <div className="flex flex-col gap-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Comedy Coach Feedback:</h3>
            <p>{feedback}</p>
          </div>
          <Button onClick={resetCoach}>Try Another Joke</Button>
        </div>
      )}
      
      {isLoading && (
        <div className="text-center py-2">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="text-sm text-muted-foreground mt-2">
            {step === "input" ? "Generating joke..." : "Analyzing performance..."}
          </p>
        </div>
      )}
      
      {useSimulation && (
        <div className="text-xs text-muted-foreground mt-2 p-2 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800/50 rounded">
          Running in simulation mode. For the full experience, please enable microphone access in your browser settings.
        </div>
      )}
    </div>
  );
}
