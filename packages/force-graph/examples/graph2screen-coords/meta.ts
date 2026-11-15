// force-graph example: Utility: graph2ScreenCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utility: graph2ScreenCoords',
  summary:
    'graph2ScreenCoords gives the pixel of a node. HTML name chips above the canvas are moved to it on every frame by onRenderFramePost, so they follow the nodes through layout, drags, pans and zooms.',
  section: 'Utility',
  tags: ['graph2ScreenCoords', 'onRenderFramePost', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
