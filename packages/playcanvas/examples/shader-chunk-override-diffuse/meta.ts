// playcanvas example: StandardMaterial diffuse chunk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StandardMaterial chunk override: diffusePS',
  summary:
    'Replacing the diffusePS chunk changes how a StandardMaterial computes its albedo while lighting stays untouched. The override multiplies a 3D checker of world-space cells into material_diffuse, and material.shaderChunksVersion flags the code as written for the running engine release. Shapes bob through the fixed cells; the full view sets the cell density.',
  section: 'Graphics: Shaders',
  tags: ['Material.getShaderChunks', 'diffusePS', 'shaderChunksVersion', 'StandardMaterial', 'dAlbedo'],
  docs: ['repo/docs/user-manual/graphics/shaders/migrations.md', 'repo/docs/user-manual/graphics/shaders/shader-parameters.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
