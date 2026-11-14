// VFX-JS example: the minimal custom fragment shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The GLSL template',
  summary:
    'Pass your own GLSL fragment shader as shader and VFX-JS runs it over the element\'s box every frame. uv = (gl_FragCoord.xy - offset) / resolution gives element space, (0, 0) bottom-left; this one shifts each row sideways by a sine of its height and the time.',
  section: 'Custom Shaders',
  tags: ['shader', 'GLSL', 'uv', 'resolution', 'offset', 'time'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
