// vchart example: FAQ: tidy axis and label numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: tidy axis and label numbers",
  summary:
    "Float sums leave labels like 0.30000000000000004. formatMethod on the axis label and the series label rounds them, with a choice of decimals and a unit suffix or a thousands scale.",
  section: 'FAQ',
  tags: ['axes.label.formatMethod','label.formatMethod','toFixed','unit'],
  docs: [
    'repo/docs/assets/faq/en/150- How to format axis labels.md',
    'repo/docs/assets/faq/en/175-How to define the number of decimal places of a value displayed by a label in VChart.md',
    'repo/docs/assets/faq/en/183- Can the unit of the y-axis be configured without a function.md',
    'repo/docs/assets/option/en/component/axis-common/axis-label.md',
    'repo/docs/assets/option/en/component/label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
