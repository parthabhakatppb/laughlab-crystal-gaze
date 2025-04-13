
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Paintbrush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThemeOption {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
}

export function ThemePicker() {
  const { theme, changeTheme } = useTheme();
  const { toast } = useToast();
  
  const themeOptions: ThemeOption[] = [
    {
      id: "calm-blue",
      name: "Calm Blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800"
    },
    {
      id: "midnight-noir",
      name: "Midnight Noir",
      bgColor: "bg-gray-900",
      textColor: "text-gray-100"
    },
    {
      id: "retro-terminal",
      name: "Retro Terminal",
      bgColor: "bg-green-950",
      textColor: "text-green-400"
    },
    {
      id: "futuristic-neon",
      name: "Futuristic Neon",
      bgColor: "bg-violet-950",
      textColor: "text-fuchsia-300"
    },
    {
      id: "forest-green",
      name: "Forest Green",
      bgColor: "bg-green-100",
      textColor: "text-green-800"
    },
    {
      id: "soft-pastels",
      name: "Soft Pastels",
      bgColor: "bg-pink-50",
      textColor: "text-pink-800"
    },
    {
      id: "minimal-light",
      name: "Minimal Light",
      bgColor: "bg-gray-50",
      textColor: "text-gray-900"
    }
  ];
  
  const handleThemeChange = (themeId: string) => {
    changeTheme(themeId as any);
    toast({
      title: "Theme updated",
      description: `Theme changed to ${themeOptions.find(option => option.id === themeId)?.name}`,
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paintbrush className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
          <DialogDescription>
            Select a theme to personalize your experience
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              className={`p-4 rounded-lg ${option.bgColor} ${option.textColor} 
                         transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary
                         ${theme === option.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleThemeChange(option.id)}
            >
              <div className="text-center">
                <div className="font-medium">{option.name}</div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
