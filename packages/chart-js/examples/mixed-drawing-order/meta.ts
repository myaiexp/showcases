// Chart.js example: Which dataset sits on top
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Which dataset sits on top",
  summary:
    "The order option decides which dataset is painted last. A higher number is drawn earlier and so sits underneath; order also changes the legend and tooltip order.",
  section: 'Chart types',
  tags: ['order','mixed','bar','line','fill'],
  docs: ['repo/docs/charts/mixed.md', 'repo/docs/charts/area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
