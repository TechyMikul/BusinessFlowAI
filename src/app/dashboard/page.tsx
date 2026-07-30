"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  Users, UserPlus, FileText, IndianRupee, ArrowUpRight, Plus, 
  MessageCircle, FilePlus, Sparkles, Zap, Flame, Award, 
  CheckCircle2, AlertCircle, ArrowRight, RefreshCw, Send, Activity, ShieldCheck
} from "lucide-react";
import { MOCK_ACTIVITIES, MOCK_CHART_DATA, MOCK_LEADS } from "@/lib/mock-data";
import { sounds, triggerConfetti } from "@/lib/gamification";

const DynamicLineChart = dynamic(
  () => import('recharts').then((mod) => {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = mod;
    const Chart = () => (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MOCK_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="name" stroke="#64748B" tick={{fill: '#94A3B8', fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis stroke="#64748B" tick={{fill: '#94A3B8', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', color: '#fff' }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{r: 5, fill: '#10B981', stroke: '#060810', strokeWidth: 2}} activeDot={{r: 8, fill: '#34D399'}} />
        </LineChart>
      </ResponsiveContainer>
    );
    Chart.displayName = 'DynamicLineChart';
    return Chart;
  }),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-900/60 rounded-2xl animate-pulse" /> }
);

export default function ExecutiveDashboardHome() {
  const [greeting, setGreeting] = useState("Welcome Back");
  const [multiplier, setMultiplier] = useState(3);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleAction = (msg: string) => {
    sounds.playSuccess();
    triggerConfetti();
    setMultiplier(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Executive Welcome Banner */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-slate-700/60 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Glow Accent */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="glass-badge glass-badge-emerald">Executive Command Portal</span>
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> {multiplier}x Efficiency Multiplier
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {greeting}, Mikul Betala
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-medium">
            BusinessFlow AI is active: 8 inbound WhatsApp leads qualified &amp; 3 automated quotations sent today.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/dashboard/inbox"
            onClick={() => handleAction("WhatsApp Inbox")}
            className="glass-button-primary px-5 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Inbox (3 Unread)</span>
          </Link>

          <Link 
            href="/dashboard/quotations"
            onClick={() => handleAction("Generate Quote")}
            className="glass-button-indigo px-5 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
          >
            <FilePlus className="w-4 h-4" />
            <span>New AI Quotation</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Qualified Leads", value: "142", trend: "+12% this week", icon: UserPlus, color: "from-emerald-500 to-teal-600", badge: "glass-badge-emerald" },
          { title: "Active Customers", value: "48", trend: "+4% converted", icon: Users, color: "from-indigo-500 to-purple-600", badge: "glass-badge-indigo" },
          { title: "Pending Quotations", value: "12", trend: "$24,500 Value", icon: FileText, color: "from-cyan-500 to-blue-600", badge: "glass-badge-cyan" },
          { title: "Monthly Revenue", value: "$84,250", trend: "+18% vs last month", icon: IndianRupee, color: "from-emerald-600 to-green-500", badge: "glass-badge-emerald" }
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={() => sounds.playPop()}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800/80 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`glass-badge ${stat.badge} text-[10px]`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-slate-400">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-slate-800/80 flex flex-col h-[420px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-base text-white">
                Revenue &amp; Operations Forecast (6 Months)
              </h2>
            </div>
            <span className="glass-badge glass-badge-emerald text-xs">
              Live Real-Time Sync
            </span>
          </div>
          <div className="flex-1 w-full">
            <DynamicLineChart />
          </div>
        </div>

        {/* Live Activity & AI Stream */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800/80 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Live AI Activity Log
            </h2>
            <button 
              onClick={() => sounds.playPop()}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin">
            {MOCK_ACTIVITIES.map((act) => (
              <div 
                key={act.id} 
                onClick={() => sounds.playPop()}
                className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-emerald-400">
                    {act.user}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {act.time}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200">
                  {act.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Opportunity Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-700/60 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-emerald-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shrink-0">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <span className="glass-badge glass-badge-emerald text-[10px] mb-1">High Intent WhatsApp Lead</span>
            <h3 className="font-extrabold text-lg text-white">
              Stark Ltd • AI Score 99/100 (Hot Prospect)
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              Requested instant quotation for 50 Enterprise Workstation licenses. PDF ready to deliver via WhatsApp.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/inbox"
          onClick={() => handleAction("Hot Lead")}
          className="glass-button-primary px-6 py-3.5 rounded-xl text-xs flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Deliver Quote via WhatsApp</span>
          <Send className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
