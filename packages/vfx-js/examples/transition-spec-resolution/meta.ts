// VFX-JS example: Spec resolution: run over container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spec resolution: run over container",
  summary:
    "Each field comes from the first level that sets it: the run's options, then the container's. params merge per key, but a run that sets its own transition drops the container's params. The readout is what the constructor actually received (a probe class logs it); an unchanged class and params reuse the old instance.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'params', 'transition', 'spec resolution'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'pages/amagi-dev/vfx-js-transitions/how-it-works.md', 'repo/packages/vfx-js/src/transition/transition.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
