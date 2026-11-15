// embedding-atlas example: a custom overlay of DOM pins on data coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overlay pins',
  summary:
    'customOverlay mounts a class over the view and hands it a proxy. proxy.location(x, y) turns a data coordinate into a pixel, so each cluster gets a DOM pin that stays put through pans and zooms; the view calls update() with a new proxy whenever the camera moves.',
  section: 'Custom Overlay',
  tags: ['customOverlay', 'OverlayProxy', 'proxy.location', 'proxy.width', 'proxy.height'],
  docs: [
    'repo/packages/docs/embedding-view.md',
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
