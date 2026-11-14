// VFX-JS example: the animated sepia post effect with a custom uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom post effect with uniforms',
  summary:
    'A post effect can be your own GLSL with its own uniforms. This one, from the post effect guide, mixes the whole canvas towards sepia by intensity × a pulse of time. In a post effect src is the whole canvas, offset is 0, and time counts from when the VFX started.',
  section: 'Post effects',
  tags: ['postEffect', 'uniforms', 'sepia', 'time'],
  docs: ['repo/docs/POSTEFFECT_EXAMPLE.md', 'pages/amagi-dev/vfx-js/shaders.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
