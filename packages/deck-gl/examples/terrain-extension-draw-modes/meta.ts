// deck-gl example: TerrainExtension draw modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TerrainExtension draw modes',
  summary:
    'TerrainExtension fits 2D layers to a terrain source. A trail either drapes onto the surface as a texture or is lifted vertex by vertex (terrainDrawMode); waypoints sit on the surface in offset mode.',
  section: 'Extensions',
  tags: ['TerrainExtension', 'terrainDrawMode', 'operation', 'TerrainLayer'],
  docs: [
    'repo/docs/api-reference/extensions/terrain-extension.md',
    'repo/docs/api-reference/geo-layers/terrain-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
