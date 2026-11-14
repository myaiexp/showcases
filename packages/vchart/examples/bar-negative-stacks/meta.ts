// vchart example: Bar: positive and negative stacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: positive and negative stacks',
  summary:
    'Positive and negative values stack on either side of zero with no extra setup, and domainLine.onZero puts the category axis at the zero line. This week is stacked up, last week down.',
  section: 'Bar',
  tags: ['stack', 'domainLine.onZero', 'xField', 'seriesField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
