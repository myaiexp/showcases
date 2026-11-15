// force-graph example: Node styling: animated nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: animated nodes',
  summary:
    'A node painter can use the clock: each node here swells and sends out a fading ring on its own phase. The canvas normally stops redrawing when the layout settles, so autoPauseRedraw(false) keeps the animation running.',
  section: 'Node styling',
  tags: ['nodeCanvasObject', 'nodeCanvasObjectMode', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
