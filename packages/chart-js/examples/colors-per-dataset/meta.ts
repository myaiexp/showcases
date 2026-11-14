// Chart.js example: Picking colours per dataset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking colours per dataset',
  summary:
    'Without help every dataset shares the global default colour and the bars cannot be told apart. Setting backgroundColor and borderColor on each dataset gives each series its own colour.',
  section: 'General',
  tags: ['backgroundColor', 'borderColor', 'dataset', 'Chart.defaults'],
  docs: ['repo/docs/general/colors.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
