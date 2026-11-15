// embedding-atlas example: SVG convex hulls drawn in a custom overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overlay hulls',
  summary:
    'An SVG layer in customOverlay outlines every topic with a dashed convex hull in its category colour. The hulls are computed once in data coordinates and re-projected through proxy.location() each time the overlay updates.',
  section: 'Custom Overlay',
  tags: ['customOverlay', 'OverlayProxy', 'proxy.location', 'defaultCategoryColors'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
    'repo/packages/component/src/lib/index.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
