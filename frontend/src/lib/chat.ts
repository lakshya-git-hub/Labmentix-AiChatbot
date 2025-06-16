// Chat-related utility functions and types

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    theme: "light" | "dark";
    chatbotName: string;
    language: string;
  };
}

// Generate a unique ID for messages
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate a unique ID for chat sessions
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Format timestamp for display
export function formatMessageTime(timestamp: Date): string {
  const now = new Date();
  const messageTime = new Date(timestamp);

  // If message is from today, show time only
  if (messageTime.toDateString() === now.toDateString()) {
    return messageTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // If message is from this week, show day and time
  const daysDiff = Math.floor(
    (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysDiff < 7) {
    return messageTime.toLocaleDateString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Otherwise, show full date
  return messageTime.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Generate AI response using Gemini API via backend proxy
export async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch("https://labmentix-aichatbot.onrender.com/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: userMessage }),
    });
    const data = await response.json();
    console.log('Frontend received data from proxy:', data);
    // Gemini's response structure: data.candidates[0].content.parts[0].text
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error && data.error.message) {
      return `Gemini error: ${data.error.message}`;
    } else {
      return "Sorry, I couldn't generate a response at this time.";
    }
  } catch (error) {
    return `Error contacting Gemini API: ${error}`;
  }
}

// Validate message content
export function validateMessage(content: string): {
  isValid: boolean;
  error?: string;
} {
  if (!content.trim()) {
    return { isValid: false, error: "Message cannot be empty" };
  }

  if (content.length > 4000) {
    return {
      isValid: false,
      error: "Message is too long (max 4000 characters)",
    };
  }

  return { isValid: true };
}

// Local storage helpers for chat sessions (to be replaced with actual database)
const STORAGE_KEYS = {
  SESSIONS: "chat_sessions",
  CURRENT_USER: "current_user",
  PREFERENCES: "user_preferences",
};

export function saveChatSession(session: ChatSession): void {
  try {
    const sessions = getChatSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);

    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving chat session:", error);
  }
}

export function getChatSessions(): ChatSession[] {
  try {
    const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error("Error loading chat sessions:", error);
    return [];
  }
}

export function deleteChatSession(sessionId: string): void {
  try {
    const sessions = getChatSessions().filter((s) => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error deleting chat session:", error);
  }
}

export function saveCurrentUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

export function getCurrentUser(): User | null {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error loading user:", error);
    return null;
  }
}

export function clearUserData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
}
