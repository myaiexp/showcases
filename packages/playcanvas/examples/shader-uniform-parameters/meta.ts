// playcanvas example: Shader uniforms with setParameter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shader uniforms with setParameter',
  summary:
    'Material.setParameter feeds a float, an int, a vec2 and a vec3 (as arrays of numbers) to the uniforms a fragment shader declares, for every mesh using the material. The full view edits the tint, the scroll speed, the edge sharpness and the stripe count live.',
  section: 'Graphics: Shaders',
  tags: ['Material.setParameter', 'ShaderMaterial', 'uniform'],
  docs: ['repo/docs/user-manual/graphics/shaders/shader-parameters.md', 'repo/docs/user-manual/graphics/shaders/glsl-specifics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
