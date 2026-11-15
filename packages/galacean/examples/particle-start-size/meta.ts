// galacean example: Particle start size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle start size",
  summary:
    "startSize as a random range on the left, and startSize3D with separate startSizeX and startSizeY on the right, which makes tall narrow particles. Sliders set the axes in the full view.",
  section: "Particle",
  tags: ['main.startSize', 'main.startSize3D', 'startSizeX', 'startSizeY'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
