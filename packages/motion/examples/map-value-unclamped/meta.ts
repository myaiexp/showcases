// motion example: Overscroll stretch: clamped or not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overscroll stretch: clamped or not',
  summary: 'Two pull-to-refresh style stretch bars fed by the same pull distance. By default mapValue stops stretching at the end of its range, so the left bar halts at a safe limit; with clamp: false the right bar keeps going as you pull further.',
  section: 'Motion values',
  tags: ['mapValue', 'clamp', 'styleEffect', 'motionValue'],
  docs: ['pages/motion-dev/docs/map-value.md', 'pages/motion-dev/docs/style-effect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
