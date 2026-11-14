// VFX-JS example: Class or instance, params live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Class or instance, params live",
  summary:
    "A class is built by core with new Class(params) once per container; an instance is used as it is, so changing instance.params changes a run while it plays. This 3-second Glitch run is an instance: drag amount and speed during it. The card ramps amount by itself.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'Glitch', 'params', 'instance'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'repo/packages/transitions/src/glitch.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
