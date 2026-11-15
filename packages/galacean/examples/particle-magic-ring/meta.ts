// galacean example: Particle magic ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle magic ring",
  summary:
    "A glowing ring: CircleShape with ParticleShapeArcMode.Loop so emission sweeps round the circle, a gentle upward speed and size and colour curves. A slider sets arcSpeed in the full view.",
  section: "Particle",
  tags: ['CircleShape', 'ParticleShapeArcMode.Loop', 'arcSpeed', 'colorOverLifetime'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
