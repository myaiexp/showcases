// playcanvas example: Uniform arrays and textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Uniform arrays and textures in GLSL and WGSL',
  summary:
    'A vec3 array and a float array uniform plus a texture, declared with GLSL syntax and with the reflected WGSL syntax (no @group or @binding, a texture followed by its sampler, f32 array items read as .element). Arrays are set again as a whole with setParameter; the full view edits the four weights.',
  section: 'Graphics: Shaders',
  tags: ['uniform arrays', 'texture_2d', 'sampler', 'Material.setParameter', 'ShaderMaterial', 'wgsl reflection'],
  docs: [
    'repo/docs/user-manual/graphics/shaders/wgsl-reflection.md',
    'repo/docs/user-manual/graphics/shaders/shader-parameters.md',
    'repo/docs/user-manual/graphics/shaders/glsl-specifics.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
