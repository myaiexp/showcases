// motion example: Dialog pop-in with bounce and visualDuration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dialog that pops in with a tunable bounce',
  summary: 'A confirmation dialog pops open with a spring. Two friendly knobs describe it: visualDuration, about how long it looks like it takes, and bounce, how springy it feels, from a slow overdamped settle (negative) to a wobbly one.',
  section: 'animate',
  tags: ['animate', 'spring', 'bounce', 'visualDuration', 'scale', 'per-value transition'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
