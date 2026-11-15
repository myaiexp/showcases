// galacean example: Which light casts: scene.sun
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Which light casts: scene.sun",
  summary:
    "Only one DirectLight can cast shadows. With two in the scene, scene.sun names the main one; the card hands the role back and forth and the shadow direction flips with it.",
  section: "Light",
  tags: ['scene.sun', 'DirectLight', 'shadowType'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
    'repo/docs/en/graphics/light/directional.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
