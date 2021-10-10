// Noah Baculi 2021

import { generateLesson } from "/functions.js";

// Map of lesson page data

const lessonData = new Map([
  [
    "/data/admin/objects/objects.png",
    "https://help.salesforce.com/s/articleView?id=sf.overview_of_custom_object_relationships.htm",
  ],
  [
    "/data/admin/objects/fields.png",
    "https://help.salesforce.com/s/articleView?id=sf.customize_fields.htm",
  ],
  [
    "/data/admin/objects/page_layouts.png",
    "https://help.salesforce.com/s/articleView?id=sf.customize_layout.htm",
  ],
]);

generateLesson(lessonData);
