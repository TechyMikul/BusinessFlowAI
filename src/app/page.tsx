"use client";
import { useState } from "react";
import Link from "next/link";
import { Bot, Zap, ArrowRight, Sparkles, Volume2, VolumeX, Shield, CheckCircle2, MessageSquare, TrendingUp, FileText, Layers, Activity } from "lucide-react";
import { sounds, triggerConfetti } from "@/lib/gamification";

export default function BusinessFlowLandingPage() {
  const [soundOn, setSoundOn] = useState(true);
  const [activeTab, setActiveTab] = useState<"whatsapp" | "leads" | "quotes">("whatsapp");
  const [simulatorMessage, setSimulatorMessage] = useState("");
  const [simulatorChat, setSimulatorChat] = useState([
    { sender: "client", text: "Hi! I need a quote for 50 units of Enterprise Workstation Laptops." },
    { sender: "ai", text: "Hello! I've automatically analyzed your request. 50x Enterprise Workstations total $60,000. Would you like me to send an official PDF quotation to your email?", score: "94/100 (Hot Lead)" }
  ]);

  const toggleSound = () => {
    const next = !soundOn;
    sounds.enabled = next;
    setSoundOn(next);
    if (next) sounds.playPop();
  };

  const handleSimulateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatorMessage.trim()) return;
    sounds.playPop();
    const userText = simulatorMessage;
    setSimulatorMessage("");
    setSimulatorChat(prev => [...prev, { sender: "client", text: userText }]);

    setTimeout(() => {
      sounds.playSuccess();
      setSimulatorChat(prev => [
        ...prev,
        {
          sender: "ai",
          text: `AI Agent parsed requirement: "${userText}". Updated CRM record, generated quotation draft #Q-2026-92, and queued WhatsApp quick reply!`,
          score: "98/100 (Auto-Qualified)"
        }
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#060810] text-[#F8FAFC] font-sans overflow-x-hidden relative flex flex-col justify-between">
      {/* Top Ambient Glow Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[600px] h-[350px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#060810]/75 border-b border-slate-800/80 px-6 lg:px-16 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#070A14] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">BusinessFlow<span className="text-emerald-400">.AI</span></span>
              <span className="glass-badge glass-badge-emerald text-[10px] py-0.5">v2.5 Enterprise</span>
            </div>
            <span className="text-[11px] text-slate-400 block -mt-1 font-medium">Autonomous Operations Platform</span>
          </div>
        </div>

        {/* Center Live Status Indicator */}
        <div className="hidden md:flex items-center gap-2 glass-badge glass-badge-cyan px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs text-slate-200 font-medium">WhatsApp Cloud API &amp; AI Engine: <strong className="text-emerald-400">ONLINE</strong></span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-all"
            title="Toggle Audio Feedback"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <Link
            href="/dashboard"
            onClick={() => { sounds.playSuccess(); triggerConfetti(); }}
            className="glass-button-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="container mx-auto px-6 lg:px-16 pt-12 pb-20 relative z-10 flex-1">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 glass-badge glass-badge-indigo px-4 py-1.5 mb-6 animate-float-slow">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-200">Next-Gen Business Operations Engine</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Autonomous Business CRM with <br className="hidden sm:block" />
            <span className="text-gradient-emerald">WhatsApp AI Integration</span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Automate sales leads, CRM qualification, instant quotations, invoice generation, and follow-ups. Empower your team with real-time AI agents.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              onClick={() => { sounds.playSuccess(); triggerConfetti(); }}
              className="w-full sm:w-auto glass-button-primary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-3 cursor-pointer group shadow-xl"
            >
              <Zap className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span>Enter Full-Stack Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/dashboard/inbox"
              onClick={() => sounds.playPop()}
              className="w-full sm:w-auto glass-button-secondary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Open WhatsApp Live Inbox</span>
            </Link>
          </div>
        </div>

        {/* Feature KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { label: "Response Speed", value: "< 2 Seconds", sub: "WhatsApp AI Auto-Reply", icon: Zap, color: "text-emerald-400" },
            { label: "Lead Qualification", value: "98.4%", sub: "AI Scoring Accuracy", icon: TrendingUp, color: "text-indigo-400" },
            { label: "Document Generation", value: "Instant PDF", sub: "Quotes & Tax Invoices", icon: FileText, color: "text-cyan-400" },
            { label: "Multi-Tenancy", value: "Enterprise", sub: "Role-Based Security", icon: Shield, color: "text-amber-400" },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Interactive Live AI Playground Preview */}
        <div className="max-w-5xl mx-auto glass-card rounded-3xl p-6 lg:p-8 border border-slate-700/50 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-md-center justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Live AI Interactive Demonstration</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">Test the WhatsApp AI agent response engine right here before logging into your workspace.</p>
            </div>

            {/* Playground Tab Toggle */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => { setActiveTab("whatsapp"); sounds.playPop(); }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "whatsapp" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "text-slate-400 hover:text-white"
                }`}
              >
                WhatsApp AI Agent
              </button>
              <button
                onClick={() => { setActiveTab("leads"); sounds.playPop(); }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "leads" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
                }`}
              >
                Lead Scoring
              </button>
              <button
                onClick={() => { setActiveTab("quotes"); sounds.playPop(); }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "quotes" ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20" : "text-slate-400 hover:text-white"
                }`}
              >
                Auto Quotations
              </button>
            </div>
          </div>

          {/* Playground Content Area */}
          {activeTab === "whatsapp" && (
            <div className="space-y-4">
              <div className="bg-[#0B0F19] rounded-2xl p-4 border border-slate-800 max-h-72 overflow-y-auto space-y-3">
                {simulatorChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === "client" ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                        msg.sender === "client"
                          ? "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/60"
                          : "bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white rounded-tr-none shadow-md shadow-emerald-500/10"
                      }`}
                    >
                      <div className="font-semibold text-[10px] opacity-75 mb-1">
                        {msg.sender === "client" ? "Customer (WhatsApp Inbound)" : "BusinessFlow AI Agent"}
                      </div>
                      {msg.text}
                      {msg.score && (
                        <div className="mt-2 pt-1 border-t border-emerald-400/30 text-[10px] font-mono text-emerald-100 flex items-center justify-between">
                          <span>AI Classification:</span>
                          <span className="font-bold">{msg.score}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSimulateSend} className="flex gap-3">
                <input
                  type="text"
                  value={simulatorMessage}
                  onChange={(e) => setSimulatorMessage(e.target.value)}
                  placeholder="Type a test customer message (e.g. Need 20 laptops quote urgently)..."
                  className="flex-1 glass-input px-4 py-3 rounded-xl text-xs font-medium focus:outline-none"
                />
                <button
                  type="submit"
                  className="glass-button-primary px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Send</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Acme Corp Ltd", score: 94, status: "QUALIFIED", source: "WhatsApp", revenue: "$45,000" },
                { name: "TechSurge Solutions", score: 88, status: "QUOTED", source: "Website Form", revenue: "$28,500" },
                { name: "Global Logistics Inc", score: 42, status: "NEW", source: "Email", revenue: "$12,000" },
              ].map((lead, i) => (
                <div key={i} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{lead.name}</span>
                      <span className="glass-badge glass-badge-emerald text-[10px]">{lead.status}</span>
                    </div>
                    <div className="text-xs text-slate-400 mb-3">Channel: {lead.source} • Est: {lead.revenue}</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">AI Score:</span>
                      <span className="font-bold text-emerald-400">{lead.score}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${lead.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-sm text-white">Quotation #Q-2026-89 (Auto-Generated)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                  Contains 50x Enterprise Workstations, 3-Year Onsite Warranty, and Automated WhatsApp Delivery link.
                </p>
                <div className="text-xs text-slate-400">Total Value: <strong className="text-emerald-400 font-bold">$60,000.00</strong></div>
              </div>

              <Link
                href="/dashboard/quotations"
                onClick={() => sounds.playPop()}
                className="glass-button-indigo px-6 py-3 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>View Full Quotation Manager</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#04060C] py-6 px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © 2026 BusinessFlow AI Platform. All rights reserved.
        </div>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
          <Link href="/dashboard/inbox" className="hover:text-emerald-400 transition-colors">WhatsApp Inbox</Link>
          <Link href="/dashboard/leads" className="hover:text-emerald-400 transition-colors">Leads Engine</Link>
        </div>
      </footer>
    </div>
  );
}
