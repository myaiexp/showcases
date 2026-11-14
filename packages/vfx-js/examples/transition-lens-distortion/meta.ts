// VFX-JS example: LensDistortion transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LensDistortion transition",
  summary:
    "LensDistortion warps the picture like a lens that peaks halfway, swaps the content there and relaxes. strength scales the warp, dispersion splits it into a rainbow (0 turns that off) and zoom adds scale over the run (0 turns it off).",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'LensDistortion', 'strength', 'dispersion', 'zoom', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/lens-distortion.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
