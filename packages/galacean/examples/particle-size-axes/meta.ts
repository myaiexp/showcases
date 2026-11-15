// galacean example: Particle size per axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle size per axis",
  summary:
    "With sizeOverLifetime.separateAxes on, sizeX shrinks while sizeY grows, so particles stretch into tall slivers. A checkbox switches it off in the full view.",
  section: "Particle",
  tags: ['sizeOverLifetime.separateAxes', 'sizeX', 'sizeY'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
