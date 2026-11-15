// tanstack-charts example: Renderer-wide transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Renderer-wide transition',
  summary:
    'motion(options) sets the fallback transition for everything the renderer animates. Pick a spring or a tween and the bars follow it when data changes. Anything the definition sets for itself, on the chart, a mark or an axis, overrides this fallback.',
  section: 'Motion',
  tags: ['motion', 'ChartMotionOptions', 'transition', 'tween', 'spring'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
