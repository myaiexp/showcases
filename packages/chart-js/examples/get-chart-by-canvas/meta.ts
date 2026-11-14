// Chart.js example: Finding a chart from its canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Finding a chart from its canvas',
  summary:
    'Chart.getChart() turns a canvas element or its id back into the chart drawn on it, or undefined for a plain canvas; isPluginEnabled() reports which plugins that chart runs.',
  section: 'Developers',
  tags: ['Chart.getChart', 'isPluginEnabled', 'plugins'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
