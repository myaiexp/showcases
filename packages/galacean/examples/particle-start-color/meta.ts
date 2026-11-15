// galacean example: Particle start colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle start colour",
  summary:
    "main.startColor as a constant colour, a random pick between two constants and a gradient sampled per particle. A colour picker changes the left stream in the full view.",
  section: "Particle",
  tags: ['main.startColor', 'ParticleCompositeGradient', 'ParticleGradient'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
