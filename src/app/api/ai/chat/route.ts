import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { BUSINESS_AGENT_PROMPT } from '@/lib/ai/prompts'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: anthropic('claude-3-haiku-20240307'),
    system: BUSINESS_AGENT_PROMPT,
    messages,
  })

  return result.toDataStreamResponse()
}
