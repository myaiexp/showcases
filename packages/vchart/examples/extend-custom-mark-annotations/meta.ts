// vchart example: Custom marks: rule, symbol, rect and text over a chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom marks: rule, symbol, rect and text over a chart",
  summary:
    "Four custom mark types annotate a bar chart: a shaded rect band, a dashed rule at a target value, a text label and symbols on the bars above target. The positions come from the series' valueToPosition, and updateData moves the bars while the annotations follow.",
  section: 'Custom Extension',
  tags: ['customMark', 'rule', 'symbol', 'rect', 'text', 'valueToPosition', 'getAllSeries'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
