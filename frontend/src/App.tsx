import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import {
  getCurrentUser,
  saveCurrentUser,
  clearUserData,
  type User,
} from "@/lib/chat";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate authentication (replace with actual auth logic)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
        preferences: {
          theme: "dark",
          chatbotName: "AI Assistant",
          language: "en",
        },
      };

      saveCurrentUser(newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (
    email: string,
    password: string,
    name: string,
  ) => {
    setIsLoading(true);

    // Simulate user creation (replace with actual signup logic)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        preferences: {
          theme: "dark",
          chatbotName: "AI Assistant",
          language: "en",
        },
      };

      saveCurrentUser(newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearUserData();
    setUser(null);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="chatbot-theme">
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            {user ? (
              <>
                <Route
                  path="/"
                  element={<Index user={user} onLogout={handleLogout} />}
                />
                <Route path="/login" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={
                    <Login
                      onLogin={handleLogin}
                      onSignup={handleSignup}
                      isLoading={isLoading}
                    />
                  }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </>
            )}

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "hsl(var(--chat-panel))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
