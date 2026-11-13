// Animation example: duration 0, 500 and 2000
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation duration from zero to two seconds',
  summary: 'Three circles run the same move with duration 0, 500 and 2000 ms. The zero-duration one lands instantly. The full view lists each animation\'s duration and completed state and has a button to run them again.',
  section: 'Animation',
  tags: ['animate', 'duration', 'completed'],
  docs: ['pages/animejs-com/documentation/animation/animation-playback-settings/duration.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
