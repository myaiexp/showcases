// VFX-JS example: Hooks: start, update and end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hooks: start, update and end",
  summary:
    "A transition also gets hooks: start(run) once per run while the old content is held, update(ctx) every frame of the animation, end() once when the run ends or is dropped. On a ShaderTransition, call super.start(run) when you override it. This Flash picks a new tint in start(); the caption counts the hook calls.",
  section: "Custom transitions",
  tags: ['ShaderTransition', 'start()', 'update()', 'end()', 'TransitionRun', 'TransitionEffectContext'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts', 'repo/packages/vfx-js/src/transition/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
