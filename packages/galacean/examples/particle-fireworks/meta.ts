// galacean example: Particle fireworks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle fireworks",
  summary:
    "Two shells that each release a Burst of 60 particles from a tiny SphereShape, one delayed by startDelay, with gravity and a colour gradient that fades out. A button relaunches them in the full view.",
  section: "Particle",
  tags: ['Burst', 'SphereShape', 'startDelay', 'gravityModifier', 'colorOverLifetime'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
