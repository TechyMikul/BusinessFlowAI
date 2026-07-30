"use client";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Plus, Search, Tag, Package, Box, Layers, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products & Services</h1>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-4">
        {["All Items", "Software", "Service", "Add-on"].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-primary/20 text-primary' : 'text-foreground/60 hover:bg-white/5 hover:text-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="glass p-6 rounded-2xl group hover:border-primary/50 transition-colors flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                {product.category === 'Software' ? <Box className="w-5 h-5 text-accent" /> :
                 product.category === 'Service' ? <Layers className="w-5 h-5 text-success" /> :
                 <Tag className="w-5 h-5 text-warning" />}
              </div>
              <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-foreground/40 hover:text-white opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-foreground/60 mt-2 flex-1">{product.description}</p>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold">${product.price.toLocaleString()}</div>
                <div className="text-xs text-foreground/50">{product.unit}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-foreground/70 border border-white/10">
                {product.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
