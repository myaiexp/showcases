// d2 example: Sketch mode with fills
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sketch mode with fills',
  summary:
    'Instead of RoughJS\'s hatching, sketch mode lays a subtle streak texture over each fill and chooses how it blends from the fill\'s brightness, so dark and light fills stay readable. Four fills from dark to light show it.',
  section: 'Sketch',
  tags: ['sketch', 'fill', 'texture'],
  docs: ['repo/blog/sketch.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
