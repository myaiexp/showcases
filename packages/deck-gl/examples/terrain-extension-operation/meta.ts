// deck-gl example: TerrainExtension terrain operation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TerrainExtension terrain operation',
  summary:
    "A TerrainLayer with operation 'terrain+draw' is drawn and also shapes the layers using TerrainExtension; with 'terrain' it only supplies the surface, and the draped graticule appears alone, bent over the hills.",
  section: 'Extensions',
  tags: ['TerrainExtension', 'operation', 'TerrainLayer', 'terrainDrawMode'],
  docs: [
    'repo/docs/api-reference/extensions/terrain-extension.md',
    'repo/docs/api-reference/geo-layers/terrain-layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
