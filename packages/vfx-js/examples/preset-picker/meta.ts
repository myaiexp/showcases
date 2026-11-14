// VFX-JS example: a picker over every shader preset that needs no uniforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every preset on one picture',
  summary:
    'The thirteen shader presets that need no uniforms, one after another on the same poster. Changing the shader means vfx.remove and vfx.add again; add is async, so each swap waits for the previous add to finish before removing.',
  section: 'Shader presets',
  tags: ['ShaderPreset', 'vfx.add', 'vfx.remove', 'shader preset'],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'pages/amagi-dev/vfx-js/getting-started.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
