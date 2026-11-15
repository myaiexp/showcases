// galacean example: Shadow bias, normal bias and near plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow bias, normal bias and near plane",
  summary:
    "The bias parameters that stop shadow distortion: with the sun low over a plain floor, too little shadowBias leaves a stripy acne and too much lifts the shadow off its caster. The card sweeps shadowBias; sliders cover normal bias and near plane.",
  section: "Light",
  tags: ['Light.shadowBias', 'Light.shadowNormalBias', 'Light.shadowNearPlane', 'DirectLight.shadowNearPlaneOffset'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
