// Chart.js example: legend.labels.filter and legend.labels.sort
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hiding and sorting legend entries',
  summary:
    'Keep a reference series on the chart but off the legend, and list the rest alphabetically or by total. The legend.labels.filter and sort functions decide which entries appear and in what order.',
  section: 'Configuration',
  tags: ['legend', 'filter', 'sort', 'bar', 'options.plugins.legend.labels.filter'],
  docs: ['repo/docs/configuration/legend.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
