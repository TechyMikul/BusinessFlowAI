import { z } from 'zod'

export const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  source: z.enum(['WHATSAPP', 'WEBSITE', 'GOOGLE_BUSINESS', 'EMAIL', 'MANUAL']).default('MANUAL')
})

export const updateLeadSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'QUOTED', 'WON', 'LOST'])
})

export const createCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  company: z.string().optional(),
  address: z.string().optional()
})

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0),
  description: z.string().optional(),
  unit: z.string().optional(),
  category: z.string().optional()
})

export const createQuotationSchema = z.object({
  customerId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0)
  }))
})

export const createInvoiceSchema = z.object({
  customerId: z.string(),
  quotationId: z.string().optional(),
  dueDate: z.string().datetime(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0)
  }))
})

export const sendMessageSchema = z.object({
  customerId: z.string(),
  content: z.string().min(1),
  channel: z.enum(['WHATSAPP', 'EMAIL', 'SMS', 'INTERNAL'])
})
