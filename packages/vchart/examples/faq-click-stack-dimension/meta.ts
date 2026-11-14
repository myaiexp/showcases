// vchart example: FAQ: all data of a clicked stacked bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: all data of a clicked stacked bar",
  summary:
    "A click on one segment gives one datum; filtering the data on its x value returns every segment of the stack. The readout lists them with their sum.",
  section: 'FAQ',
  tags: ["click","markName","stack","setSelected"],
  docs: [
    "repo/docs/assets/faq/en/89- How to retrieve all data of the same dimension as the clicked bar in a stacked bar chart.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
