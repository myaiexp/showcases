// playcanvas example: Built-in view_position uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Built-in uniforms: view_position rim light',
  summary:
    'The engine supplies view_position (the camera in world space), matrix_viewProjection, matrix_model and matrix_normal to forward shaders, so a ShaderMaterial only declares them. A fresnel rim computed from view_position keeps glowing at the silhouette while the camera orbits.',
  section: 'Graphics: Shaders',
  tags: ['view_position', 'matrix_viewProjection', 'matrix_model', 'matrix_normal', 'SEMANTIC_NORMAL', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/built-in-uniforms.md', 'repo/docs/user-manual/graphics/shaders/glsl-specifics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
