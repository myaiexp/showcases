// VFX-JS example: State lives on the instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State lives on the instance",
  summary:
    "Core builds one instance of a transition class per container, so state kept on this belongs to that container. Two boxes use the same Sweep class here; each instance counts its own runs and flips its own direction every run, so the two boxes drift out of step. Per-run state is set in start(), as a ShaderTransition override.",
  section: "Custom transitions",
  tags: ['ShaderTransition', 'start()', 'instance state', 'addTransition', 'class'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
