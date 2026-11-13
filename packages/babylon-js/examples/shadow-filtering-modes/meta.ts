// babylon-js example: shadow filtering modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow filtering modes',
  summary:
    'A SpotLight with one ShadowGenerator casts the shadows of a torus knot, a sphere and a post. Step through no filter, Poisson sampling, exponential, blur exponential and close exponential shadow maps, PCF and PCSS contact hardening on the same scene.',
  section: 'Lights',
  tags: ['ShadowGenerator', 'usePoissonSampling', 'useBlurExponentialShadowMap', 'usePercentageCloserFiltering', 'useContactHardeningShadow', 'shadowMinZ'],
  docs: [
    'repo/content/features/featuresDeepDive/lights/shadows.md',
    'repo/content/features/introductionToFeatures/chap7/shadows.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
