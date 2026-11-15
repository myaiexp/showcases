// force-graph example: Render control: onRenderFramePost
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: onRenderFramePost',
  summary:
    'onRenderFramePost paints after everything else: a pulsing ring on the selected node, and a colour legend fixed to the corner of the canvas by turning screen coordinates into graph ones with screen2GraphCoords.',
  section: 'Render control',
  tags: ['onRenderFramePost', 'screen2GraphCoords', 'onNodeClick', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
