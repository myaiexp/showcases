// zephyr3d example: Skybox from a cube map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Skybox from a cube map",
  summary:
    "scene.env.sky.skyType = 'skybox' with a cube map as skyboxTexture. The six faces are painted into a createCubeTexture() in code, height fog is off, and the image-based light reflects the same sky in three metal spheres.",
  section: "Environment",
  tags: ['skyType', 'skyboxTexture', 'fogType', 'createCubeTexture', 'TextureCube', 'env.light'],
  docs: ['repo/apps/doc/web/en/sky.md', 'repo/apps/doc/src/tut-32/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
