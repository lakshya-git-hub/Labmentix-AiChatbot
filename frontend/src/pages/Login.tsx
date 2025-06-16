import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
}

export default function Login({ onLogin, onSignup, isLoading }: LoginProps) {
  return (
    <div className="min-h-screen">
      <LoginForm onLogin={onLogin} onSignup={onSignup} isLoading={isLoading} />
    </div>
  );
}
