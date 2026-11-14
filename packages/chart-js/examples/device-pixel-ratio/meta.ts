// Chart.js example: Sharp or soft: device pixel ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sharp or soft: device pixel ratio',
  summary:
    'devicePixelRatio decides how many canvas pixels back each screen pixel. Low values look blurry; high values cost memory and matter when the chart is zoomed or printed. The loupe shows the real pixels.',
  section: 'Configuration',
  tags: ['devicePixelRatio', 'resolution', 'canvas'],
  docs: ['repo/docs/configuration/device-pixel-ratio.md', 'repo/docs/configuration/responsive.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
