// galacean example: Particle start delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle start delay",
  summary:
    "main.startDelay holds emission back after play(): the caption counts the wait and the emission, and the card replays the effect. A slider sets the delay in the full view.",
  section: "Particle",
  tags: ['main.startDelay', 'ParticleCompositeCurve'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
