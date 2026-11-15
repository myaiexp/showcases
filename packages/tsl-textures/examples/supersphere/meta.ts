// tsl-textures example: Supersphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Supersphere',
  summary:
    'supersphere() on positionNode and supersphere.normal() on normalNode: one exponent morphs a sphere into a pinched star (below 1), back to a ball (1) or towards a rounded cube (above 1).',
  section: 'Shape textures',
  tags: ['supersphere', 'positionNode', 'normalNode', 'exponent'],
  docs: ['repo/docs/supersphere.md', 'repo/src/supersphere.js', 'repo/index.html', 'repo/docs/grid.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
