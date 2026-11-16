// aframe example: 360 gallery guide: a link from an empty entity, geometry and material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '360 gallery guide: a link from an empty entity, geometry and material',
  summary:
    'Using standard components: an empty entity renders nothing, geometry makes it a plane, and a flat material with src pointing at a thumbnail in <a-assets> textures it. The guide\'s click sound is left out.',
  section: 'Guides',
  tags: ['geometry', 'material', 'shader: flat', 'src', 'selector', 'a-entity'],
  docs: ['repo/docs/guides/building-a-360-image-gallery.md', 'repo/docs/components/geometry.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
