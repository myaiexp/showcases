// playcanvas example: Mesh instances without entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mesh instances without entities',
  summary:
    'A MeshInstance needs a mesh, a material and a GraphNode, and layer.addMeshInstances() puts it in the normal rendering of that layer, with lighting and shadows. Nine shapes and a ground draw with no entities or render components; the full view removes and re-adds the same instances and toggles castShadows.',
  section: 'Graphics: Advanced Rendering',
  tags: ['MeshInstance', 'GraphNode', 'Layer', 'addMeshInstances', 'removeMeshInstances', 'castShadows', 'Mesh'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/rendering-without-entities.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
