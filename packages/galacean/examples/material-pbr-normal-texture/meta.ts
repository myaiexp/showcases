// galacean example: PBR normal texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR normal texture",
  summary: "A painted dome-bump normal map on four spheres at normalTextureIntensity 0, 0.5, 1 and 2: the bumps appear and sharpen under the same light with no geometry change.",
  section: "Material",
  tags: ['PBRMaterial','normalTexture','normalTextureIntensity','tilingOffset'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
