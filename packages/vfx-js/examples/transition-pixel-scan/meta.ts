// VFX-JS example: PixelScan transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PixelScan transition",
  summary:
    "PixelScan sweeps a front of glowing pixel cells over the picture and takes the old content away; a second front follows and brings the new one in. direction sets where the fronts go and blackout fills the gap between them with black.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'PixelScan', 'direction', 'blackout', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/pixel-scan.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
