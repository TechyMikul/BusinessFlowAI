"use client";
import { MOCK_CHART_DATA } from "@/lib/mock-data";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PIE_DATA = [
  { name: 'WhatsApp', value: 400, color: '#10B981' },
  { name: 'Website', value: 300, color: '#3B82F6' },
  { name: 'Email', value: 300, color: '#F59E0B' },
  { name: 'Google Ads', value: 200, color: '#EF4444' },
];

const FUNNEL_DATA = [
  { name: 'Total Leads', value: 1000 },
  { name: 'Contacted', value: 800 },
  { name: 'Qualified', value: 600 },
  { name: 'Quoted', value: 400 },
  { name: 'Won', value: 250 },
];

export default function AnalyticsContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics &amp; Reports</h1>
          <p className="text-foreground/60 mt-1">Deep dive into your business performance.</p>
        </div>
        <select className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$84,250", trend: "+12.5%" },
          { title: "Avg Deal Size", value: "$3,450", trend: "+5.2%" },
          { title: "Win Rate", value: "32%", trend: "-2.1%" },
          { title: "Avg Response Time", value: "1.2h", trend: "-15%" }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl">
            <div className="text-sm text-foreground/60 mb-2">{stat.title}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-xs font-medium px-2 py-0.5 rounded-md ${stat.trend.startsWith('+') ? 'bg-success/10 text-success' : stat.trend.startsWith('-') ? 'bg-error/10 text-error' : 'bg-white/10 text-white'}`}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold mb-6">Revenue Trend</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold mb-6">Lead Sources</h2>
          <div className="flex-1 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1.2k</div>
                <div className="text-xs text-foreground/50">Total Leads</div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {PIE_DATA.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}} />
                <span className="text-foreground/70">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold mb-6">Pipeline Conversion</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.8)" tickLine={false} axisLine={false} width={80} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold mb-6">Leads vs Revenue</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#7C3AED" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} dot={{r: 4}} />
                <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
