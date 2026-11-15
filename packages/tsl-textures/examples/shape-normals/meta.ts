// tsl-textures example: Shape normals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape normals',
  summary:
    'The same rotator() twist on positionNode, once alone and once with rotator.normal() on normalNode. Without it the moved vertices keep their old normals, so the light does not follow the new surface.',
  section: 'Shape textures',
  tags: ['rotator', 'normalNode', 'positionNode', 'tangents'],
  docs: ['repo/docs/rotator.md', 'repo/src/rotator.js', 'repo/docs/grid.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
