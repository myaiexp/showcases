// force-graph example: Node styling: images as nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: images as nodes',
  summary:
    'In replace mode nodeCanvasObject can paint anything, including pictures. The badges are drawn once on a canvas, turned into data-URL images and painted per node with drawImage; nodePointerAreaPaint gives each a round hover area.',
  section: 'Node styling',
  tags: ['nodeCanvasObject', 'nodeCanvasObjectMode', 'nodePointerAreaPaint', 'onNodeHover', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
