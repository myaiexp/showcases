// VFX-JS example: JpegGlitch transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "JpegGlitch transition",
  summary:
    "JpegGlitch hard-cuts at halfway through a real JPEG glitch: the frame is encoded, its bytes are corrupted and it is decoded again. iterations is how many glitch passes run at the peak; quality is the JPEG quality from 0 to 1.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'JpegGlitch', 'iterations', 'quality', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/jpeg-glitch.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
