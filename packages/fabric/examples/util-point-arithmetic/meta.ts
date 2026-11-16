// fabric example: Utilities: Point arithmetic as vectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: Point arithmetic as vectors',
  summary:
    'Two draggable dots are two Points from an origin; the gold arrow is the result of Point.add, subtract, scalarMultiply, multiply, rotate, lerp or midPointFrom, and distanceFrom draws a segment. The methods return new Points.',
  section: 'Utilities',
  tags: ['Point', 'add', 'subtract', 'scalarMultiply', 'multiply', 'rotate', 'lerp', 'midPointFrom', 'distanceFrom'],
  docs: ['repo/src/content/docs/api/classes/Point.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
