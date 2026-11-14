// playcanvas example: Vertex attributes in ShaderMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vertex attributes in a ShaderMaterial',
  summary:
    'The attributes map binds each attribute the vertex shader declares (aPosition, aNormal, aUv0) to a SEMANTIC_ stream of the mesh. A 64-segment sphere is pushed along its normals by a travelling wave in the vertex shader, and the varying carries the displacement to the fragment shader as colour.',
  section: 'Graphics: Shaders',
  tags: ['attributes', 'SEMANTIC_POSITION', 'SEMANTIC_NORMAL', 'SEMANTIC_TEXCOORD0', 'varying', 'SphereGeometry'],
  docs: ['repo/docs/user-manual/graphics/shaders/glsl-specifics.md', 'repo/docs/user-manual/graphics/shaders/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
