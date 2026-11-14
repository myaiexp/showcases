// VFX-JS example: ShaderTransition: a wipe in one fragment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderTransition: a wipe in one fragment",
  summary:
    "A transition is a class. Extend ShaderTransition, set a name and a frag that defines vec4 transition(vec2 uv, float t), and turn params into uniforms in uniforms(), which runs every frame. This Wipe mixes readTo and readFrom along x; softness is the width of the soft edge.",
  section: "Custom transitions",
  tags: ['ShaderTransition', 'frag', 'uniforms()', 'readFrom', 'readTo', 'params'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
