// galacean example: Particle colour over lifetime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle colour over lifetime",
  summary:
    "colorOverLifetime.color as a ParticleGradient with three colour keys and four alpha keys: yellow to red to blue, fading in and out. A checkbox toggles the module in the full view.",
  section: "Particle",
  tags: ['colorOverLifetime', 'ParticleGradient', 'GradientColorKey', 'GradientAlphaKey'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
