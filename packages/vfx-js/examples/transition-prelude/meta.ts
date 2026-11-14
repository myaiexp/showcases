// VFX-JS example: What the prelude gives a shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "What the prelude gives a shader",
  summary:
    "VFX-JS wraps your frag with a prelude: readFrom(p) and readTo(p) for the old and new content (they swap when reverse is true), inRange(p), the eased t, resolution (element size in physical px) and time. This Iris uses resolution for a round edge, time for the ripple and the reverse option; the readout names what each run used.",
  section: "Custom transitions",
  tags: ['ShaderTransition', 'readFrom', 'readTo', 'resolution', 'time', 'reverse', 'inRange'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts', 'pages/amagi-dev/vfx-js-transitions/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
