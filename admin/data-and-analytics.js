// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/data-and-analytics/data_management.png",
    "https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management",
  ],
  [
    "/data/admin/data-and-analytics/data_validation.png",
    "https://help.salesforce.com/s/articleView?id=sf.fields_about_field_validation.htm&type=5",
  ],
  [
    "/data/admin/data-and-analytics/reports.png",
    "https://help.salesforce.com/s/articleView?id=sf.rd_reports_overview.htm&type=5",
  ],
  [
    "/data/admin/data-and-analytics/dashboards.png",
    "https://help.salesforce.com/s/articleView?id=sf.rd_dashboards_overview.htm&type=5",
  ],
]);

generateLesson(lessonData, 0x363030, 0xcc3737);
