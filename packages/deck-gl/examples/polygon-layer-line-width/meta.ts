// deck-gl example: PolygonLayer outline width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PolygonLayer outline width',
  summary:
    'Outline width of stroked polygons in meters, common units or pixels, multiplied by lineWidthScale and clamped by lineWidthMinPixels and lineWidthMaxPixels as you zoom.',
  section: 'Core layers',
  tags: ['PolygonLayer', 'getLineWidth', 'lineWidthUnits', 'lineWidthScale', 'lineWidthMinPixels', 'lineWidthMaxPixels'],
  docs: [
    'repo/docs/api-reference/layers/polygon-layer.md',
    'repo/docs/developer-guide/coordinate-systems.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
