// galacean example: Particle start lifetime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle start lifetime",
  summary:
    "Three streams whose startLifetime is a constant, a random range between two constants and a curve over the generator time. Sliders change the constants in the full view.",
  section: "Particle",
  tags: ['main.startLifetime', 'ParticleCompositeCurve', 'ParticleCurveMode'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
