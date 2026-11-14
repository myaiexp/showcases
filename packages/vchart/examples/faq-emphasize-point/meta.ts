// vchart example: FAQ: emphasise one point of a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: emphasise one point of a line",
  summary:
    "point.style size, fill, fillOpacity and stroke take callbacks over the datum, so a single point can be larger, brighter and outlined while the rest stay small and faint. A select moves the emphasis.",
  section: 'FAQ',
  tags: ["point.style","size","fillOpacity","callback"],
  docs: [
    "repo/docs/assets/faq/en/86- How to emphasize a specific point in a vchart line chart.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
