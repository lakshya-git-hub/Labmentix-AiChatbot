import React from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { type User } from "@/lib/chat";

interface IndexProps {
  user: User;
  onLogout: () => void;
}

export default function Index({ user, onLogout }: IndexProps) {
  return (
    <div className="h-screen overflow-hidden">
      <ChatInterface onLogout={onLogout} />
    </div>
  );
}
