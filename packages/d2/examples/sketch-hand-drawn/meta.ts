// d2 example: Sketch mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sketch mode',
  summary:
    'The `sketch` compile option redraws every outline with imperfect, hand-drawn strokes and switches to a handwriting-style font. The same source is compiled twice: once as normal, once with `sketch: true`.',
  section: 'Sketch',
  tags: ['sketch', 'hand-drawn'],
  docs: ['repo/docs/tour/sketch.md', 'repo/blog/sketch.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
