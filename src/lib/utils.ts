import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(Number(amount))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date))
}

export function formatPhoneNumber(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
}

export function generateQuoteNumber() {
  return `QT-${Date.now().toString().slice(-6)}`
}

export function generateInvoiceNumber() {
  return `INV-${Date.now().toString().slice(-6)}`
}

export function calculateTotals(items: Array<{ quantity: number, unitPrice: number }>, taxRate = 0) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const tax = subtotal * taxRate
  return { subtotal, tax, total: subtotal + tax }
}
