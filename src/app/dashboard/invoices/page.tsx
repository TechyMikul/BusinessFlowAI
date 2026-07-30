"use client";
import { useState } from "react";
import { Receipt, Plus, Download, CheckCircle2, Flame, Sparkles } from "lucide-react";
import { MOCK_INVOICES } from "@/lib/mock-data";
import { sounds, triggerConfetti } from "@/lib/gamification";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(MOCK_INVOICES);

  const handleCreateInvoice = () => {
    sounds.playSuccess();
    triggerConfetti();
    const newI = {
      id: `INV-${2000 + invoices.length + 1}`,
      customer: "Stark Ltd",
      amount: 5000,
      status: "Paid",
      dueDate: "2026-08-15",
      paidAt: "2026-07-30",
    };
    setInvoices((prev) => [newI, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="bg-[#161B22] border-3 border-black p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="neo-badge neo-badge-purple">FINANCIAL OPERATIONS</span>
            <span className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> REVENUE SYNCED
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            INVOICES &amp; PAYMENTS
          </h1>
        </div>

        <button
          onClick={handleCreateInvoice}
          className="neo-button-primary px-5 py-2.5 text-xs flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>CREATE INVOICE (+200 XP)</span>
        </button>
      </div>

      <div className="neo-card bg-[#161B22] overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#0D1117] border-b-2 border-black text-gray-400 uppercase">
            <tr>
              <th className="p-4">INVOICE ID</th>
              <th className="p-4">CUSTOMER</th>
              <th className="p-4">AMOUNT</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">DUE DATE</th>
              <th className="p-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-[#1C212B] transition-colors">
                <td className="p-4 font-bold text-purple-400">{inv.id}</td>
                <td className="p-4 font-bold text-white">{inv.customer}</td>
                <td className="p-4 font-black text-amber-400">${inv.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`neo-badge ${inv.status === 'Paid' ? 'bg-emerald-500 text-black' : 'bg-red-600 text-white'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-gray-400">{inv.dueDate}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { sounds.playSuccess(); triggerConfetti(); }} className="neo-button-secondary px-3 py-1 text-[11px]">
                    MARK PAID
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
