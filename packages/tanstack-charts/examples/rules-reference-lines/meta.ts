// tanstack-charts example: Reference rules from data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reference rules from data",
  summary:
    "ruleX draws a dashed vertical line for every release row, and ruleY draws horizontal lines for a baseline at 0 and an optional target at 30. A plain number array works as the y source because a rule falls back to the datum itself.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['ruleX', 'ruleY', 'strokeDasharray', 'strokeOpacity'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
