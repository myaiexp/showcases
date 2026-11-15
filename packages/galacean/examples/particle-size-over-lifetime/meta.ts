// galacean example: Particle size over lifetime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle size over lifetime",
  summary:
    "sizeOverLifetime.size set to curves: grow then shrink, shrink to nothing and grow steadily, one stream each.",
  section: "Particle",
  tags: ['sizeOverLifetime', 'ParticleCurve', 'CurveKey'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
