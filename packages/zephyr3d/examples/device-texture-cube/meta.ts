// zephyr3d example: A cube texture with six faces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A cube texture with six faces',
  summary:
    'createCubeTexture makes a texture of six square faces; each CubeFace gets its own update call. The shader declares a texCube and samples it with a direction, here the position on a spinning cube.',
  section: 'Device API',
  tags: ['createCubeTexture', 'CubeFace', 'update', 'texCube', 'textureSample', 'setTexture'],
  docs: ['repo/apps/doc/web/en/texture.md', 'repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
