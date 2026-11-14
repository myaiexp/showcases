// playcanvas example: Textures in a custom shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Textures in a custom shader',
  summary:
    'A canvas-drawn pc.Texture is handed to a sampler2D uniform with setParameter, and the fragment shader samples it with its own tiling and offset uniforms. The full view changes the tiling, scrolls the texture and switches the texture addressing between repeat, clamp and mirror.',
  section: 'Graphics: Shaders',
  tags: ['sampler2D', 'Material.setParameter', 'Texture', 'texture2D', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/shader-parameters.md', 'repo/docs/user-manual/graphics/shaders/glsl-specifics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
