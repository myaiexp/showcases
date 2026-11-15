// zephyr3d example: Physical point and spot lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physical point and spot lights',
  summary:
    'In physical lighting mode a PointLight is authored in lumens (luminousPower) and shaded in candela (luminousIntensity), and a SpotLight takes real half-angles innerConeAngle and outerConeAngle in radians instead of the legacy cutoff cosine. The readout shows the lumen-candela conversion.',
  section: 'Lighting',
  tags: ['scene.lightingMode', 'PointLight.luminousPower', 'PointLight.luminousIntensity', 'SpotLight.luminousIntensity', 'innerConeAngle', 'outerConeAngle'],
  docs: ['repo/apps/doc/web/en/lighting-physical.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
