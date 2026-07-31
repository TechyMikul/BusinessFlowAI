import { inngest } from "./client";
import { scoreLead } from "../ai/lead-scorer";
import db from "../db";

export const scheduledFollowUps = inngest.createFunction(
  { id: "scheduled-follow-ups", triggers: [{ cron: "0 * * * *" }] },
  async ({ step }) => {
    // Implementation to find pending follow ups and send them via WhatsApp or Email
  }
);

export const recalculateLeadScore = inngest.createFunction(
  { id: "recalculate-lead-score", triggers: [{ event: "lead.updated" }] },
  async ({ event, step }) => {
    const leadId = event.data?.leadId;
    if (leadId) {
      await step.run("score-lead", async () => {
        return scoreLead(leadId);
      });
    }
  }
);

export const dailyDigestEmail = inngest.createFunction(
  { id: "daily-digest-email", triggers: [{ cron: "0 8 * * *" }] },
  async ({ step }) => {
    // Send digest emails to managers/owners
  }
);

export const googleSheetsSync = inngest.createFunction(
  { id: "google-sheets-sync", triggers: [{ event: "db.updated" }] },
  async ({ event, step }) => {
    // Sync data to customer's Google Sheets if configured
  }
);
