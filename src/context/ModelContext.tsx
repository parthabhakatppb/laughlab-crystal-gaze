
import { createContext, useContext, useState, ReactNode } from "react";

export type ModelType = "model1" | "model2" | "model3";

interface ModelInfo {
  id: ModelType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface ModelContextType {
  currentModel: ModelType;
  modelInfo: ModelInfo;
  switchModel: (model: ModelType) => void;
  models: Record<ModelType, ModelInfo>;
}

const modelDetails: Record<ModelType, ModelInfo> = {
  model1: {
    id: "model1",
    name: "Comedy Coach",
    description: "A professional coach to help improve your comedy delivery",
    icon: "MicVocal", // Using Lucide icon name
    color: "bg-model1",
  },
  model2: {
    id: "model2",
    name: "Improv Buddy",
    description: "Create comedic scenes with this improv companion",
    icon: "TheatreIcon", // This is fine in the context data as it's just a string identifier
    color: "bg-model2",
  },
  model3: {
    id: "model3",
    name: "Mystic Fortune",
    description: "Get mystical and humorous fortune predictions",
    icon: "Sparkles", // Using Lucide icon name
    color: "bg-model3",
  },
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [currentModel, setCurrentModel] = useState<ModelType>("model1");

  const switchModel = (model: ModelType) => {
    setCurrentModel(model);
  };

  return (
    <ModelContext.Provider 
      value={{ 
        currentModel, 
        modelInfo: modelDetails[currentModel], 
        switchModel,
        models: modelDetails
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
}
