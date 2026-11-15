// zephyr3d example: Panorama to cube map in rgba16f
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Panorama to cube map in rgba16f",
  summary:
    "panoramaToCubemap() renders an equirectangular texture into an rgba16f cube map used as the skybox. The panorama has a sun far above 1, so toggling tone mapping shows why the cube map is half float.",
  section: "Environment",
  tags: ['panoramaToCubemap', 'createCubeTexture', 'rgba16f', 'skyboxTexture', 'toneMap', 'toneMapExposure'],
  docs: ['repo/apps/doc/web/en/sky.md', 'repo/apps/doc/src/tut-33/main.js', 'repo/apps/doc/web/en/posteffect-tonemap.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
