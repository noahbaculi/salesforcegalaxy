// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/data-and-analytics/reports.png",
    "https://help.salesforce.com/s/articleView?id=sf.rd_reports_overview.htm&type=5",
  ],
  [
    "/data/admin/data-and-analytics/dashboards.png",
    "https://help.salesforce.com/s/articleView?id=sf.rd_dashboards_overview.htm&type=5",
  ],
  [
    "/data/admin/setup/user_and_security_controls.png",
    "https://help.salesforce.com/s/articleView?id=sf.security_data_access_mgmt.htm&type=5",
  ],
  [
    "/data/admin/setup/ui_settings.png",
    "https://help.salesforce.com/s/articleView?id=sf.customize_ui_settings.htm&type=5",
  ],
  [
    "/data/admin/productivity-and-collaboration/appexchange.png",
    "https://trailhead.salesforce.com/en/content/learn/modules/appexchange_basics",
  ],
  [
    "/data/admin/productivity-and-collaboration/chatter.png",
    "https://help.salesforce.com/s/articleView?id=sf.collab_chatter_get_started.htm&type=5",
  ],
]);

generateLesson(lessonData, 0x272640, 0x065A60);
