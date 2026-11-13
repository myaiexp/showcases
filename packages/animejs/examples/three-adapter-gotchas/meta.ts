// Adapters example: shared materials, the transparent flag and group fades with the Three.js adapter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: shared materials, transparent and group fades',
  summary: 'Four columns of meshes show the adapter gotchas: fading one of two meshes that share a material fades both while a cloned material fades one, opacity does nothing visible without transparent: true, and a Group only fades when its children are passed as the target array.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'opacity', 'transparent', 'material.clone', 'Group', 'gotchas'],
  docs: [
    'pages/animejs-com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
