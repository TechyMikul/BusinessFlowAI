"use client";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { Plus, Search, Building2, Phone, Mail, MoreVertical } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CUSTOMERS.map((customer) => (
          <div key={customer.id} className="glass p-6 rounded-2xl group hover:border-primary/50 transition-colors relative">
            <button className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-md transition-colors text-foreground/40 hover:text-white opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-lg border border-white/10">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <div className="text-xs text-foreground/50 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3" /> {customer.company}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-foreground/70">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-foreground/40" /> {customer.phone}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-foreground/40" /> {customer.email}</div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
              <div>
                <div className="text-foreground/50">Total Invoices</div>
                <div className="font-medium text-sm mt-0.5">{customer.totalInvoices}</div>
              </div>
              <div className="text-right">
                <div className="text-foreground/50">Last Interaction</div>
                <div className="font-medium text-sm mt-0.5">{new Date(customer.lastInteraction).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
