// Chart.js example: tooltip itemSort and filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sorting and filtering tooltip lines',
  summary:
    'When a tooltip lists several drinks, put the biggest seller first or drop the lines you do not care about. plugins.tooltip.itemSort orders the lines and plugins.tooltip.filter removes some.',
  section: 'Configuration',
  tags: ['tooltip', 'itemSort', 'filter', 'bar', 'options.plugins.tooltip.itemSort'],
  docs: ['repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
