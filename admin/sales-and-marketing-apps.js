// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/sales-and-marketing-apps/sales.png",
    "https://help.salesforce.com/s/articleView?id=sf.sales_core_turn_opptys_into_deals.htm",
  ],
  [
    "/data/admin/sales-and-marketing-apps/opportunity_tools.png",
    "https://help.salesforce.com/s/articleView?id=sf.einstein_sales_lead_insights.htm",
  ],
  [
    "/data/admin/sales-and-marketing-apps/marketing.png",
    "https://help.salesforce.com/s/articleView?id=sf.campaigns_def.htm",
  ],
]);

generateLesson(lessonData, 0x17223B, 0xFF6768);
