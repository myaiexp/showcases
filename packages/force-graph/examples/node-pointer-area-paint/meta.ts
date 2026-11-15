// force-graph example: Interaction: nodePointerAreaPaint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: nodePointerAreaPaint',
  summary:
    'nodePointerAreaPaint paints the invisible shape the pointer tests against. A circle larger than the dot lets the card\'s pointer rest beside a node and still hover it; with the default-sized area the same spot finds nothing.',
  section: 'Interaction',
  tags: ['nodePointerAreaPaint', 'onNodeHover', 'nodeCanvasObject', 'nodeVal'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
