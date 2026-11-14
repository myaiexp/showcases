// playcanvas example: Parameter precedence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parameter precedence: instance, material, global',
  summary:
    'The same uniform set in three places: on the scope of the graphics device, on the material, and on one mesh instance. Per draw the mesh instance value wins over the material value, which wins over the global one; toggling each layer shows which sphere reads which.',
  section: 'Graphics: Shaders',
  tags: ['Material.setParameter', 'Material.deleteParameter', 'MeshInstance.setParameter', 'scope.resolve', 'ScopeId.setValue'],
  docs: ['repo/docs/user-manual/graphics/shaders/shader-parameters.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
