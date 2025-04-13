
import { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col justify-center bg-background">
      <div className="container max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">LaughLab AI</h1>
          <p className="text-muted-foreground">Your AI companion for humor and entertainment</p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center rounded-lg border p-1 bg-muted/50">
            <Button
              variant={isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(true)}
              className="rounded-md"
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(false)}
              className="rounded-md"
            >
              Sign Up
            </Button>
          </div>
        </div>
        
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
