export const MOCK_LEADS = [
  { id: "1", name: "Acme Corp", contact: "John Doe", source: "WhatsApp", score: 85, status: "New", assigned: "Alice", created: "2026-07-29T10:00:00Z" },
  { id: "2", name: "TechFlow", contact: "Jane Smith", source: "Website", score: 62, status: "Contacted", assigned: "Bob", created: "2026-07-28T14:30:00Z" },
  { id: "3", name: "Global Ind.", contact: "Sam Wilson", source: "Email", score: 92, status: "Qualified", assigned: "Alice", created: "2026-07-27T09:15:00Z" },
  { id: "4", name: "Nexus", contact: "Chris Evans", source: "Google", score: 35, status: "Lost", assigned: "Charlie", created: "2026-07-25T11:20:00Z" },
  { id: "5", name: "Stark Ltd", contact: "Tony Stark", source: "WhatsApp", score: 99, status: "Won", assigned: "Alice", created: "2026-07-20T16:45:00Z" },
  { id: "6", name: "Wayne Ent", contact: "Bruce Wayne", source: "Website", score: 75, status: "Quoted", assigned: "Bob", created: "2026-07-22T08:10:00Z" },
  { id: "7", name: "Daily Planet", contact: "Clark Kent", source: "Email", score: 45, status: "Contacted", assigned: "Charlie", created: "2026-07-26T13:40:00Z" },
  { id: "8", name: "LexCorp", contact: "Lex Luthor", source: "Google", score: 88, status: "Qualified", assigned: "Bob", created: "2026-07-28T15:55:00Z" }
];

export const MOCK_CUSTOMERS = [
  { id: "c1", name: "Stark Ltd", company: "Stark Industries", phone: "+1234567890", email: "tony@stark.com", totalInvoices: 12, lastInteraction: "2026-07-29T10:00:00Z" },
  { id: "c2", name: "Wayne Ent", company: "Wayne Enterprises", phone: "+1987654321", email: "bruce@wayne.com", totalInvoices: 8, lastInteraction: "2026-07-28T14:30:00Z" },
  { id: "c3", name: "Oscorp", company: "Oscorp Inc", phone: "+1122334455", email: "norman@oscorp.com", totalInvoices: 5, lastInteraction: "2026-07-25T09:15:00Z" },
  { id: "c4", name: "Queen Consol", company: "Queen Consolidated", phone: "+1555666777", email: "oliver@queen.com", totalInvoices: 2, lastInteraction: "2026-07-20T11:20:00Z" },
  { id: "c5", name: "Palmer Tech", company: "Palmer Technologies", phone: "+1999888777", email: "ray@palmer.com", totalInvoices: 15, lastInteraction: "2026-07-30T08:10:00Z" }
];

export const MOCK_MESSAGES = [
  { id: "m1", sender: "customer", text: "Hi, I need a quote for 50 licenses.", timestamp: "10:00 AM", channel: "WhatsApp" },
  { id: "m2", sender: "agent", text: "Hello! Sure, I can help with that. Are you looking for the Pro or Enterprise tier?", timestamp: "10:05 AM", channel: "WhatsApp" },
  { id: "m3", sender: "customer", text: "Enterprise tier please. Also, do you offer support?", timestamp: "10:15 AM", channel: "WhatsApp" },
  { id: "m4", sender: "agent", text: "Yes, 24/7 support is included in Enterprise. I'll send the quote right away.", timestamp: "10:20 AM", channel: "WhatsApp" },
  { id: "m5", sender: "customer", text: "Perfect, looking forward to it.", timestamp: "10:25 AM", channel: "WhatsApp" }
];

export const MOCK_QUOTATIONS = [
  { id: "Q-1001", customer: "Stark Ltd", amount: 5000, status: "Approved", validUntil: "2026-08-15", sentVia: "Email" },
  { id: "Q-1002", customer: "Wayne Ent", amount: 12000, status: "Sent", validUntil: "2026-08-20", sentVia: "WhatsApp" },
  { id: "Q-1003", customer: "Acme Corp", amount: 3500, status: "Draft", validUntil: "2026-08-25", sentVia: "-" },
  { id: "Q-1004", customer: "Nexus", amount: 800, status: "Rejected", validUntil: "2026-07-25", sentVia: "Email" }
];

export const MOCK_INVOICES = [
  { id: "INV-2001", customer: "Stark Ltd", amount: 5000, status: "Paid", dueDate: "2026-07-15", paidAt: "2026-07-10" },
  { id: "INV-2002", customer: "Wayne Ent", amount: 6000, status: "Overdue", dueDate: "2026-07-25", paidAt: "-" },
  { id: "INV-2003", customer: "Oscorp", amount: 2500, status: "Sent", dueDate: "2026-08-05", paidAt: "-" }
];

export const MOCK_PRODUCTS = [
  { id: "p1", name: "Enterprise License", description: "Full suite access with 24/7 support", price: 999, unit: "per user/yr", category: "Software" },
  { id: "p2", name: "Pro License", description: "Core features with email support", price: 499, unit: "per user/yr", category: "Software" },
  { id: "p3", name: "Implementation Setup", description: "One-time setup and data migration", price: 2500, unit: "fixed", category: "Service" },
  { id: "p4", name: "Training Session", description: "4-hour remote training for team", price: 800, unit: "per session", category: "Service" },
  { id: "p5", name: "Custom Integration", description: "Integration with existing ERP/CRM", price: 5000, unit: "fixed", category: "Service" },
  { id: "p6", name: "API Access", description: "High-volume API rate limits", price: 299, unit: "per month", category: "Add-on" }
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', revenue: 4000, leads: 24 },
  { name: 'Feb', revenue: 3000, leads: 13 },
  { name: 'Mar', revenue: 2000, leads: 98 },
  { name: 'Apr', revenue: 2780, leads: 39 },
  { name: 'May', revenue: 1890, leads: 48 },
  { name: 'Jun', revenue: 2390, leads: 38 },
  { name: 'Jul', revenue: 3490, leads: 43 },
];

export const MOCK_ACTIVITIES = [
  { id: 1, action: "Quotation Q-1002 sent", user: "Alice", time: "2 hours ago" },
  { id: 2, action: "New lead Acme Corp assigned", user: "System", time: "4 hours ago" },
  { id: 3, action: "Payment received for INV-2001", user: "System", time: "5 hours ago" },
  { id: 4, action: "Meeting with Wayne Ent", user: "Bob", time: "1 day ago" }
];
