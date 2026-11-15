// galacean example: Particle max particles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle max particles",
  summary:
    "Three streams at the same emission rate with maxParticles 4, 12 and 100: the cap leaves gaps because new particles wait for a free slot. A slider changes the left cap in the full view.",
  section: "Particle",
  tags: ['main.maxParticles'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
