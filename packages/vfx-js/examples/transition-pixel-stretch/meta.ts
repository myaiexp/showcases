// VFX-JS example: PixelStretch transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PixelStretch transition",
  summary:
    "PixelStretch stretches the old content into streaks from the top, fades to the new one and lets it settle from the top. It has no params.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'PixelStretch', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/pixel-stretch.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
