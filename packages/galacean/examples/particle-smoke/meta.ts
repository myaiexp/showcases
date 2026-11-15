// galacean example: Particle smoke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle smoke",
  summary:
    "Smoke puffs with normal blending, size growing from 0.5 to 2.4, alpha fading in and out, random start rotation and spin, and a sideways velocityOverLifetime drift. A slider sets the drift in the full view.",
  section: "Particle",
  tags: ['ParticleMaterial.blendMode', 'sizeOverLifetime', 'rotationOverLifetime', 'velocityOverLifetime'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
    'repo/docs/en/graphics/particle/renderer-rotation-module.mdx',
    'repo/docs/en/graphics/particle/renderer-velocity-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
