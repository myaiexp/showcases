// galacean example: Particle two gradients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle two gradients",
  summary:
    "A ParticleCompositeGradient built from two gradients: every particle takes a random blend between them as it ages.",
  section: "Particle",
  tags: ['ParticleCompositeGradient', 'colorOverLifetime', 'gradientMin', 'gradientMax'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
