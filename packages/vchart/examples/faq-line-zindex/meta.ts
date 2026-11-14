// vchart example: FAQ: bring one line to the front with zIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: bring one line to the front with zIndex",
  summary:
    "Lines draw in group order, so the last group covers the others. line.style.zIndex as a callback over the datum lifts any chosen group to the top. A select picks which one.",
  section: 'FAQ',
  tags: ["line.style.zIndex","seriesField","callback"],
  docs: [
    "repo/docs/assets/faq/en/50- How to adjust the layer order of lines in a line chart.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
