// zephyr3d example: Terrain debug outputs and wireframe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Terrain debug outputs and wireframe",
  summary:
    "material.debugMode shows vertex_normal, detail_normal, tangent, uv, bitangent or albedo instead of the lit surface (the TerrainDebugMode list); terrain.wireframe draws the clipmap rings.",
  section: "Environment",
  tags: ['debugMode', 'TerrainDebugMode', 'wireframe', 'ClipmapTerrain'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
