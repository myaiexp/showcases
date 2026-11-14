// Chart.js example: What a scriptable option can see
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a scriptable option can see',
  summary:
    'Hover a bar and the log shows what Chart.js handed the backgroundColor function: its type, dataIndex, datasetIndex, raw and parsed values, the update mode and whether the bar is active.',
  section: 'General',
  tags: ['scriptable', 'context', 'dataIndex', 'raw', 'active', 'mode'],
  docs: ['repo/docs/general/options.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
