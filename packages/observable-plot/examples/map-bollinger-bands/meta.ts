// observable-plot example: Map: Bollinger bands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map: Bollinger bands',
  summary:
    'The explicit map transform with the bollinger method draws a rolling mean and a band of k deviations around the Apple close. Sliders set the window and the radius.',
  section: 'Transform: Map',
  tags: ['areaY', 'lineY', 'map', 'bollinger', 'y1', 'y2'],
  docs: ['repo/docs/transforms/map.md', 'repo/docs/marks/bollinger.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
