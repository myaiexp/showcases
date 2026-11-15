// zephyr3d example: Screen-space global illumination
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Screen-space global illumination',
  summary:
    'A white room with a red and a green wall: with IBL ambient and camera.SSGI, light bouncing off the walls tints the white box and ball. The three quality presets, ssgiIntensity and ssgiSkyOcclusion are live.',
  section: 'Post-processing',
  tags: ['SSGI', 'ssgiQualityPreset', 'ssgiIntensity', 'ssgiSkyOcclusion', 'env.light'],
  docs: ['repo/apps/doc/web/en/posteffect-ssgi.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
