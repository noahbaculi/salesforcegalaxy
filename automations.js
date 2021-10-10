// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/automations/validation_rules.png",
    "https://help.salesforce.com/s/articleView?id=sf.fields_about_field_validation",
  ],
  [
    "data/automations/approvals.png",
    "https://help.salesforce.com/s/articleView?id=sf.what_are_approvals",
  ],
  [
    "data/automations/workflows.png",
    "https://help.salesforce.com/s/articleView?id=sf.customize_wf",
  ],
  [
    "data/automations/processes.png",
    "https://help.salesforce.com/s/articleView?id=sf.process_overview",
  ],
  [
    "data/automations/flows.png",
    "https://help.salesforce.com/s/articleView?id=sf.flow",
  ],
]);

generateLesson(lessonData);
