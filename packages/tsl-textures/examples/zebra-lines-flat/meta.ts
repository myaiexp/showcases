// tsl-textures example: Zebra lines on a plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zebra lines on a plane',
  summary:
    'zebraLines() with the documented secret flag flat set to 1 on a plane: the same lines, drawn around an axis on a flat surface. The flag is a live toggle; switching it off shows the sphere layout on a plane.',
  section: 'Textures',
  tags: ['zebraLines', 'colorNode', 'flat', 'plane'],
  docs: ['repo/docs/zebra-lines.md', 'repo/src/zebra-lines.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
