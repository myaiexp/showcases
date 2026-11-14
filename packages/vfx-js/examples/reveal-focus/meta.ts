// VFX-JS example: the focusReveal scroll reveal preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"focusReveal" preset',
  summary:
    "A reveal driven by how much of the element is in view (the intersection uniform), not by time: half in view, the picture is two faded copies pulled apart sideways; fully in view they meet in focus. The card treats its own box as the viewport; the full view scrolls the page.",
  section: 'Shader presets',
  tags: ["focusReveal", "scroll reveal", "intersection"],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'pages/amagi-dev/vfx-js/how-it-works.md',
    'repo/packages/vfx-js/src/constants.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
