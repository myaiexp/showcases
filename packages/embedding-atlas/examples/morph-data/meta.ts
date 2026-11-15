// embedding-atlas example: animating points by updating data each frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Morphing data',
  summary:
    'data can change after mount: every animation frame passes new x and y Float32Arrays through view.update({ data }), easing thirty thousand points from their topic blobs out to the spokes of a wheel and back. The viewport is pinned so the camera does not refit.',
  section: 'EmbeddingView',
  tags: ['update', 'data', 'viewportState'],
  docs: ['repo/packages/docs/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/embedding_view_api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
