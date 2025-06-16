import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { cn } from "@/lib/utils";
import { generateAIResponse } from "@/lib/chat";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  onLogout?: () => void;
}

export function ChatInterface({ onLogout }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Use real AI response
    const aiContent = await generateAIResponse(content);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
      content: aiContent,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
  };

  return (
    <div className="flex h-screen bg-chat-bg">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-chat-panel border-r border-border flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gradient-from to-gradient-to flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">AI Assistant</h2>
              <p className="text-xs text-muted-foreground">
                Always here to help
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
              onClick={() => {
                setMessages([
                  {
                    id: Date.now().toString(),
                    content:
                      "Hello! I'm your AI assistant. How can I help you today?",
                    sender: "ai",
                    timestamp: new Date(),
                  },
                ]);
              }}
            >
              New Conversation
            </Button>
          </div>
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-chat-panel border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-r from-gradient-from to-gradient-to text-white">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 chat-messages">
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                className="chat-message-enter"
              />
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3 chat-message-enter">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-gradient-from to-gradient-to text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-chat-bubble-ai rounded-2xl rounded-tl-md px-4 py-3 max-w-xs lg:max-w-md">
                  <div className="typing-indicator">
                    <span
                      style={{ "--delay": 0 } as React.CSSProperties}
                    ></span>
                    <span
                      style={{ "--delay": 1 } as React.CSSProperties}
                    ></span>
                    <span
                      style={{ "--delay": 2 } as React.CSSProperties}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t border-border bg-chat-panel p-4">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            disabled={isTyping}
            placeholder="Type your message..."
          />
        </div>
      </div>
    </div>
  );
}
