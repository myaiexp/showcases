// galacean example: Particle box shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle box shape",
  summary:
    "BoxShape emits from inside a box and along its +Z; its size changes over time, with sliders for the x and z size in the full view.",
  section: "Particle",
  tags: ['BoxShape', 'emission.shape'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
