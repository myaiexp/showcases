// zephyr3d example: Terrain from a height map image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Terrain from a height map image",
  summary:
    "ClipmapTerrain renders ground from a height map: heightMap takes a texture loaded linear, setSize sets the covered area, and the node's Y scale sets the height. worldRegion reads back the covered rectangle; wireframe shows the clipmap rings.",
  section: "Environment",
  tags: ['ClipmapTerrain', 'heightMap', 'setSize', 'worldRegion', 'wireframe', 'linearColorSpace', 'clipMapTileSize'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
