// VFX-JS example: ZoomBlur transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ZoomBlur transition",
  summary:
    "ZoomBlur is a radial blur with an RGB split. Its overflow is true, so the blur draws outside the box.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'ZoomBlur', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/zoom-blur.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
