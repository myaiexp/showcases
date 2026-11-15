// 3d-force-graph example: Link styling: linkMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkMaterial',
  summary:
    'linkMaterial returns a three.js material to use instead of the default for a link, by attribute or function. Each relation type here gets its own: a normal-shaded rainbow, flat basic colour, an emissive phong, and a wireframe. A falsy return keeps the default.',
  section: 'Link styling',
  tags: ['linkMaterial', 'linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
