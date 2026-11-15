// Vizzu example: chart.feature('rendering', false) stops drawing while the chart keeps animating
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rendering feature off',
  summary:
    "feature('rendering', false) stops the canvas from being redrawn, while animations still run and chart.config still changes. The corner label reads x from chart.config while the canvas shows the old chart; switching rendering back on and re-rendering makes it catch up.",
  section: 'Code reference',
  tags: ['feature', 'rendering', 'rendering.update', 'chart.config'],
  docs: [
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/src/apps/weblib/ts-api/plugins/rendercontrol.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
