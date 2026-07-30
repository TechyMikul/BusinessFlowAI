import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { 
  scheduledFollowUps, 
  recalculateLeadScore, 
  dailyDigestEmail, 
  googleSheetsSync 
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    scheduledFollowUps,
    recalculateLeadScore,
    dailyDigestEmail,
    googleSheetsSync,
  ],
});
