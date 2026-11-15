// tsl-textures example: Polka dots on a plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polka dots on a plane',
  summary:
    'polkaDots() with the documented secret flag flat set to 1 on a plane: a square lattice of dots for a flat surface instead of the Fibonacci lattice the sphere layout uses. The flag is a live toggle; switching it off shows how the sphere layout stretches over a plane.',
  section: 'Textures',
  tags: ['polkaDots', 'colorNode', 'flat', 'plane'],
  docs: ['repo/docs/polka-dots.md', 'repo/src/polka-dots.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
