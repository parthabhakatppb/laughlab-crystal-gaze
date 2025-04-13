
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function UserProfile() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) return null;
  
  const handleSaveProfile = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const getThemeName = () => {
    switch (theme) {
      case "calm-blue": return "Calm Blue";
      case "midnight-noir": return "Midnight Noir";
      case "retro-terminal": return "Retro Terminal";
      case "futuristic-neon": return "Futuristic Neon";
      case "forest-green": return "Forest Green";
      case "soft-pastels": return "Soft Pastels";
      case "minimal-light": return "Minimal Light";
      default: return "Default";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">User Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
        <div className="flex justify-center my-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-glow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glow"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1">
              <Label>Name</Label>
              <div className="p-2 bg-muted/50 rounded">{user.name}</div>
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="p-2 bg-muted/50 rounded">{user.email}</div>
            </div>
          </>
        )}
        
        <div className="space-y-1">
          <Label>Current Theme</Label>
          <div className="p-2 bg-muted/50 rounded">{getThemeName()}</div>
        </div>
        
        <div className="space-y-1">
          <Label>Usage Stats</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-muted/50 rounded text-center">
              <div className="text-lg font-medium">23</div>
              <div className="text-xs text-muted-foreground">Chats</div>
            </div>
            <div className="p-2 bg-muted/50 rounded text-center">
              <div className="text-lg font-medium">154</div>
              <div className="text-xs text-muted-foreground">Messages</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            <Button variant="destructive" onClick={logout}>Logout</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
