// Three.js example: SpotLight angle, penumbra, distance and decay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spot light angle, penumbra and decay',
  summary:
    'A SpotLight over a floor with its SpotLightHelper cone. Sliders drive angle, penumbra, distance, decay and intensity, and the target can wander on its own or be placed by hand.',
  section: 'Fundamentals',
  tags: ['SpotLight', 'SpotLightHelper', 'angle', 'penumbra', 'decay', 'target'],
  docs: [
    'repo/manual/pages/lights.html',
    'repo/docs/pages/SpotLight.html.md',
    'repo/docs/pages/SpotLightHelper.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
