// Chart.js example: Gains and losses around a baseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gains and losses around a baseline',
  summary:
    'Monthly profit with losses hanging below zero, coloured red and green by a scriptable colour. The base option moves the line the bars grow from.',
  section: 'Chart types',
  tags: ['bar', 'base', 'negative', 'scriptable'],
  docs: ['repo/docs/charts/bar.md', 'repo/docs/general/options.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
