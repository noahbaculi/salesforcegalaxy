// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/productivity-and-collaboration/activity_management.png",
    "https://help.salesforce.com/s/articleView?id=sf.activities.htm&type=5",
  ],
  [
    "/data/admin/productivity-and-collaboration/chatter.png",
    "https://help.salesforce.com/s/articleView?id=sf.collab_chatter_get_started.htm&type=5",
  ],
  [
    "/data/admin/productivity-and-collaboration/mobile_app.png",
    "https://help.salesforce.com/s/articleView?id=sf.salesforce_app.htm&type=5",
  ],
  [
    "/data/admin/productivity-and-collaboration/appexchange.png",
    "https://trailhead.salesforce.com/en/content/learn/modules/appexchange_basics",
  ],
]);

generateLesson(lessonData);
