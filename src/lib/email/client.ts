import { Resend } from 'resend'

export class EmailClient {
  private resend: Resend

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey)
  }

  async sendEmail(to: string, subject: string, html: string, from: string = 'noreply@businessflow.ai') {
    return this.resend.emails.send({
      from,
      to,
      subject,
      html
    })
  }

  async sendQuotationEmail(to: string, quotationId: string) {
    // Implementation for sending quote
    return this.sendEmail(to, `Your Quotation #${quotationId}`, `<p>Please find your quotation attached...</p>`)
  }

  async sendInvoiceEmail(to: string, invoiceId: string) {
    // Implementation for sending invoice
    return this.sendEmail(to, `Your Invoice #${invoiceId}`, `<p>Please find your invoice attached...</p>`)
  }

  async sendFollowUpEmail(to: string, content: string) {
    return this.sendEmail(to, 'Following up', `<p>${content}</p>`)
  }
}
