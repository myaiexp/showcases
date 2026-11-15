// zephyr3d example: Physical rect light and emissive luminance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physical rect light and emissive luminance',
  summary:
    'In physical mode a RectLight is a luminance in cd/m2 (luminance), and a material\'s emissiveLuminance is in nits as long as emissiveExposureWeight is 1; at 0, exposure cancels out and it is only a display-referred multiplier. Raise the camera ISO to see which parts follow exposure.',
  section: 'Lighting',
  tags: ['scene.lightingMode', 'RectLight.luminance', 'emissiveLuminance', 'emissiveExposureWeight', 'camera.ISO'],
  docs: ['repo/apps/doc/web/en/lighting-physical.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
