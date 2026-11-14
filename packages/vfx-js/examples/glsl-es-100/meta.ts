// VFX-JS example: running a GLSL ES 1.0 shader with glslVersion "100"
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GLSL ES 1.0 shaders',
  summary:
    'Shaders are GLSL ES 3.0 by default, but older ones written with gl_FragColor and texture2D still run. VFX-JS detects them from those words, or you can say so with glslVersion: "100". This one sends ripples out from the centre of the picture.',
  section: 'Custom Shaders',
  tags: ['glslVersion', 'GLSL ES 1.0', 'gl_FragColor', 'texture2D'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
