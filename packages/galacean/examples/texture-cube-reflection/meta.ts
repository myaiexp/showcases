// galacean example: Cube texture sampled by direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cube texture sampled by direction",
  summary:
    "A cube texture is sampled with a 3D direction, not a UV. A tiny shader reflects the view ray off a sphere and a torus and looks the result up in the same TextureCube that paints the skybox behind them.",
  section: "Texture",
  tags: ['TextureCube', 'setImageSource', 'TextureCubeFace', 'Shader', 'samplerCube'],
  docs: [
    'repo/docs/en/graphics/texture/cube.mdx',
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
