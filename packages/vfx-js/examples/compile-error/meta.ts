// VFX-JS example: catching a shader compile error from vfx.add
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When a shader fails to compile',
  summary:
    'A shader that does not compile makes vfx.add reject, with the GL error log and the full source in the error. This one assigns a vec4 to a vec3; the example catches the rejection and prints the error lines.',
  section: 'Custom Shaders',
  tags: ['compile error', 'vfx.add', 'reject', 'debugging'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
