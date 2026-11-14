// observable-plot example: Line: random walk with lineY and lineX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: random walk with lineY and lineX',
  summary:
    'A cumulative sum of normal draws, passed as a bare array of numbers. lineY puts the values on y against the index; lineX puts them on x with the index going up.',
  section: 'Mark: Line',
  tags: ['lineY', 'lineX', 'identity', 'shorthand'],
  docs: ['repo/docs/marks/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
