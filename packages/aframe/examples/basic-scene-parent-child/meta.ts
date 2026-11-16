// aframe example: Guide: parent and child transforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guide: parent and child transforms',
  summary:
    'A sphere nested in a rotated, stretched box inherits all three transforms. The board prints the sphere\'s local and world positions while the parent moves, via animation or a slider.',
  section: 'Guides',
  tags: ['parent-child', 'position', 'rotation', 'scale', 'getWorldPosition', 'animation'],
  docs: ['repo/docs/guides/building-a-basic-scene.md', 'repo/docs/introduction/developing-with-threejs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
