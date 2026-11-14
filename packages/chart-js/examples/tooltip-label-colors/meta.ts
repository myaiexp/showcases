// Chart.js example: tooltip labelColor, labelTextColor and point styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour boxes and markers in tooltips',
  summary:
    'Restyle the little key beside each tooltip line: a dashed rounded box, text in the series colour, or the star and triangle shapes of the data. The labelColor, labelTextColor and labelPointStyle callbacks decide.',
  section: 'Configuration',
  tags: ['tooltip', 'labelColor', 'labelTextColor', 'labelPointStyle', 'usePointStyle', 'line', 'options.plugins.tooltip.callbacks.labelColor'],
  docs: ['repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
