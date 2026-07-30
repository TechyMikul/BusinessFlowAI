import { inngest } from "./client";
import { scoreLead } from "../ai/lead-scorer";
import db from "../db";

export const scheduledFollowUps = inngest.createFunction(
  { id: "scheduled-follow-ups" },
  { cron: "0 * * * *" }, // Run every hour
  async ({ step }) => {
    // Implementation to find pending follow ups and send them via WhatsApp or Email
  }
);

export const recalculateLeadScore = inngest.createFunction(
  { id: "recalculate-lead-score" },
  { event: "lead.updated" },
  async ({ event, step }) => {
    const leadId = event.data.leadId;
    await step.run("score-lead", async () => {
      return scoreLead(leadId);
    });
  }
);

export const dailyDigestEmail = inngest.createFunction(
  { id: "daily-digest-email" },
  { cron: "0 8 * * *" }, // Run daily at 8 AM
  async ({ step }) => {
    // Send digest emails to managers/owners
  }
);

export const googleSheetsSync = inngest.createFunction(
  { id: "google-sheets-sync" },
  { event: "db.updated" },
  async ({ event, step }) => {
    // Sync data to customer's Google Sheets if configured
  }
);
