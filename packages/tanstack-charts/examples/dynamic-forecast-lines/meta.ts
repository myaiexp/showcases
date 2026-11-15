// tanstack-charts example: Actual and forecast with per-mark springs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Actual and forecast with per-mark springs',
  summary:
    'The documented forecast example: a chart-level path morph with a staggered line entrance, and a heavier spring on the forecast line only. The forecast lags behind the actual line when the data changes, because its mass is 1.25.',
  section: 'Dynamic Data and Animation',
  tags: ['motion', 'stagger', 'path morph', 'spring', 'mass'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md', 'repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
