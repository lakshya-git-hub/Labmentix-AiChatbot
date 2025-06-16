import React, { KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Type a message...",
  className,
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend(value.trim());
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
    }
  };

  return (
    <div className={cn("flex items-end space-x-3", className)}>
      <div className="flex-1 relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "min-h-[48px] max-h-32 resize-none rounded-2xl",
            "bg-chat-input-bg border-chat-input-border",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "pr-12 py-3",
            "placeholder:text-muted-foreground",
          )}
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          size="sm"
          className={cn(
            "absolute right-2 bottom-2 h-8 w-8 p-0",
            "bg-gradient-to-r from-gradient-from to-gradient-to",
            "hover:from-gradient-from/90 hover:to-gradient-to/90",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200",
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
