import crypto from 'crypto'

export class WhatsAppClient {
  private readonly apiUrl = 'https://graph.facebook.com/v21.0'

  constructor(
    private readonly phoneId: string,
    private readonly accessToken: string
  ) {}

  private async request(endpoint: string, method: string = 'POST', body?: any) {
    const response = await fetch(`${this.apiUrl}/${this.phoneId}/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`WhatsApp API Error: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  async sendTextMessage(to: string, text: string) {
    return this.request('messages', 'POST', {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { preview_url: true, body: text }
    })
  }

  async sendDocument(to: string, documentUrl: string, filename: string, caption?: string) {
    return this.request('messages', 'POST', {
      messaging_product: 'whatsapp',
      to,
      type: 'document',
      document: { link: documentUrl, caption, filename }
    })
  }

  async sendTemplateMessage(to: string, templateName: string, languageCode: string, components: any[] = []) {
    return this.request('messages', 'POST', {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        components
      }
    })
  }

  async sendInteractiveButtons(to: string, bodyText: string, buttons: Array<{id: string, title: string}>) {
    return this.request('messages', 'POST', {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: bodyText },
        action: {
          buttons: buttons.map(b => ({
            type: 'reply',
            reply: { id: b.id, title: b.title }
          }))
        }
      }
    })
  }

  async sendInteractiveList(to: string, bodyText: string, buttonText: string, sections: any[]) {
    return this.request('messages', 'POST', {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'list',
        body: { text: bodyText },
        action: { button: buttonText, sections }
      }
    })
  }

  async markAsRead(messageId: string) {
    return this.request('messages', 'POST', {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId
    })
  }

  async sendTypingIndicator(to: string) {
    // Official typing indicator API for cloud isn't fully robust, often handled via interactive or basic texts.
    // Stub implementation if available on advanced accounts.
    return Promise.resolve()
  }

  static verifyWebhookSignature(rawBody: string, signature: string, appSecret: string): boolean {
    const hmac = crypto.createHmac('sha256', appSecret)
    const digest = 'sha256=' + hmac.update(rawBody).digest('hex')
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
  }
}
