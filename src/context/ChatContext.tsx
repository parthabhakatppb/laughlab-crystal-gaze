
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ModelType } from "./ModelContext";
import { generateFortune } from "../utils/fortuneTeller";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model: ModelType;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  model: ModelType;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  createChat: (model: ModelType) => void;
  deleteChat: (chatId: string) => void;
  selectChat: (chatId: string) => void;
  addMessage: (content: string, role: "user" | "assistant", model: ModelType) => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load chats from localStorage on init
  useEffect(() => {
    const savedChats = localStorage.getItem("laughlab-chats");
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        // Convert date strings back to Date objects
        const formattedChats = parsedChats.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChats(formattedChats);
        
        // Set the most recent chat as current
        if (formattedChats.length > 0) {
          setCurrentChat(formattedChats[0]);
        }
      } catch (error) {
        console.error("Error parsing saved chats:", error);
        // If there's an error parsing, start with empty chats
        setChats([]);
      }
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("laughlab-chats", JSON.stringify(chats));
  }, [chats]);

  const createChat = (model: ModelType) => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: `New Chat ${chats.length + 1}`,
      messages: [],
      model,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChat(newChat);
  };

  const deleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    
    if (currentChat?.id === chatId) {
      setCurrentChat(chats.length > 1 ? chats.find(chat => chat.id !== chatId) || null : null);
    }
  };

  const selectChat = (chatId: string) => {
    const selected = chats.find(chat => chat.id === chatId) || null;
    setCurrentChat(selected);
  };

  const addMessage = async (content: string, role: "user" | "assistant", model: ModelType) => {
    if (!currentChat) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
      model
    };
    
    // Update the current chat with the new message
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      updatedAt: new Date()
    };
    
    // Update the chats array with the updated chat
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === currentChat.id ? updatedChat : chat
      )
    );
    
    setCurrentChat(updatedChat);
    
    // If this is a user message, generate an AI response
    if (role === "user") {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate response based on model
        let responseContent = "";
        
        if (model === "model1") {
          responseContent = "Your comedy timing is excellent! Try to emphasize the punchline a bit more for maximum effect.";
        } else if (model === "model2") {
          responseContent = "Yes, and... let's add a surprise twist! How about the character suddenly reveals they've been a ghost all along?";
        } else if (model === "model3") {
          // Enhanced mystical fortune response
          const messageContent = content.toLowerCase();
          
          // Extract any zodiac sign mentioned in the message
          const zodiacSigns = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", 
                              "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
          const mentionedSign = zodiacSigns.find(sign => messageContent.includes(sign)) || "";
          
          // Check if the message mentions karma reset
          const karmaReset = messageContent.includes("karma") || 
                             messageContent.includes("wholesome") || 
                             messageContent.includes("positive");
          
          // Generate a fortune
          responseContent = generateFortune(
            mentionedSign, // Use sign mentioned in message or random if not specified
            null, 
            messageContent.includes("music") ? "energetic party vibes" : "",
            karmaReset || Math.random() > 0.9 // Occasionally give wholesome responses
          );
        }
        
        const aiResponse: Message = {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: responseContent,
          timestamp: new Date(),
          model
        };
        
        // Add the AI response to the chat
        const chatWithResponse = {
          ...updatedChat,
          messages: [...updatedChat.messages, aiResponse],
          updatedAt: new Date()
        };
        
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === currentChat.id ? chatWithResponse : chat
          )
        );
        
        setCurrentChat(chatWithResponse);
      } catch (error) {
        console.error("Error generating response:", error);
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        createChat,
        deleteChat,
        selectChat,
        addMessage,
        isLoading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
