// galacean example: Particle start speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle start speed",
  summary:
    "Three streams launched at startSpeed 0.8, 2.5 and a random 1 to 4, so the fountains reach different heights. A slider sets the middle speed in the full view.",
  section: "Particle",
  tags: ['main.startSpeed', 'ParticleCompositeCurve'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
