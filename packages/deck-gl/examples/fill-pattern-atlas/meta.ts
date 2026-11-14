// deck-gl example: FillStyleExtension pattern atlas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FillStyleExtension pattern atlas',
  summary:
    'FillStyleExtension tiles polygons with sprites from fillPatternAtlas, picked by name through fillPatternMapping and getFillPattern. The atlas is drawn on a canvas; fillPatternEnabled turns the pattern off.',
  section: 'Extensions',
  tags: ['FillStyleExtension', 'fillPatternAtlas', 'fillPatternMapping', 'getFillPattern', 'fillPatternEnabled', 'PolygonLayer'],
  docs: [
    'repo/docs/api-reference/extensions/fill-style-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
