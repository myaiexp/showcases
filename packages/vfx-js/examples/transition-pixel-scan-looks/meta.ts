// VFX-JS example: PixelScan: center and blackout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PixelScan: center and blackout",
  summary:
    "PixelScan's direction can be right, left, up, down, or center, which spreads the fronts out in rings; blackout decides whether the gap between the two fronts is black or transparent (the page behind shows through). The card cycles four looks; the full view has a select for each param.",
  section: "Transition presets",
  tags: ['PixelScan', 'direction', 'blackout', 'vfx.addTransition', 'show()'],
  docs: ['repo/docs/TRANSITION.md', 'repo/packages/transitions/src/pixel-scan.ts', 'pages/amagi-dev/vfx-js-transitions/presets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
