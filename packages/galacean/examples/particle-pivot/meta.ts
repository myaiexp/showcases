// galacean example: Particle pivot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle pivot",
  summary:
    "ParticleRenderer.pivot moves each particle quad against its centre, so rotation over lifetime swings the arrows around a point on the edge instead of their middle. Sliders move the pivot in the full view.",
  section: "Particle",
  tags: ['ParticleRenderer.pivot', 'rotationOverLifetime'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
    'repo/docs/en/graphics/particle/renderer-rotation-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
