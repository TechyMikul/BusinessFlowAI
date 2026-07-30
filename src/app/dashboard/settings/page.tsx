"use client";
import { Save, Building2, Phone, Mail, MessageSquare, Plus, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your organization and integration settings.</p>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-4">
        {["General", "WhatsApp API", "Email (Resend)", "Team"].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-primary/20 text-primary' : 'text-foreground/60 hover:bg-white/5 hover:text-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <div className="glass p-6 rounded-2xl flex flex-col gap-6">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Organization Details</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/80">Company Name</label>
              <input type="text" defaultValue="Acme Corp" className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/80">Website</label>
              <input type="text" defaultValue="https://acmecorp.com" className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-sm font-medium text-foreground/80">Address</label>
              <textarea rows={3} className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors resize-none" defaultValue="123 Tech Lane, Silicon Valley, CA" />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-white/5">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col gap-6 opacity-70 hover:opacity-100 transition-opacity">
          <h2 className="text-lg font-semibold flex items-center gap-2"><MessageSquare className="w-5 h-5 text-green-400" /> WhatsApp Cloud API</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/80">Phone Number ID</label>
              <input type="password" value="****************" readOnly className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/80">Access Token</label>
              <input type="password" value="****************************************" readOnly className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
