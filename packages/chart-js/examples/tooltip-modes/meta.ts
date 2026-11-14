// Chart.js example: interaction.mode for tooltips (point, nearest, index…)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which points a tooltip shows',
  summary:
    'Hover a line and the tooltip lists the nearest point, every drink in that month, or a whole line, depending on the mode. interaction.mode chooses between point, nearest, index, dataset, x and y.',
  section: 'Configuration',
  tags: ['tooltip', 'interaction', 'mode', 'line', 'options.interaction.mode'],
  docs: ['repo/docs/configuration/interactions.md', 'repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
