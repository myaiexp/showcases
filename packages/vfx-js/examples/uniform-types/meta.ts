// VFX-JS example: how JS uniform values map to GLSL types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Uniform types',
  summary:
    'A number arrives as a float, an array of 2, 3 or 4 numbers as a vec2, vec3 or vec4, and a Float32Array as a GLSL array: sixteen floats fill uniform vec4 bands[4], which tints four bands of the picture. Booleans are not supported; use 0 and 1.',
  section: 'Custom Shaders',
  tags: ['uniforms', 'float', 'vec2', 'vec3', 'vec4', 'Float32Array', 'arrays'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
