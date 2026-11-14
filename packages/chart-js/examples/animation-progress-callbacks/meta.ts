// Chart.js example: animation.onProgress and onComplete drive an HTML progress bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A progress bar driven by the animation',
  summary:
    'An ordinary HTML progress bar fills while the line draws itself and flips to "complete" at the end. The animation.onProgress and onComplete callbacks tell the page how far along the chart is.',
  section: 'Configuration',
  tags: ['animation', 'onProgress', 'onComplete', 'callbacks', 'line', 'options.animation.onProgress'],
  docs: ['repo/docs/configuration/animations.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
