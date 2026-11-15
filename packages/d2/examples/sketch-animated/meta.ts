// d2 example: Sketch mode with animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sketch mode with animation',
  summary:
    'Animated connections work in sketch mode too: the hand-drawn lines carry the same marching-dash animation as in normal mode, since `animated` is part of the SVG.',
  section: 'Sketch',
  tags: ['sketch', 'animated'],
  docs: ['repo/blog/sketch.md', 'repo/docs/tour/style.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
