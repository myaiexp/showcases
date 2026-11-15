// galacean example: Particle emission rate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle emission rate",
  summary:
    "emission.rateOverTime as a constant of 6, a constant of 30 and a curve that ramps from 0 to 40 over a four second duration. A slider sets the middle rate in the full view.",
  section: "Particle",
  tags: ['emission.rateOverTime', 'ParticleCompositeCurve'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
