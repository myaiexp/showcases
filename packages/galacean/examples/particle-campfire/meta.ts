// galacean example: Particle campfire
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle campfire",
  summary:
    "Three ParticleRenderers combined: additive flames from a cone, normal-blended smoke that grows and fades, and a few embers with slight negative gravity. A checkbox hides the smoke in the full view.",
  section: "Particle",
  tags: ['ParticleRenderer', 'ParticleMaterial.blendMode', 'ConeShape', 'gravityModifier'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
