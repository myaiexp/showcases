// playcanvas example: Multi-draw terrain patches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multi-draw terrain patches',
  summary:
    'Sixty-four terrain patches are combined into one Mesh and drawn through a single MeshInstance. setMultiDraw() allocates the draw commands, and every frame the patches within reach of a moving marker are added with cmd.add() and finalised with cmd.update(count), so culled patches cost nothing. The full view tunes the radius and reads supportsMultiDraw.',
  section: 'Graphics: Advanced Rendering',
  tags: ['setMultiDraw', 'DrawCommands', 'supportsMultiDraw', 'MeshInstance', 'Mesh', 'setIndices', 'calculateNormals'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/multi-draw.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
