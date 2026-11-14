// Chart.js example: tooltip.external drawing an HTML tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An HTML tooltip',
  summary:
    'The tooltip is a real page element, so it can have rounded corners, a shadow and each drink\'s share of the month. Switch off the canvas tooltip and give plugins.tooltip.external a function that builds the HTML.',
  section: 'Configuration',
  tags: ['tooltip', 'external', 'html', 'bar', 'options.plugins.tooltip.external'],
  docs: ['repo/docs/configuration/tooltip.md', 'repo/docs/configuration/interactions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
