export interface WebhookPayload {
  object: string
  entry: Array<{
    id: string
    changes: Array<{
      value: {
        messaging_product: string
        metadata: {
          display_phone_number: string
          phone_number_id: string
        }
        contacts?: Array<{
          profile: { name: string }
          wa_id: string
        }>
        messages?: Array<{
          from: string
          id: string
          timestamp: string
          type: string
          text?: { body: string }
          interactive?: {
            type: string
            button_reply?: { id: string, title: string }
            list_reply?: { id: string, title: string, description: string }
          }
        }>
        statuses?: Array<{
          id: string
          status: string
          timestamp: string
          recipient_id: string
        }>
      }
      field: string
    }>
  }>
}

export type IntentClassification = {
  intent: 'NEW_INQUIRY' | 'SUPPORT' | 'PRICING' | 'FOLLOW_UP' | 'OTHER'
  confidence: number
}
