// aframe example: Minecraft guide: the random-color component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minecraft guide: the random-color component',
  summary:
    'The guide\'s random-color component sets the material colour to a random hex string in init, with dependencies: [\'material\'] so material exists first. It works on a box entity, a sphere and a cone; the button re-attaches it.',
  section: 'Guides',
  tags: ['registerComponent', 'dependencies', 'init', 'setAttribute', 'material.color'],
  docs: ['repo/docs/guides/building-a-minecraft-demo.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
