// tanstack-charts example: Animating a resize with motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animating a resize with motion',
  summary:
    'motion() does not animate resize-only updates by default: a real size change cancels motion and paints the final scene. resize: true animates the resized scene from the painted geometry instead. The box width changes every few seconds while the toggle is on or off.',
  section: 'Motion',
  tags: ['motion', 'resize'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
