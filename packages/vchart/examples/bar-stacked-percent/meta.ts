// vchart example: Bar: 100% stacked columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: 100% stacked columns',
  summary:
    'stack plus percent: true normalizes every column to 100%, so the segments show shares. The y axis labels are formatted as percentages with formatMethod.',
  section: 'Bar',
  tags: ['stack', 'percent', 'axes.label.formatMethod', 'tooltip.mark'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
