"use client";
import { useState } from "react";
import { 
  Send, Bot, Paperclip, Sparkles, CheckCheck, Phone, Video, 
  MoreVertical, FileText, CheckCircle2, MessageSquare, Award, Flame, Zap 
} from "lucide-react";
import { MOCK_CUSTOMERS, MOCK_MESSAGES } from "@/lib/mock-data";
import { sounds, triggerConfetti } from "@/lib/gamification";

export default function ExecutiveInboxPage() {
  const [activeCustomer, setActiveCustomer] = useState(MOCK_CUSTOMERS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [aiSuggesting, setAiSuggesting] = useState(false);
  const [suggestedText, setSuggestedText] = useState("");

  const handleSelectCustomer = (c: typeof MOCK_CUSTOMERS[0]) => {
    sounds.playPop();
    setActiveCustomer(c);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sounds.playSuccess();
    const newM = {
      id: `m-${Date.now()}`,
      sender: "agent",
      text: input,
      timestamp: "Just now",
      channel: "WhatsApp",
    };
    setMessages((prev) => [...prev, newM]);
    setInput("");
  };

  const generateAiReply = () => {
    sounds.playPop();
    setAiSuggesting(true);
    setTimeout(() => {
      setSuggestedText(
        `Hi ${activeCustomer.name.split(" ")[0]}! Thanks for reaching out. Based on your request, I've generated your custom Enterprise Quotation for 50 licenses ($5,000 total). Would you like me to send the PDF here on WhatsApp?`
      );
      setAiSuggesting(false);
    }, 800);
  };

  const acceptAiReply = () => {
    sounds.playSuccess();
    triggerConfetti();
    const newM = {
      id: `m-${Date.now()}`,
      sender: "agent",
      text: suggestedText,
      timestamp: "Just now",
      channel: "WhatsApp",
    };
    setMessages((prev) => [...prev, newM]);
    setSuggestedText("");
  };

  const sendPdfQuote = () => {
    sounds.playLevelUp();
    triggerConfetti();
    const newM = {
      id: `m-${Date.now()}`,
      sender: "agent",
      text: `📄 [PDF DOCUMENT DELIVERED] Quotation_Q-1002_${activeCustomer.company.replace(/\s+/g, "_")}.pdf (Total: $5,000.00). Click link to approve online.`,
      timestamp: "Just now",
      channel: "WhatsApp",
    };
    setMessages((prev) => [...prev, newM]);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col font-sans">
      {/* Top Banner */}
      <div className="glass-card p-5 mb-6 rounded-3xl border border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="glass-badge glass-badge-emerald">Meta WhatsApp Cloud API</span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> 100% Instant Response Rate
              </span>
            </div>
            <h1 className="font-extrabold text-xl text-white tracking-tight mt-0.5">
              WhatsApp &amp; Multi-Channel Unified Inbox
            </h1>
          </div>
        </div>

        <button 
          onClick={generateAiReply}
          className="glass-button-primary px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>Trigger AI Auto-Pilot</span>
        </button>
      </div>

      {/* Split Inbox Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left Column: Customer Conversations */}
        <div className="glass-card p-4 rounded-3xl border border-slate-800/80 flex flex-col min-h-0">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Active Conversations ({MOCK_CUSTOMERS.length})</span>
            <span className="glass-badge glass-badge-cyan text-[10px]">
              WhatsApp
            </span>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 scrollbar-thin">
            {MOCK_CUSTOMERS.map((c) => {
              const isSel = c.id === activeCustomer.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    isSel 
                      ? "bg-gradient-to-r from-emerald-500/20 to-indigo-500/10 text-white border-emerald-500/50 shadow-lg shadow-emerald-500/10" 
                      : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{c.name}</span>
                    <span className={`text-[10px] font-medium ${isSel ? "text-emerald-300" : "text-slate-500"}`}>
                      10:25 AM
                    </span>
                  </div>
                  <div className={`text-xs truncate font-medium ${isSel ? "text-slate-200" : "text-slate-400"}`}>
                    {c.company} • {c.phone}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window & Controls */}
        <div className="lg:col-span-2 glass-card rounded-3xl border border-slate-800/80 flex flex-col min-h-0 overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                {activeCustomer.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  {activeCustomer.name}
                  <span className="glass-badge glass-badge-emerald text-[10px]">
                    Online
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {activeCustomer.company} • {activeCustomer.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={sendPdfQuote}
                className="glass-button-indigo px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
                title="Send PDF Quotation directly via WhatsApp"
              >
                <FileText className="w-4 h-4 text-cyan-300" />
                <span>Send PDF Quote</span>
              </button>
            </div>
          </div>

          {/* AI Suggestion Banner */}
          {suggestedText && (
            <div className="p-4 bg-emerald-950/40 border-b border-emerald-500/40 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> AI SUGGESTED REPLY (+50 XP)
                </span>
                <button onClick={() => setSuggestedText("")} className="text-xs text-slate-400 hover:text-white">Dismiss</button>
              </div>
              <p className="text-xs bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-slate-200 font-medium leading-relaxed">
                "{suggestedText}"
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={acceptAiReply}
                  className="glass-button-primary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept &amp; Deliver via WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#060810]/80 scrollbar-thin">
            {messages.map((m) => {
              const isAgent = m.sender === "agent";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAgent ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs font-medium leading-relaxed border ${
                      isAgent
                        ? "bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white rounded-tr-none border-emerald-400/30 shadow-lg shadow-emerald-500/10"
                        : "bg-slate-900 text-slate-200 rounded-tl-none border-slate-800"
                    }`}
                  >
                    {m.text}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                    <span>{m.timestamp}</span>
                    {isAgent && <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type WhatsApp message..."
              className="flex-1 glass-input px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="glass-button-primary px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
