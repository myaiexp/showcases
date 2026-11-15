// embedding-atlas example: viewportState driven from code, onViewportState
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport tour',
  summary:
    'viewportState { x, y, scale } is a controlled prop: setting it moves the camera, and onViewportState reports every pan and zoom the reader makes. Buttons ease the viewport from the overview to each cluster, interpolating the scale in log space.',
  section: 'EmbeddingView',
  tags: ['viewportState', 'onViewportState', 'ViewportState', 'update'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/utils.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
