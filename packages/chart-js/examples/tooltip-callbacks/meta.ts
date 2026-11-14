// Chart.js example: tooltip callbacks title, label, afterBody and footer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing your own tooltip text',
  summary:
    'The tooltip says "Espresso: 480 cups" instead of a bare number, adds a total at the bottom and names the best seller. Each part of the text comes from a function under plugins.tooltip.callbacks.',
  section: 'Configuration',
  tags: ['tooltip', 'callbacks', 'title', 'label', 'footer', 'afterBody', 'line', 'options.plugins.tooltip.callbacks'],
  docs: ['repo/docs/configuration/tooltip.md', 'repo/docs/configuration/interactions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
