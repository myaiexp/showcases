// embedding-atlas example: a coordinate grid overlay built on proxy.location
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overlay grid',
  summary:
    'proxy.location() maps data to pixels; projecting two known points inverts it, so the overlay knows which data range is on screen. It draws grid lines at a round step with their data values, finer as you zoom in. The class is passed bare, with no extra props.',
  section: 'Custom Overlay',
  tags: ['customOverlay', 'OverlayProxy', 'proxy.location', 'proxy.width', 'proxy.height'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/types.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
