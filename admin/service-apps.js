// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/service-apps/case_management.png",
    "https://help.salesforce.com/s/articleView?id=sf.support_agents_intro.htm",
  ],
  [
    "/data/admin/service-apps/case_automation.png",
    "https://help.salesforce.com/s/articleView?id=sf.cases_intro_respond.htm",
  ],
]);

generateLesson(lessonData);
