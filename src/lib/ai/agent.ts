import { generateText, generateObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import db from '../db'
import { BUSINESS_AGENT_PROMPT } from './prompts'

export class AIAgent {
  static async processCustomerIntent(customerId: string, messageContent: string, orgId: string) {
    // Basic implementation using tools with Vercel AI SDK
    
    const systemPrompt = BUSINESS_AGENT_PROMPT

    const result = await generateText({
      model: anthropic('claude-3-haiku-20240307'),
      system: systemPrompt,
      prompt: `Customer message: ${messageContent}`,
      tools: {
        create_lead: {
          description: 'Create a new lead',
          parameters: z.object({
            name: z.string(),
            phone: z.string().optional(),
            email: z.string().optional()
          }),
          execute: async ({ name, phone, email }) => {
            return db.lead.create({ data: { name, phone, email, orgId, source: 'WHATSAPP' } })
          }
        },
        update_lead_status: {
          description: 'Update the status of an existing lead',
          parameters: z.object({
            leadId: z.string(),
            status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'QUOTED', 'WON', 'LOST'])
          }),
          execute: async ({ leadId, status }) => {
            return db.lead.update({ where: { id: leadId }, data: { status } })
          }
        }
        // Additional tools would be implemented here (get_product_catalog, generate_quotation_draft, etc.)
      },
      maxSteps: 5
    })

    return result.text
  }
}
