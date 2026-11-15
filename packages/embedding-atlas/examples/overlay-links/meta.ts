// embedding-atlas example: links between clusters drawn in a custom overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overlay links',
  summary:
    'An overlay is free to draw relationships the points cannot show. Curved SVG links join neighbouring topics, and the pair that shares a word gets a heavy one; every update re-projects the endpoints through proxy.location().',
  section: 'Custom Overlay',
  tags: ['customOverlay', 'OverlayProxy', 'proxy.location', 'props'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/types.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
