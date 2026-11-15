// embedding-atlas example: pixelRatio side by side at 0.5, 1 and 2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pixel ratio',
  summary:
    'pixelRatio sets how many canvas pixels the view draws per CSS pixel (it defaults to 2). Three copies zoomed into one cluster show 0.5 going soft, 1 matching a standard screen and 2 staying sharp on high-density displays.',
  section: 'EmbeddingView',
  tags: ['pixelRatio', 'width', 'height', 'viewportState'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
