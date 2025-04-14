
import { useChat } from "../context/ChatContext";
import { useModel } from "../context/ModelContext";
import { MainLayout } from "../components/layouts/MainLayout";
import { ModelSwitcher } from "../components/chat/ModelSwitcher";
import { ChatList } from "../components/chat/ChatList";
import { ChatHistory } from "../components/chat/ChatHistory";
import { ChatInput } from "../components/chat/ChatInput";
import { CrystalBall } from "../components/crystal-ball/CrystalBall";
import { StandupComedy } from "../components/comedy/StandupComedy";
import { ImprovBuddy } from "../components/comedy/ImprovBuddy";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export default function ChatPage() {
  const { currentChat, createChat, chats } = useChat();
  const { currentModel } = useModel();
  
  // Create a default chat if none exists
  useEffect(() => {
    if (chats.length === 0) {
      createChat(currentModel);
    }
  }, [chats.length, createChat, currentModel]);
  
  // Determine whether to show the ChatInput component
  const showDefaultChatInput = !currentModel || 
    (currentModel !== "model1" && 
     currentModel !== "model2" && 
     currentModel !== "model3");
  
  return (
    <MainLayout>
      <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-132px)]">
        <div className="hidden md:block border rounded-lg overflow-hidden bg-card">
          <ChatList />
        </div>
        
        <div className="flex flex-col border rounded-lg overflow-hidden bg-card">
          <ModelSwitcher />
          
          {currentModel === "model1" && <StandupComedy />}
          {currentModel === "model2" && <ImprovBuddy />}
          {currentModel === "model3" && <CrystalBall />}
          
          <ChatHistory />
          
          {showDefaultChatInput && <ChatInput />}
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-16 right-4">
        <Button 
          size="icon" 
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => createChat(currentModel)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </MainLayout>
  );
}
