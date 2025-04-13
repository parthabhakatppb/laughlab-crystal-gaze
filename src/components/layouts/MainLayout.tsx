
import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { ThemePicker } from "../ThemePicker";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">LaughLab AI</div>
          </div>
          <div className="flex items-center gap-4">
            <ThemePicker />
            <div className="hidden md:flex">
              <Link to="/chat">
                <Button variant={location.pathname === "/chat" ? "default" : "ghost"}>
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant={location.pathname === "/profile" ? "default" : "ghost"}>
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-4">
        {children}
      </main>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="flex justify-around p-2">
          <Link to="/chat">
            <Button variant="ghost" size="icon" className={location.pathname === "/chat" ? "bg-muted" : ""}>
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className={location.pathname === "/profile" ? "bg-muted" : ""}>
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
