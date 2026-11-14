// Chart.js example: A plugin that draws behind the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A plugin that draws behind the data',
  summary:
    'A target band for comfortable room temperature, painted from beforeDraw (behind the grid), beforeDatasetsDraw (behind the line) or afterDatasetsDraw (on top). Pick the hook and watch the stacking change.',
  section: 'Developers',
  tags: ['plugin', 'beforeDraw', 'beforeDatasetsDraw', 'afterDatasetsDraw', 'line'],
  docs: ['repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
