// observable-plot example: Difference: tall rows with the find reducer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Difference: tall rows with the find reducer",
  summary: "Daily minimum temperature in San Francisco against San Jose when each station is its own row: groupX with Plot.find picks y1 and y2 per date, and windowY smooths over 14 days.",
  section: 'Mark: Difference',
  tags: ['differenceY', 'groupX', 'find', 'windowY', 'ruleY', 'tip'],
  docs: ['repo/docs/marks/difference.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
