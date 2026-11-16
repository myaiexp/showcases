// aframe example: Minecraft guide: a thin cylinder as the ground, texture through a-assets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minecraft guide: a thin cylinder as the ground, texture through a-assets',
  summary:
    'The guide\'s first steps: a 32 metre radius, 0.1 metre high <a-cylinder> as the ground (better for raycasters than a plane), its texture preloaded as an <img> in <a-assets>.',
  section: 'Guides',
  tags: ['a-cylinder', 'a-assets', 'img', 'src', 'radius', 'height'],
  docs: ['repo/docs/guides/building-a-minecraft-demo.md', 'repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
