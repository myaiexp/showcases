// Chart.js example: Actual vs target: overlapping bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Actual vs target: overlapping bars',
  summary:
    'Each salesperson\'s result as a slim bar in front of a wider bar for their quota. grouped: false stops Chart.js from placing the datasets side by side.',
  section: 'Chart types',
  tags: ['bar', 'grouped', 'overlap', 'order'],
  docs: ['repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
