"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, Volume2, User, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export const CareChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome_1",
      sender: "bot",
      text: "Hello! I'm Carey, your CareCircle companion. You can ask me anything about Eleanor's medications, appointment dates, or safety guidelines. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend = inputValue) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const botMsg: ChatMessage = {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `err_${Date.now()}`,
          sender: "bot",
          text: "I had a small hiccup connecting. Please ask again in just a moment!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: "bot",
        text: "I'm having trouble reaching the care server. Please check your connection.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const suggestionChips = [
    "What pills are scheduled for tonight?",
    "When is my next doctor appointment?",
    "Can I take Metformin with food?",
    "How is my adherence streak?",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md border border-white/30"
            aria-label="Open AI Healthcare Assistant"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span>Ask Carey AI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        )}
      </div>

      {/* Glassmorphic Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-3xl apple-glass shadow-2xl border border-white/60 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-sky-100/80 via-white/70 to-pink-100/80 backdrop-blur-md border-b border-white/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-slate-900 text-base">Carey</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700">
                    AI Companion
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">CareCircle Health Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/60 transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 shadow-sm text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "apple-button-primary rounded-tr-sm"
                      : "bg-white/80 backdrop-blur-md border border-white/60 text-slate-800 rounded-tl-sm"
                  }`}
                >
                  <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[10px] opacity-70">
                    <span>{msg.time}</span>
                    {msg.sender === "bot" && (
                      <button
                        onClick={() => speakMessage(msg.text)}
                        type="button"
                        className="hover:opacity-100 p-0.5 text-slate-500 hover:text-sky-600"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 text-slate-500 text-xs font-semibold w-max">
                <Loader2 className="w-4 h-4 animate-spin text-pink-500" />
                <span>Carey is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-4 py-2 border-t border-white/40 bg-white/40 backdrop-blur-md overflow-x-auto flex gap-1.5 no-scrollbar">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                type="button"
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-xs hover:border-pink-300 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white/80 backdrop-blur-md border-t border-white/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about medications, visits, or symptoms..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-sm font-medium focus:bg-white focus:border-sky-500 transition outline-none"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="w-10 h-10 rounded-2xl apple-button-pink disabled:opacity-40 flex items-center justify-center text-white transition active:scale-95"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
