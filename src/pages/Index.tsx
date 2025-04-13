
// This file will simply redirect to the main app flow
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">LaughLab AI</h1>
        <p className="text-xl text-muted-foreground">Redirecting to app...</p>
      </div>
    </div>
  );
};

export default Index;
