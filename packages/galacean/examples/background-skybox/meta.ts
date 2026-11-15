// galacean example: Skybox from a cube texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Skybox from a cube texture",
  summary:
    "The docs' skybox recipe with the six faces painted in code: a TextureCube on a SkyBoxMaterial, the cuboid sky mesh and BackgroundMode.Sky. The camera drifts so the whole dusk sky goes past.",
  section: "Background",
  tags: ['Background', 'BackgroundMode.Sky', 'SkyBoxMaterial', 'TextureCube', 'PrimitiveMesh.createCuboid'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
    'repo/docs/en/graphics/texture/cube.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
