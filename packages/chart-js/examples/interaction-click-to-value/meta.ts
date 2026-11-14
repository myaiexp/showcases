// Chart.js example: getRelativePosition and scale.getValueForPixel in onClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click to read or add a value',
  summary:
    'Click the scatter chart and a new point lands exactly where you clicked, with the temperature and sales it stands for. getRelativePosition turns the click into canvas pixels and scale.getValueForPixel turns those into data.',
  section: 'Configuration',
  tags: ['interaction', 'onClick', 'getRelativePosition', 'getValueForPixel', 'scatter', 'options.onClick'],
  docs: ['repo/docs/configuration/interactions.md', 'repo/docs/getting-started/integration.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
