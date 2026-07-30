"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, UserCircle, Inbox, FileText, Receipt, 
  Package, LineChart, Settings, Bell, Search, Bot, Flame, Volume2, 
  VolumeX, Sparkles, Award, CheckCircle2, Shield, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sounds, triggerConfetti } from "@/lib/gamification";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/dashboard/leads", icon: Users, badge: "8 NEW", highlight: true },
  { name: "Customers", href: "/dashboard/customers", icon: UserCircle },
  { name: "Inbox", href: "/dashboard/inbox", icon: Inbox, badge: "3 WA", highlight: true },
  { name: "Quotations", href: "/dashboard/quotations", icon: FileText },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function ExecutiveDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [soundOn, setSoundOn] = useState(true);
  const [xp, setXp] = useState(2450);
  const [level, setLevel] = useState(5);
  const [showQuests, setShowQuests] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    sounds.enabled = next;
    setSoundOn(next);
    if (next) sounds.playPop();
  };

  const handleNavClick = () => {
    sounds.playPop();
  };

  const claimBonus = () => {
    sounds.playLevelUp();
    triggerConfetti();
    setXp(prev => prev + 250);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#060810] text-[#F8FAFC] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Executive Dark Glass Sidebar */}
      <aside className="w-64 bg-[#070A14]/90 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col relative z-30 shadow-2xl">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 bg-[#060810]/50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070A14] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                BusinessFlow<span className="text-emerald-400">.AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block -mt-1">
                Enterprise Operations
              </span>
            </div>
          </Link>
        </div>

        {/* Level Status Widget */}
        <div className="p-4 m-3 rounded-2xl glass-card border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> LVL {level} Executive
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {xp}/3000 XP
            </span>
          </div>
          {/* XP Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${(xp / 3000) * 100}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> 7 Day Streak
            </span>
            <button 
              onClick={claimBonus}
              className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              +250 XP
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1 scrollbar-thin">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative group",
                  isActive 
                    ? "bg-gradient-to-r from-emerald-500/20 to-indigo-500/10 text-white border border-emerald-500/40 shadow-lg shadow-emerald-500/10" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400")} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "glass-badge text-[10px] py-0.5 px-2",
                    item.highlight ? "glass-badge-emerald" : "glass-badge-indigo"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-slate-800/80 bg-[#060810]/60">
          <div className="flex items-center gap-3 p-2.5 rounded-xl glass-card border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
              MB
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">Mikul Betala</span>
              <span className="text-[10px] text-emerald-400 font-medium">Enterprise Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-[#070A14]/70 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between px-6 z-20">
          {/* Quick Search */}
          <div className="flex-1 flex items-center max-w-md">
            <div className="w-full flex items-center justify-between glass-input px-4 py-2 rounded-xl text-xs text-slate-400 cursor-pointer hover:border-slate-700 transition-all">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search leads, quotations, invoices...</span>
              </div>
              <span className="glass-badge glass-badge-cyan text-[10px]">
                CMD+K
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* AI Status Pill */}
            <div className="hidden sm:flex items-center gap-2 glass-badge glass-badge-emerald px-3 py-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-slate-200">AI Auto-Pilot: <strong className="text-emerald-400">ACTIVE</strong></span>
            </div>

            {/* Daily Quests Drawer Toggle */}
            <button
              onClick={() => { sounds.playPop(); setShowQuests(!showQuests); }}
              className="glass-button-secondary px-3 py-2 rounded-xl flex items-center gap-2 text-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Daily Quests</span>
              <span className="glass-badge glass-badge-indigo text-[10px] py-0 px-1.5">2/3</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="glass-button-secondary p-2.5 rounded-xl cursor-pointer"
              title="Toggle Audio Feedback"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Notifications Bell */}
            <button 
              onClick={() => sounds.playPop()}
              className="glass-button-secondary p-2.5 rounded-xl relative cursor-pointer"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full" />
            </button>
          </div>
        </header>

        {/* Daily Quests Popup Drawer */}
        {showQuests && (
          <div className="absolute top-18 right-6 z-50 w-80 glass-card p-5 rounded-2xl border border-slate-700/60 shadow-2xl animate-float-slow">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> DAILY AI QUESTS
              </span>
              <button onClick={() => setShowQuests(false)} className="text-xs font-bold text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="flex flex-col gap-2.5 text-xs">
              {[
                { task: "Respond to WhatsApp lead from Stark Ltd", xp: "+100 XP", done: true },
                { task: "Generate AI PDF Quote for Wayne Ent", xp: "+150 XP", done: true },
                { task: "Sync 5 customer records to Google Sheets", xp: "+200 XP", done: false },
              ].map((q, idx) => (
                <div key={idx} className={cn("p-3 rounded-xl border flex items-center justify-between", q.done ? "bg-emerald-950/30 border-emerald-500/40" : "bg-slate-900/80 border-slate-800")}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={cn("w-4 h-4 shrink-0", q.done ? "text-emerald-400" : "text-slate-600")} />
                    <span className={cn(q.done ? "line-through text-slate-400" : "text-slate-200 font-medium")}>{q.task}</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 shrink-0 ml-1">{q.xp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Content Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-thin">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
