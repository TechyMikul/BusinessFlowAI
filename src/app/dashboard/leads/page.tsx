"use client";
import { useState } from "react";
import { 
  Users, UserPlus, Filter, Search, Sparkles, Flame, 
  CheckCircle2, ArrowRight, FileText, Send, MoreVertical 
} from "lucide-react";
import { MOCK_LEADS } from "@/lib/mock-data";
import { sounds, triggerConfetti } from "@/lib/gamification";

export default function ExecutiveLeadsPage() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.contact.toLowerCase().includes(search.toLowerCase())
  );

  const handleScoreLead = (id: string) => {
    sounds.playLevelUp();
    triggerConfetti();
    setLeads(prev => prev.map(l => l.id === id ? { ...l, score: Math.min(100, l.score + 10) } : l));
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="glass-badge glass-badge-emerald">CRM &amp; Pipeline Engine</span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> 8 Active Pipeline Leads
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Leads &amp; AI Qualification
          </h1>
        </div>

        {/* View Toggles & Add Lead */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 flex gap-1">
            <button
              onClick={() => { sounds.playPop(); setViewMode("list"); }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "list" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "text-slate-400 hover:text-white"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => { sounds.playPop(); setViewMode("kanban"); }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "kanban" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-white"
              }`}
            >
              Kanban Board
            </button>
          </div>

          <button
            onClick={() => { sounds.playSuccess(); triggerConfetti(); }}
            className="glass-button-primary px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name or contact..."
            className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
          />
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" ? (
        <div className="glass-card rounded-3xl border border-slate-800/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Company / Lead</th>
                  <th className="p-4">Channel</th>
                  <th className="p-4">AI Qualification</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Rep</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-sm text-white">{l.name}</div>
                      <div className="text-slate-400 text-xs font-medium">{l.contact}</div>
                    </td>
                    <td className="p-4">
                      <span className="glass-badge glass-badge-cyan">
                        {l.source}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${l.score >= 80 ? 'text-emerald-400' : l.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {l.score}/100
                        </span>
                        <button 
                          onClick={() => handleScoreLead(l.id)}
                          className="p-1.5 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 transition-all cursor-pointer"
                          title="Recalculate AI Score"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="glass-badge glass-badge-emerald">
                        {l.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">{l.assigned}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => { sounds.playSuccess(); triggerConfetti(); }}
                        className="glass-button-indigo px-3.5 py-1.5 rounded-lg text-xs cursor-pointer"
                      >
                        Create Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["New", "Contacted", "Qualified", "Won"].map((colStatus) => {
            const colLeads = filtered.filter((l) => l.status === colStatus || (colStatus === "New" && l.status === "Quoted"));
            return (
              <div key={colStatus} className="glass-card p-4 rounded-3xl border border-slate-800/80 flex flex-col min-h-[420px]">
                <div className="font-bold text-xs uppercase mb-4 pb-2 border-b border-slate-800 flex items-center justify-between text-slate-300">
                  <span>{colStatus}</span>
                  <span className="glass-badge glass-badge-emerald text-[10px]">{colLeads.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {colLeads.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => handleScoreLead(l.id)}
                      className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer"
                    >
                      <div className="font-bold text-sm text-white mb-1">{l.name}</div>
                      <div className="text-xs text-slate-400 mb-3">{l.contact}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-400 font-medium">{l.source}</span>
                        <span className="text-emerald-400 font-bold">{l.score} Score</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
