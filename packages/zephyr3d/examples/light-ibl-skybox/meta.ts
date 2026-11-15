// zephyr3d example: IBL from an HDR skybox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'IBL from an HDR skybox',
  summary:
    'An HDR panorama (a sunset encoded as a Radiance .hdr in code) is loaded with fetchTexture, converted with panoramaToCubemap into an rgba16f cube map, set as the skybox and used for image-based lighting on metal spheres of rising roughness.',
  section: 'Lighting',
  tags: ['panoramaToCubemap', 'createCubeTexture', 'env.sky.skyboxTexture', 'skyType skybox', 'env.light.type', 'ibl', 'fetchTexture'],
  docs: ['repo/apps/doc/web/en/lighting-indirect.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
