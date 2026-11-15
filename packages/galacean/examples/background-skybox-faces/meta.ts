// galacean example: Skybox face order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Skybox face order",
  summary:
    "A skybox whose six faces are labelled px, nx, py, ny, pz, nz, the order the docs list the face images in. The camera turns on the spot so each face comes into view; the engine inverts x for cube textures, so px lands on the world -X side.",
  section: "Background",
  tags: ['SkyBoxMaterial', 'TextureCube', 'TextureCubeFace', 'setImageSource'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
    'repo/docs/en/graphics/texture/cube.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
