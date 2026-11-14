// VFX-JS example: GlitchSlide transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GlitchSlide transition",
  summary:
    "GlitchSlide slides stripes of the picture sideways with an RGB split while the new content comes in. It has no params; the slider changes the run duration.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'GlitchSlide', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/glitch-slide.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
