// Chart.js example: a custom Tooltip.positioners entry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom tooltip position',
  summary:
    'Besides "average" and "nearest", a tooltip can follow a rule of your own: hang from the top edge above the bars, or sit in the plot\'s corner. You add a function to Tooltip.positioners and name it in tooltip.position.',
  section: 'Configuration',
  tags: ['tooltip', 'position', 'positioners', 'bar', 'developers', 'options.plugins.tooltip.position'],
  docs: ['repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
