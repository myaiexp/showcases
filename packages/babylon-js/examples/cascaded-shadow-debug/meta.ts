// babylon-js example: cascaded shadow maps with debug cascades
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cascaded shadow maps with debug cascades',
  summary:
    'A directional light and a CascadedShadowGenerator shadow two rows of pillars receding from the camera. The debug flag paints each cascade, and controls change numCascades, lambda, cascadeBlendPercentage, shadowMaxZ and stabilizeCascades.',
  section: 'Lights',
  tags: ['CascadedShadowGenerator', 'numCascades', 'lambda', 'cascadeBlendPercentage', 'stabilizeCascades', 'DirectionalLight'],
  docs: [
    'repo/content/features/featuresDeepDive/lights/shadows_csm.md',
    'repo/content/features/featuresDeepDive/lights/shadows.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
