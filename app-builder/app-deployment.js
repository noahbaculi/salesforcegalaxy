// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/app-builder/app-deployment/app-lifecycle.png",
    "https://trailhead.salesforce.com/en/content/learn/modules/application-lifecycle-and-development-models/understand-what-application-lifecycle-management-is",
  ],
  [
    "/data/app-builder/app-deployment/change-sets.png",
    "https://help.salesforce.com/s/articleView?id=sf.changesets.htm&type=5",
  ],
  [
    "/data/app-builder/app-deployment/packages.png",
    "https://help.salesforce.com/s/articleView?id=sf.sharing_apps.htm&type=5",
  ],
  [
    "/data/app-builder/app-deployment/deployment.png",
    "https://help.salesforce.com/s/articleView?id=sf.deploy_overview.htm&type=5",
  ],
]);

generateLesson(lessonData, 0x1B1F3A, 0xA64942);