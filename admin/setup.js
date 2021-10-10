// Noah Baculi 2021

import { generateLesson } from "/functions";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/setup/company_settings.png",
    "https://help.salesforce.com/s/articleView?id=sf.company_information_fields.htm&type=5",
  ],
  [
    "/data/admin/setup/ui_settings.png",
    "https://help.salesforce.com/s/articleView?id=sf.customize_ui_settings.htm&type=5",
  ],
  [
    "/data/admin/setup/user_and_security_controls.png",
    "https://help.salesforce.com/s/articleView?id=sf.security_data_access_mgmt.htm&type=5",
  ],
]);

generateLesson(lessonData);
