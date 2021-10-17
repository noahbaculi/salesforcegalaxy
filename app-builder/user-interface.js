// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/productivity-and-collaboration/mobile_app.png",
    "https://help.salesforce.com/s/articleView?id=sf.salesforce_app.htm&type=5",
  ],
  [
    "/data/app-builder/user-interface/ui-customization.png",
    "https://help.salesforce.com/s/articleView?id=sf.customize_ui_settings.htm&type=5",
  ],
  [
    "/data/app-builder/user-interface/buttons-links-actions.png",
    "https://help.salesforce.com/s/articleView?id=sf.working_with_buttons_links_actions.htm&type=5",
  ],
]);

generateLesson(lessonData, 0x152A38, 0x1E5128);
