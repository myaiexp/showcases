// Chart.js example: replay a bar animation with any of the 31 easing curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Easing: how motion speeds up and slows down',
  summary:
    'The same bars grow again with the easing you pick: steady, bouncing, springy or slow to start. The animation.easing option names the curve; the duration stays the same.',
  section: 'Configuration',
  tags: ['animation', 'easing', 'bar', 'options.animation.easing'],
  docs: ['repo/docs/configuration/animations.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
