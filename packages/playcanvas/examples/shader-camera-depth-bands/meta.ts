// playcanvas example: Built-in matrix_view and camera_params
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Built-in uniforms: matrix_view and camera_params',
  summary:
    'matrix_view turns a world position into a view-space depth, and camera_params carries 1/far, far, near and the orthographic flag. Boxes on a floor are striped by view depth and tinted from the near plane to the far plane; the full view moves the far clip and switches the camera to orthographic.',
  section: 'Graphics: Shaders',
  tags: ['matrix_view', 'camera_params', 'farClip', 'PROJECTION_ORTHOGRAPHIC', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/built-in-uniforms.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
