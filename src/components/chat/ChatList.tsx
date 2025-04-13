
import { useChat } from "../../context/ChatContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { useModel } from "../../context/ModelContext";

export function ChatList() {
  const { chats, currentChat, selectChat, deleteChat, createChat } = useChat();
  const { currentModel } = useModel();
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const handleNewChat = () => {
    createChat(currentModel);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <Button 
          onClick={handleNewChat}
          className="w-full flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {chats.length === 0 ? (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No chats yet
            </div>
          ) : (
            chats.map((chat) => {
              // Generate a preview from the first message or a default
              const preview = chat.messages.length > 0
                ? chat.messages[0].content.substring(0, 30) + (chat.messages[0].content.length > 30 ? '...' : '')
                : 'New conversation';
                
              return (
                <div 
                  key={chat.id}
                  className={`flex items-start p-2 rounded-md gap-2 hover:bg-muted/50 transition-colors group ${
                    currentChat?.id === chat.id ? 'bg-muted' : ''
                  }`}
                >
                  <button
                    className="flex-1 flex items-start gap-3 text-left"
                    onClick={() => selectChat(chat.id)}
                  >
                    <MessageSquare className="h-5 w-5 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{preview}</div>
                      <div className="text-xs text-muted-foreground mt-1">{formatDate(chat.updatedAt)}</div>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteChat(chat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
