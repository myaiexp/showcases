// vega example: Rule: Error Bars from Data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rule: Error Bars from Data",
  summary:
    "Each row draws a vertical rule from its low to its high value, two small horizontal rules for the caps, and a symbol at the mean. The width signal scales every interval at once.",
  section: "Mark Types",
  tags: ['marks.rule.y2','marks.rule.strokeWidth','marks.symbol'],
  docs: ['repo/docs/docs/marks/rule.md', 'repo/docs/docs/marks/rule.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
