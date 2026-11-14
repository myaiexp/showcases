// observable-plot example: Stack: offset and streamgraphs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: offset and streamgraphs',
  summary:
    'The offset option moves the stack baseline: null keeps zero, center centers each stack, and wiggle minimizes apparent movement for a streamgraph.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'offset'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
