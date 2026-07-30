"use client";
import { useState } from "react";
import { FileText, Plus, Download, Send, CheckCircle2, Sparkles, Flame, Eye } from "lucide-react";
import { MOCK_QUOTATIONS } from "@/lib/mock-data";
import { sounds, triggerConfetti } from "@/lib/gamification";

export default function QuotationsPage() {
  const [quotes, setQuotes] = useState(MOCK_QUOTATIONS);

  const handleCreateQuote = () => {
    sounds.playLevelUp();
    triggerConfetti();
    const newQ = {
      id: `Q-${1000 + quotes.length + 1}`,
      customer: "Stark Industries",
      amount: 7500,
      status: "Approved",
      validUntil: "2026-08-30",
      sentVia: "WhatsApp",
    };
    setQuotes((prev) => [newQ, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#161B22] border-3 border-black p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="neo-badge neo-badge-purple">DOCUMENT AUTOMATION</span>
            <span className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> SMART PDF GENERATOR
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            QUOTATIONS &amp; PROPOSALS
          </h1>
        </div>

        <button
          onClick={handleCreateQuote}
          className="neo-button-primary px-5 py-2.5 text-xs flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>GENERATE AI QUOTATION (+150 XP)</span>
        </button>
      </div>

      {/* Quotations Table */}
      <div className="neo-card bg-[#161B22] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0D1117] border-b-2 border-black text-gray-400 uppercase">
              <tr>
                <th className="p-4">QUOTE ID</th>
                <th className="p-4">CUSTOMER</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">VALID UNTIL</th>
                <th className="p-4">CHANNEL</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-[#1C212B] transition-colors">
                  <td className="p-4 font-bold text-purple-400">{q.id}</td>
                  <td className="p-4 font-bold text-white">{q.customer}</td>
                  <td className="p-4 font-black text-amber-400">${q.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`neo-badge ${
                      q.status === 'Approved' ? 'bg-emerald-500 text-black' :
                      q.status === 'Sent' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{q.validUntil}</td>
                  <td className="p-4 text-gray-300">{q.sentVia}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => { sounds.playSuccess(); triggerConfetti(); }}
                      className="neo-button-secondary px-3 py-1 text-[11px] flex items-center gap-1"
                    >
                      <Send className="w-3 h-3 text-emerald-400" />
                      <span>WA SEND</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
