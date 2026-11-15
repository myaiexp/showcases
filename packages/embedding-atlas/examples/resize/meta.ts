// embedding-atlas example: resizing an EmbeddingView through width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resizing',
  summary:
    'The view is exactly width × height CSS pixels and never measures its container, so a resize is view.update({ width, height }). The sliders do that; the dashed outline is the target element.',
  section: 'EmbeddingView',
  tags: ['width', 'height', 'update'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
