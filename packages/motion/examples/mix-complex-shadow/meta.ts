// motion example: Card elevation slider mixing a whole shadow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Card elevation slider mixing a whole shadow',
  summary: 'One slider lifts a photo card off the desk: its box-shadow string, with its offsets, blur and colour, and its tilt and scale object are each mixed by the same number. mix() also accepts values outside 0 to 1, so the card can sink or float even higher.',
  section: 'Utils',
  tags: ['mix', 'complex string', 'object', 'extrapolation'],
  docs: ['pages/motion-dev/docs/mix.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
