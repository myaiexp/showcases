// galacean example: Particle rotation over lifetime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle rotation over lifetime",
  summary:
    "rotationOverLifetime.rotationZ as no spin, a constant 180 degrees per second and a curve ramping to 540, on arrow particles. A slider sets the middle spin in the full view.",
  section: "Particle",
  tags: ['rotationOverLifetime', 'rotationZ'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-rotation-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
