import { NextRequest, NextResponse } from 'next/server'
import { handleWhatsAppWebhook } from '@/lib/whatsapp/webhook-handler'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    
    // In production, verify signature
    // const signature = req.headers.get('x-hub-signature-256')
    // if (!WhatsAppClient.verifyWebhookSignature(rawBody, signature, process.env.WHATSAPP_APP_SECRET!)) return new NextResponse('Forbidden', { status: 403 })

    const payload = JSON.parse(rawBody)
    await handleWhatsAppWebhook(payload)

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
