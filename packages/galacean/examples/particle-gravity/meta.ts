// galacean example: Particle gravity modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle gravity modifier",
  summary:
    "main.gravityModifier at 0.3, 0.1 and -0.1: positive values pull the arcs down, negative lift them up. The middle value swings in the card and has a slider in the full view.",
  section: "Particle",
  tags: ['main.gravityModifier'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
