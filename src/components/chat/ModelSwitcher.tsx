
import { useModel, ModelType } from "../../context/ModelContext";
import { useChat } from "../../context/ChatContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MicVocal, Theatre, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const getModelIcon = (iconName: string) => {
  switch (iconName) {
    case "MicVocal":
      return <MicVocal className="h-5 w-5" />;
    case "TheatreIcon":
      return <Theatre className="h-5 w-5" />;
    case "Sparkles":
      return <Sparkles className="h-5 w-5" />;
    default:
      return null;
  }
};

export function ModelSwitcher() {
  const { currentModel, switchModel, models } = useModel();
  const { createChat } = useChat();
  const { toast } = useToast();

  const handleModelChange = (modelId: string) => {
    const newModel = modelId as ModelType;
    
    if (newModel !== currentModel) {
      switchModel(newModel);
      createChat(newModel);
      
      toast({
        title: `Switched to ${models[newModel].name}`,
        description: models[newModel].description,
      });
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-medium mb-3">Select AI Model</h2>
      <Tabs
        defaultValue={currentModel}
        value={currentModel}
        onValueChange={handleModelChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full">
          {Object.values(models).map((model) => (
            <TabsTrigger
              key={model.id}
              value={model.id}
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {getModelIcon(model.icon)}
              <span className="hidden sm:inline">{model.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <p className="text-sm text-muted-foreground mt-2">
        {models[currentModel].description}
      </p>
    </div>
  );
}
