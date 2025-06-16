import React from "react";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export function MessageBubble({ message, className }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex items-start space-x-3",
        isUser && "flex-row-reverse space-x-reverse",
        className,
      )}
    >
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback
          className={cn(
            "text-white",
            isUser
              ? "bg-gradient-to-r from-gradient-from to-gradient-to"
              : "bg-gradient-to-r from-gradient-from to-gradient-to",
          )}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-xs lg:max-w-md break-words",
          isUser
            ? [
                "bg-chat-bubble-user text-chat-bubble-user-text",
                "rounded-tr-md ml-auto",
              ]
            : ["bg-chat-bubble-ai text-chat-bubble-ai-text", "rounded-tl-md"],
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-chat-bubble-user-text" : "text-chat-bubble-ai-text",
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
