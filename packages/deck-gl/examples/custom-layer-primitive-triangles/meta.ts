// deck-gl example: a primitive layer written from scratch with a luma.gl Model
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Primitive layer: instanced triangles from scratch',
  summary:
    'A Layer subclass with its own GLSL: initializeState registers instanced attributes with the AttributeManager and builds a luma.gl Model (a Geometry instanced once per row), the shaders use the project32 and picking modules plus a uniform block, and draw() sets the uniforms and calls model.draw.',
  section: 'Custom layers',
  tags: ['Layer', 'Model', 'Geometry', 'project32', 'picking', 'addInstanced', 'initializeState', 'draw', 'finalizeState'],
  docs: [
    'repo/docs/developer-guide/custom-layers/primitive-layers.md',
    'repo/docs/developer-guide/custom-layers/writing-shaders.md',
    'repo/docs/developer-guide/custom-layers/layer-attributes.md',
    'repo/docs/developer-guide/custom-layers/picking.md',
    'repo/docs/api-reference/core/project.md',
    'repo/docs/api-reference/core/project32.md',
    'repo/docs/api-reference/core/layer.md',
    'repo/docs/api-reference/core/attribute-manager.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
