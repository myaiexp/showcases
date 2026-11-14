// Chart.js example: Reading nested fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading nested fields',
  summary:
    'Records from an API are often nested. A dotted key such as stats.high reaches into each record, and a field whose own name contains a dot is escaped with a double backslash.',
  section: 'General',
  tags: ['parsing', 'yAxisKey', 'nested', 'escape'],
  docs: ['repo/docs/general/data-structures.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
