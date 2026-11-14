// vchart example: markLine reference lines and aggregates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'markLine reference lines and aggregates',
  summary:
    'Reference lines on a bar chart: markLine with y as an aggregate type (average, max, min, median), y as a value, and x as a category; each with label and end symbol. New data in the card moves the aggregate line.',
  section: 'Concepts: Components',
  tags: ['markLine', 'x', 'y', 'average', 'label', 'endSymbol'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/marker.md',
    'repo/docs/assets/option/en/component/mark-line.md',
    'repo/docs/assets/option/en/component/marker-common/marker-aggregation.md',
    'repo/docs/assets/option/en/component/marker-common/marker-symbol.md',
    'repo/docs/assets/option/en/component/marker-common/marker-label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
