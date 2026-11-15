// force-graph example: Link styling: linkCanvasObject
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkCanvasObject',
  summary:
    'linkCanvasObject in replace mode hands each link to your own painter instead of drawing the default line. This one draws a tapered wedge, a double line or a gradient between the two node colours, with widths divided by the zoom.',
  section: 'Link styling',
  tags: ['linkCanvasObject', 'linkCanvasObjectMode', 'nodeColor', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
