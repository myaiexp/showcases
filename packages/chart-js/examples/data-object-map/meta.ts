// Chart.js example: Data as a label-to-value object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data as a label-to-value object',
  summary:
    'Data can be a plain object: each property name becomes a label and its value the number. Handy when your numbers already live in a lookup table, such as stock per coffee origin.',
  section: 'General',
  tags: ['data', 'Object', 'labels'],
  docs: ['repo/docs/general/data-structures.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
