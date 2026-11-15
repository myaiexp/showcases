// galacean example: Particle velocity over lifetime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle velocity over lifetime",
  summary:
    "velocityOverLifetime adds sideways motion to fountains: none, a constant velocityX and a curve from 0 to -3 across the life. A slider sets the middle velocity in the full view.",
  section: "Particle",
  tags: ['velocityOverLifetime', 'velocityX', 'ParticleCompositeCurve'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-velocity-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
