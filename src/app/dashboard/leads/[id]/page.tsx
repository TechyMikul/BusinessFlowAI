"use client";
import { MOCK_LEADS } from "@/lib/mock-data";
import { ArrowLeft, MessageCircle, Mail, FileText, UserCheck, Calendar } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LeadDetailPage() {
  const params = useParams();
  const lead = MOCK_LEADS.find(l => l.id === params.id) || MOCK_LEADS[0];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <Link href="/dashboard/leads" className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Link>

      <div className="glass p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t-4 border-t-primary">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-bold border border-white/10">
            {lead.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{lead.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-foreground/60">
              <span>{lead.contact}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {lead.source}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">{lead.status}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-foreground/50">AI Lead Score</div>
          <div className="text-3xl font-bold text-success flex items-center gap-2">
            {lead.score} <span className="text-sm text-success/70 font-normal">/ 100</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-4">
        {["Overview", "Timeline", "Messages", "Quotations"].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-primary/20 text-primary' : 'text-foreground/60 hover:bg-white/5 hover:text-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-4 text-lg">AI Summary</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              This lead is highly interested in the Enterprise plan. They reached out via WhatsApp asking about API rate limits and SLA guarantees. Based on their company size and interaction speed, the AI predicts a high likelihood of conversion within the next 2 weeks.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-4 text-lg">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-all text-sm font-medium">
                <MessageCircle className="w-5 h-5 text-green-400" /> Send WhatsApp
              </button>
              <button className="flex items-center gap-3 p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-all text-sm font-medium">
                <Mail className="w-5 h-5 text-blue-400" /> Send Email
              </button>
              <button className="flex items-center gap-3 p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-all text-sm font-medium">
                <FileText className="w-5 h-5 text-purple-400" /> Create Quote
              </button>
              <button className="flex items-center gap-3 p-4 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 transition-all text-sm font-medium">
                <UserCheck className="w-5 h-5" /> Convert to Customer
              </button>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl h-fit">
          <h3 className="font-semibold mb-4 text-lg">Contact Info</h3>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-foreground/50">Email</span>
              <span className="font-medium">contact@{lead.name.toLowerCase().replace(' ', '')}.com</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-foreground/50">Phone</span>
              <span className="font-medium">+1 234 567 8900</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-foreground/50">Assigned To</span>
              <span className="font-medium">{lead.assigned}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Created</span>
              <span className="font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> 2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
