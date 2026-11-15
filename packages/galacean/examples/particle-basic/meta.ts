// galacean example: Particle renderer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle renderer basics",
  summary:
    "A ParticleRenderer added to an entity with a ParticleMaterial: a soft-dot baseTexture and a baseColor, all other settings at the engine defaults except the size. The full view has a colour picker.",
  section: "Particle",
  tags: ['ParticleRenderer', 'ParticleMaterial', 'baseTexture', 'baseColor'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
