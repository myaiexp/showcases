// playcanvas example: Built-in screen_size and viewport_size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Built-in uniforms: screen_size and viewport_size',
  summary:
    'screen_size and viewport_size hold width, height and their inverses in drawing-buffer pixels. A halftone shader reads gl_FragCoord in pixels and maps it to 0..1 with viewport_size.zw, so a screen-aligned dot grid shades a sphere, a cone and a box; the full view sets the cell size.',
  section: 'Graphics: Shaders',
  tags: ['screen_size', 'viewport_size', 'gl_FragCoord', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/built-in-uniforms.md', 'repo/docs/user-manual/graphics/shaders/glsl-specifics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
