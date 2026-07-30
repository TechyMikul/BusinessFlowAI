import { generateObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { LEAD_SCORING_PROMPT } from './prompts'
import db from '../db'

export async function scoreLead(leadId: string) {
  const lead = await db.lead.findUnique({
    where: { id: leadId },
    include: { customer: { include: { messages: true } } }
  })
  if (!lead) return null

  const result = await generateObject({
    model: anthropic('claude-3-haiku-20240307'),
    system: LEAD_SCORING_PROMPT,
    prompt: `Lead Details: ${JSON.stringify(lead)}`,
    schema: z.object({
      score: z.number().min(1).max(100),
      reasoning: z.string()
    })
  })

  await db.lead.update({
    where: { id: leadId },
    data: { 
      aiScore: result.object.score,
      aiSummary: { reasoning: result.object.reasoning } as any
    }
  })

  return result.object
}
