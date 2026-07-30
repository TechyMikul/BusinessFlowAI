"use client";
import dynamic from "next/dynamic";

const AnalyticsContent = dynamic(() => import("./analytics-content"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-8 w-48 bg-white/5 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[400px] bg-white/5 rounded-2xl" />
        ))}
      </div>
    </div>
  ),
});

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
